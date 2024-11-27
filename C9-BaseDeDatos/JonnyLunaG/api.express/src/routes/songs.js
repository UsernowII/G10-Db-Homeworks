import { Router } from "express";
import { SongsController } from "../controllers/index.js"; 

const router = Router();
const controller = new SongsController(); 

router.get("/songs", controller.getSongs);
router.get("/songs/:id", controller.getSongById);
router.post("/songs", controller.createSong);
router.put("/songs/:id", controller.updateSong);
router.delete("/songs/:id", controller.deleteSong);

router.get("/songs-with-artists", controller.getSongsWithArtists);
router.get("/songs/artist/:artistId", controller.getSongsByArtist);
router.get(
  "/artists-by-song-duration/:duration",
  controller.getArtistsBySongDuration
);

export default router;





/*

import express from 'express';
import {
  getSongsWithArtists,
  getSongsByArtist,
} from '../controllers/songsController.js';

import Song from '../models/Song.js';
import Artist from '../models/Artist.js';

const router = express.Router();

router.get('/songs-with-artists', getSongsWithArtists);
router.get('/songs/artist/:artistId', getSongsByArtist);


router.post('/', async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/with-artists', async (req, res) => {
  try {
    const songs = await Song.findAll({
      include: [Artist], 
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/artist/:artistId', async (req, res) => {
  const { artistId } = req.params;
  try {
    const songs = await Song.findAll({
      where: { artistId },
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    await song.update(req.body);
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    await song.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;

*/



