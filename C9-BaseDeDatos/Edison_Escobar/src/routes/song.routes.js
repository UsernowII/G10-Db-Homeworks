import { Router } from "express";
import { SongController } from "../controllers/index.js";

const router = Router();
const controller = new SongController();

router.get("/songs", controller.getSongs);

router.get("/songs/:id", controller.getSongById);
//GET /songs/artist/:artistId: Obtener todas las canciones de un artista específico
router.get("/songs/artist/:artistId", controller.getSongsByArtist);

router.post("/songs", controller.createSong);
// GET /songs-with-artists: Ruta para obtener todas las canciones con sus artistas
router.get("/songs-with-artists", controller.getSongsWithArtists);
// GET /artists-by-song-duration/:duration: obtener artistas con canciones de duración específica o mayor
router.get("/artists-by-song-duration/:duration", controller.getArtistsBySongDuration);

export default router;
