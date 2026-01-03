import express from "express";
import { getSongs } from "../controllers/music.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/songs", auth, getSongs);

export default router;
