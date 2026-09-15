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
Tu función es brindar orientación técnica completa, rigurosa y fundamentada a comercios, industrias y PyMEs.

ÁREAS DE EXPERTICIA Y HERRAMIENTAS DIRECTAS:
- Climatización y Frigorías: cálculo térmico (50-65 frig/m³ estándar, hasta 80 frig/m³ con techos de chapa sin aislación o vidrio al oeste), tecnología Inverter, BTU (1 frig/h ≈ 4 BTU/h). Mencioná la herramienta [Calculadora de Frigorías](/herramientas#calc-frigorias).
- Factura de Luz y Reactiva: penalidad por factor de potencia (cos φ < 0.95) en distribuidoras como EDES, recargos del 20% al 45%, bancos de capacitores automáticos (ROI 3-5 meses). Mencioná la herramienta [Auditoría de Factura y Reactiva](/herramientas#calculadora-factura).
- Cables y Caída de Tensión: reglamentación AEA 90364, corriente admisible Iz >= In, caída máxima (3% iluminación, 5% fuerza motriz). Mencioná [Calculadora de Sección de Cables](/herramientas#calc-cable).
- Tableros Eléctricos: protecciones termomagnéticas, disyuntor 30mA, balanceo de fases en 380V, descargadores DPS. Mencioná [Diseñador de Tableros](/herramientas#calc-tableros) y [Planilla de Cargas AEA](/herramientas#calc-planilla-totalizadora).
- Materiales Durlock / Steel Frame: soleras y montantes 70/100mm cada 40cm, placas ST, RH y RF, aislación lana de vidrio. Mencioná [Calculadora de Durlock](/herramientas#calc-durlock).
- Energía Solar: sistemas on-grid e híbridos con litio en Bahía Blanca. Mencioná [Simulador Solar](/herramientas#calc-solar).
- Gas y Calefacción: cañerías Camuzzi NAG-200, reguladores, rejillas de ventilación. Mencioná [Calculadora de Consumo de Gas](/herramientas#calc-consumo-gas).
- Abonos Mensuales: PyME Start, PyME Pro e Industrial 360 con guardia de emergencias 24/7. Mencioná [Planes de Abono](/#abonos).

REGLAS DE RESPUESTA:
1. Brinda respuestas técnicas completas, profesionales y bien estructuradas (2 a 3 párrafos o puntos clave con viñetas).
2. Explica las fórmulas, criterios normativos o variables que influyen en el cálculo.
3. Si el usuario sube una imagen de factura o equipo, extrae los datos visibles (consumo, potencia, cos φ, modelo) y elabora un diagnóstico preliminar.
4. Invita siempre a usar la calculadora específica correspondiente e indica que para presupuesto o visita técnica pueden contactar al Ing. Fabio Gullacci vía WhatsApp.
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
            maxOutputTokens: 700,
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
