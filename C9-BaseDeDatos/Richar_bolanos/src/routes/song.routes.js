import { Router } from "express";
import { SongController } from "../controllers/index.js";

const router = Router();
const controller = new SongController();

router.get("/songs", controller.getSongs);

router.get("/songs/:id", controller.getSongById);

router.get("/songs/artist/:artistId", controller.getSongsByArtist);

router.post("/songs", controller.createSong);
router.get("/songs-with-artists", controller.getSongsWithArtists);

router.get("/artists-by-song-duration/:duration", controller.getArtistsBySongDuration);
export default router;
