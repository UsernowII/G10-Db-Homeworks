import { Router } from "express";
import { ArtistController } from "../controllers/index.js";

const router = Router();
const controller = new ArtistController();

router.get("/artists", controller.getArtists);

router.get("/artists/:id", controller.getArtistById);

router.post("/artists", controller.createArtist);

router.put("/artists/:id", controller.updateArtist);

router.delete("/artists/:id", controller.deleteArtist);

// GET /artists/:id/songs: Obtener canciones de un artista
router.get("/artists/:id/songs", controller.getArtistSongs);


export default router;
