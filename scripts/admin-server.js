import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4322;

// Configuración de multer (memoria para procesar antes de guardar)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas estáticas para la UI
app.get('/', async (req, res) => {
  const html = await fs.readFile(path.join(__dirname, 'admin-ui.html'), 'utf-8');
  res.send(html);
});

// Directorios destino
const imgDir = path.join(__dirname, '../public/assets/img');
const dataDir = path.join(__dirname, '../src/data');
const obrasFile = path.join(dataDir, 'obras.json');

app.use(express.static(path.join(__dirname, '../public'))); // Para ver imágenes si es necesario
app.use(express.json());

// Helper para inicializar el JSON
async function getObrasData() {
  try {
    const data = await fs.readFile(obrasFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si no existe, devuelve estructura vacía
    return { obras: [] };
  }
}

// Endpoint para subir o actualizar
app.post('/api/upload', upload.array('files', 4), async (req, res) => {
  try {
    const { id, title, category, location, description } = req.body;
    const mediaOrder = req.body.mediaOrder ? (Array.isArray(req.body.mediaOrder) ? req.body.mediaOrder : [req.body.mediaOrder]) : [];
    
    const files = req.files || [];
    const isEdit = !!id;

    if (!isEdit && files.length === 0) {
      return res.status(400).json({ error: 'Debes subir archivos para una obra nueva.' });
    }

    const data = await getObrasData();
    const timestamp = Date.now();
    const newFilePaths = [];
    let isVideo = false;

    // Procesar archivos nuevos
    if (files.length > 0) {
      isVideo = files[0].mimetype.startsWith('video/');
      const imgDir = path.join(__dirname, '../public/assets/img');
      await fs.mkdir(imgDir, { recursive: true });

      if (isVideo) {
        const videoName = `obra_${timestamp}_video${path.extname(files[0].originalname)}`;
        await fs.writeFile(path.join(imgDir, videoName), files[0].buffer);
        newFilePaths.push(`/assets/img/${videoName}`);
      } else {
        for (let i = 0; i < files.length; i++) {
          const imgName = `obra_${timestamp}_img_${i + 1}.webp`;
          await sharp(files[i].buffer)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(path.join(imgDir, imgName));
          newFilePaths.push(`/assets/img/${imgName}`);
        }
      }
    }

    // Armar el array final de medios respetando el orden
    let finalMedia = [];
    let finalType = isVideo ? 'video' : 'images';
    
    if (isVideo) {
      finalMedia = [newFilePaths[0]];
    } else {
      let fileIndex = 0;
      for (const item of mediaOrder) {
        if (item === 'NEW') {
          if (fileIndex < newFilePaths.length) {
            finalMedia.push(newFilePaths[fileIndex]);
            fileIndex++;
          }
        } else if (item.startsWith('EXISTING:')) {
          finalMedia.push(item.replace('EXISTING:', ''));
        }
      }
      
      // Fallback si no se envió mediaOrder correctamente pero hay archivos nuevos
      if (finalMedia.length === 0 && newFilePaths.length > 0) {
        finalMedia = newFilePaths;
      }
    }

    if (isEdit) {
      const existingObraIndex = data.obras.findIndex(o => o.id === id);
      if (existingObraIndex !== -1) {
        const obra = data.obras[existingObraIndex];
        obra.title = title;
        obra.category = category;
        obra.location = location;
        obra.description = description;

        if (finalMedia.length > 0) {
          if (finalMedia.length === 1 && finalMedia[0].endsWith('.mp4')) finalType = 'video';
          obra.type = finalType;
          obra.media = finalMedia;
        }

        await fs.writeFile(obrasFile, JSON.stringify(data, null, 2));
        res.json({ success: true, obra });
      } else {
        res.status(404).json({ error: 'Obra no encontrada' });
      }
    } else {
      // Creando nueva obra
      const newObra = {
        id: `obra_${Date.now()}`,
        title,
        category,
        location,
        description,
        type: finalType,
        media: finalMedia,
        date: new Date().toISOString()
      };
      data.obras.unshift(newObra);
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(obrasFile, JSON.stringify(data, null, 2));
      res.json({ success: true, obra: newObra });
    }
  } catch (err) {
    console.error('Error al procesar la subida:', err);
    res.status(500).json({ error: 'Error interno del servidor al procesar los archivos.' });
  }
});

// Endpoint para borrar (opcional, útil para gestionar)
app.post('/api/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const data = await getObrasData();
    const obraIndex = data.obras.findIndex(o => o.id === id);
    
    if (obraIndex === -1) return res.status(404).json({ error: 'Obra no encontrada' });
    
    // Borrar archivos
    const obra = data.obras[obraIndex];
    for (const fileUrl of obra.media) {
      try {
        const filePath = path.join(__dirname, '..', 'public', fileUrl);
        await fs.unlink(filePath);
      } catch(e) {
        console.warn('No se pudo borrar archivo físico:', fileUrl);
      }
    }

    data.obras.splice(obraIndex, 1);
    await fs.writeFile(obrasFile, JSON.stringify(data, null, 2));
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para reordenar (subir/bajar)
app.post('/api/reorder', async (req, res) => {
  try {
    const { id, direction } = req.body;
    const data = await getObrasData();
    const index = data.obras.findIndex(o => o.id === id);
    
    if (index === -1) return res.status(404).json({ error: 'Obra no encontrada' });
    
    if (direction === 'up' && index > 0) {
      const temp = data.obras[index - 1];
      data.obras[index - 1] = data.obras[index];
      data.obras[index] = temp;
    } else if (direction === 'down' && index < data.obras.length - 1) {
      const temp = data.obras[index + 1];
      data.obras[index + 1] = data.obras[index];
      data.obras[index] = temp;
    }

    await fs.writeFile(obrasFile, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las obras para mostrar en el panel
app.get('/api/obras', async (req, res) => {
  const data = await getObrasData();
  res.json(data);
});

app.listen(port, () => {
  console.log(`\n======================================================`);
  console.log(`✅ Panel de Administración Local de N3i Obras activo.`);
  console.log(`👉 Ingresa en tu navegador a: http://localhost:${port}`);
  console.log(`======================================================\n`);
});
