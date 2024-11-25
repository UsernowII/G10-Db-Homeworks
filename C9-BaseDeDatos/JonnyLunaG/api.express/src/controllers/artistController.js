import Artist from "../models/Artist.js";
import Song from "../models/Song.js";
//import { Op } from "sequelize";

export class ArtistController {
  
  async getArtists(req, res) {
    try {
      const artists = await Artist.findAll();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArtistById(req, res) {
    const { id } = req.params;
    try {
      const artist = await Artist.findByPk(id);
      if (!artist) return res.status(404).json({ message: "Artist not found" });
      res.json(artist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createArtist(req, res) {
    try {
      const artist = await Artist.create(req.body);
      res.status(201).json(artist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateArtist(req, res) {
    const { id } = req.params;
    try {
      const artist = await Artist.findByPk(id);
      if (!artist) return res.status(404).json({ message: "Artist not found" });
      await artist.update(req.body);
      res.json(artist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteArtist(req, res) {
    const { id } = req.params;
    try {
      const artist = await Artist.findByPk(id);
      if (!artist) return res.status(404).json({ message: "Artist not found" });
      await artist.destroy();
      res.status(200).json({ message: "Artist successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArtistSongs(req, res) {
    const { id } = req.params;
    try {
      const artist = await Artist.findByPk(id, {
        include: [Song],
      });
      if (!artist) return res.status(404).json({ message: "Artist not found" });
      res.json(artist.Songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}





/*
import Artist from '../models/Artist.js';
import Song from '../models/Song.js';
import { Op } from 'sequelize';


export const getSongsByArtist = async (req, res) => {
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
};

export const getArtistsBySongDuration = async (req, res) => {
  const { duration } = req.params;
  try {
    const artists = await Artist.findAll({
      include: [
        {
          model: Song,
          where: {
            duration: {
              [Op.gte]: duration,
            },
          },
        },
      ],
    });

    if (!artists.length) {
      return res.status(404).json({ message: 'No artists found with songs of this duration' });
    }

    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/
