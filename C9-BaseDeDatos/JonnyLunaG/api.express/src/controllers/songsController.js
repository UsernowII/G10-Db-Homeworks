import Song from "../models/Song.js";
import Artist from "../models/Artist.js";
import { Op } from "sequelize";

export class SongsController {
 
  async getSongs(req, res) {
    try {
      const songs = await Song.findAll();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSongById(req, res) {
    const { id } = req.params;
    try {
      const song = await Song.findByPk(id);
      if (!song) return res.status(404).json({ message: "Song not found" });
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createSong(req, res) {
    try {
      const song = await Song.create(req.body);
      res.status(201).json(song);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSong(req, res) {
    const { id } = req.params;
    try {
      const song = await Song.findByPk(id);
      if (!song) return res.status(404).json({ message: "Song not found" });
      await song.update(req.body);
      res.json(song);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSong(req, res) {
    const { id } = req.params;
    try {
      const song = await Song.findByPk(id);
      if (!song) return res.status(404).json({ message: "Song not found" });
      await song.destroy();
      res.status(200).json({ message: "Song successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSongsWithArtists(req, res) {
    try {
      const songs = await Song.findAll({
        include: [Artist],
      });
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSongsByArtist(req, res) {
    const { artistId } = req.params;
    try {
      const songs = await Song.findAll({
        where: { artistId },
      });
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArtistsBySongDuration(req, res) {
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
        return res.status(404).json({
          message: "No artists found with songs of this duration or longer",
        });
      }

      res.json(artists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}




/*
import Song from '../models/Song.js';
import Artist from '../models/Artist.js';


export const getSongsWithArtists = async (req, res) => {
  try {
    const songs = await Song.findAll({
      include: [Artist], 
      
    });

    if (!songs.length) {
      return res.status(404).json({ message: 'No songs found for this artist' });
    }

    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSongsByArtist = async (req, res) => {
  const { artistId } = req.params;
  try {
    const songs = await Song.findAll({
      where: { artistId },
      include: [Artist],
    });

    if (!songs.length) {
      return res.status(404).json({ message: 'No songs found for this artist' });
    }

    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/