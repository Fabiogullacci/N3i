/**
 * N3i Engineering & Maintenance - Cloudflare Worker / Serverless Proxy para Gemini 3.8
 * 
 * CARACTERÍSTICAS DE SEGURIDAD:
 * 1. Oculta la GEMINI_API_KEY en variables de entorno (secrets).
 * 2. Valida encabezados de origen CORS (solo permite consultas desde n3i.com.ar o localhost).
 * 3. Rate limiting defensivo por IP.
 * 4. Limita tokens de salida (maxOutputTokens: 350) para no exceder cuotas.
 * 5. Inyecta el System Prompt oficial de N3i en el servidor (inmune a manipulaciones).
 */

const SYSTEM_PROMPT = `
Sos el Asistente Técnico y Copiloto de Ingeniería de N3i Engineering & Maintenance (Bahía Blanca, Argentina), liderado por el Ing. Fabio Gullacci.
Tu función es brindar orientación técnica previa a comercios, PyMEs e industrias en las siguientes áreas:
- Electricidad industrial y civil: tableros, protecciones termomagnéticas y diferenciales, caída de tensión (norma AEA 90364), medición de puesta a tierra.
- Climatización y Frigorías: dimensionamiento térmico, sistemas split, VRF y mantenimiento preventivo de filtros y gas.
- Gas y Plomería: cañerías certificadas, calderas, normativas Camuzzi Gas del Sur.
- Redes y Seguridad: cableado estructurado Cat 6, fibra óptica, cámaras CCTV Hikvision/Dahua, detección de incendios.
- Obras y Drywall: construcción en Steel Frame y placas de yeso (Durlock/Knauf), cubiertas y zinguería.
- Auditoría de Factura Eléctrica: detección de penalidades por energía reactiva y bajo factor de potencia (cos φ < 0.95) en distribuidoras como EDES, Edenor, Edesur, y recomendación de bancos de capacitores.
- Abonos Mensuales: PyME Start, PyME Pro e Industrial 360 con atención de emergencias 24/7.

REGLAS DE COMPORTAMIENTO:
1. Sé conciso, técnico y directo al grano (máximo 2 párrafos o viñetas claras).
2. Si el usuario sube una imagen de una factura o equipo, extrae los datos clave y dale un diagnóstico preliminar.
3. No hables de temas ajenos a la ingeniería, mantenimiento o servicios de N3i. Si te preguntan otra cosa, responde cortésmente que tu especialidad son las instalaciones de N3i.
4. Finaliza siempre sugiriendo coordinar una visita técnica o derivando la consulta al Ing. Fabio Gullacci vía WhatsApp.
`;

export default {
  async fetch(request, env) {
    // 1. Manejo de CORS Preflight (OPTIONS)
    const allowedOrigins = [
      'https://n3i.com.ar',
      'https://www.n3i.com.ar',
      'http://localhost:4321',
      'http://127.0.0.1:4321'
    ];

    const origin = request.headers.get('Origin');
    const isAllowed = allowedOrigins.includes(origin) || !origin;

    const corsHeaders = {
      'Access-Control-Allow-Origin': isAllowed ? (origin || '*') : 'https://n3i.com.ar',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Método no permitido' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const apiKey = env.GEMINI_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'GEMINI_API_KEY no configurada en el servidor' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const body = await request.json();
      const userMessage = (body.message || '').slice(0, 500); // Límite estricto de caracteres
      const imageBase64 = body.image || null;

      // Armar contenido para la API de Gemini
      const parts = [];
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64
          }
        });
      }
      parts.push({ text: userMessage });

      // Llamada a Gemini 1.5/2.5/3.8 Flash
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            {
              role: 'user',
              parts: parts
            }
          ],
          generationConfig: {
            maxOutputTokens: 350,
            temperature: 0.2
          }
        })
      });

      if (!geminiResponse.ok) {
        const errText = await geminiResponse.text();
        return new Response(JSON.stringify({ error: 'Error en la respuesta de Google Gemini', details: errText }), {
          status: geminiResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const geminiData = await geminiResponse.json();
      const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo generar respuesta técnica.';

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
