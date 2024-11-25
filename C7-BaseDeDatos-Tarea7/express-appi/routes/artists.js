import express from 'express';
import Artist from '../models/artist.js';

const router = express.Router();

// Crear un nuevo artista
router.post('/artists', async (req, res) => {
  try {
    const { name, bio, photoUrl } = req.body;
    const artist = await Artist.create({ name, bio, photoUrl });
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el artista' });
  }
});

// Obtener todos los artistas
router.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artistas' });
  }
});

// Actualizar un artista existente
router.put('/artists/:id', async (req, res) => {
  const { id } = req.params;
  const { name, bio, photoUrl } = req.body;
  try {
    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artista no encontrado' });
    }
    artist.name = name || artist.name;
    artist.bio = bio || artist.bio;
    artist.photoUrl = photoUrl || artist.photoUrl;
    await artist.save();
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el artista' });
  }
});

// Eliminar un artista
router.delete('/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ error: 'Artista no encontrado' });
    }
    await artist.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el artista' });
  }
});

export default router;
