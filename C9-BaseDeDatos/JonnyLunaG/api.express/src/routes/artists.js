import { Router } from "express";
import { ArtistController } from "../controllers/index.js";  

const router = Router();
const controller = new ArtistController(); 

router.post("/artists", controller.createArtist);
router.get("/artists", controller.getArtists);
router.get("/artists/:id", controller.getArtistById);
router.get("/artists/:id/songs", controller.getArtistSongs);
router.put("/artists/:id", controller.updateArtist);
router.delete("/artists/:id", controller.deleteArtist);

export default router;





/*
import express from 'express';
import { getSongsByArtist, getArtistsBySongDuration,} from '../controllers/artistController.js';
import Artist from '../models/Artist.js';
import Song from '../models/Song';

const router = express.Router();

router.get('/:id/songs', getSongsByArtist);
router.get('/artists-by-song-duration/:duration', getArtistsBySongDuration);


router.post('/', async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/songs', async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findByPk(id, {
      include: [Song], 
    });
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist.Songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/by-song-duration/:duration', async (req, res) => {
  const { duration } = req.params;
  try {
    const artists = await Artist.findAll({
      include: {
        model: Song,
        where: {
          duration: {
            [Op.gte]: duration, 
          },
        },
      },
    });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    await artist.update(req.body);
    res.json(artist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    await artist.destroy();
    res.status(200).json({ message: 'Artist successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;

*/




