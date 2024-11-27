import { internalError } from "../helper/http-response.js";
import { Artist, Song } from "../models/index.js";

export class SongController {
  getSongs = async (req, res) => {
    try {
      const artists = await Song.findAll();
      res.json(artists);
    } catch (error) {
      internalError(error, res);
    }
  };

  getSongById = async (req, res) => {
    try {
      console.log(req.params.id);

      const id = Number(req.params.id);

      const song = await Song.findByPk(id);

      if (!song) return res.status(404).json({ message: "Song not found" });

      res.json(song);
    } catch (error) {
      internalError(error, res);
    }
  };

  getSongsByArtist = async (req, res) => {
    const artistId = Number(req.params.artistId);

    try {
      const artists = await Song.findAll({
        where: { artistId: artistId },
        include: {
          model: Artist,
        }
      });
      res.json(artists);
    } catch (error) {
      internalError(error, res);
    }
  }

  createSong = async (req, res) => {
    console.log(req.body);

    try {
      const { title, releaseYear, duration, coverUrl, artistId } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const song = await Song.create({
        title,
        releaseYear,
        duration,
        coverUrl,
        artistId
      });

      if (!song)
        return res.status(400).json({ message: "Songs was not created" });

      res.status(201).json(song);
    } catch (error) {
      internalError(error, res);
    }
  };

  async getSongsWithArtists(req, res) {
    try {
      // Buscar todas las canciones e incluir los artistas correspondientes
      const songs = await Song.findAll({
        include: { model: Artist, as: "artist" },
      });

      // Retornar las canciones con sus respectivos artistas
      res.status(200).json(songs);
    } catch (error) {
      // Manejar errores
      res.status(500).json({ error: error.message });
    }
  }

  async getArtistsBySongDuration(req, res) {

    const { duration } = req.params;  // Obtener la duración mínima desde la URL
    try {

      // Buscar artistas que tienen canciones con duración mayor o igual
      const artists = await Artist.findAll({
        include: {
          model: Song,
          
          as: "songs",
          where: { duration: { [Op.gte]: duration } },  // Filtrar canciones por duración
        },
      });

      // Si no se encuentran artistas, devolver un 404
      if (artists.length === 0) {
        return res.status(404).json({ message: "No artists found with songs of this duration or longer" });
      }

      // Retornar los artistas con sus canciones filtradas por duración
      res.status(200).json(artists);
    } catch (error) {
      // Manejar errores
      res.status(500).json({ error: error.message });
    }
  }
}
