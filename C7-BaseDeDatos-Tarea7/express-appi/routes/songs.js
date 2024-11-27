import express from 'express';
import Song from '../models/song.js';
import Artist from '../models/artist.js';

const router = express.Router();

// Crear una nueva canción
router.post('/songs', async (req, res) => {
  const { title, artistId, releaseYear, duration, coverUrl } = req.body;
  try {
    const song = await Song.create({ title, artistId, releaseYear, duration, coverUrl });
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la canción' });
  }
});

// Obtener todas las canciones
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.findAll({
      include: Artist // Incluye el artista relacionado
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener canciones' });
  }
});

// Actualizar una canción existente
router.put('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artistId, releaseYear, duration, coverUrl } = req.body;
  try {
    const song = await Song.findByPk(id);
    if (!song) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    song.title = title || song.title;
    song.artistId = artistId || song.artistId;
    song.releaseYear = releaseYear || song.releaseYear;
    song.duration = duration || song.duration;
    song.coverUrl = coverUrl || song.coverUrl;
    await song.save();
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la canción' });
  }
});

// Eliminar una canción
router.delete('/songs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByPk(id);
    if (!song) {
      return res.status(404).json({ error: 'Canción no encontrada' });
    }
    await song.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la canción' });
  }
});

export default router;
