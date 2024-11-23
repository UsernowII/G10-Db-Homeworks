const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

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

module.exports = router;
