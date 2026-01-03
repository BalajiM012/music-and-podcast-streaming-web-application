import express from "express";
import { supabase } from "./supabaseClient.js";

const router = express.Router();

/* ---------------- TRACKS ---------------- */
router.get("/tracks", async (req, res) => {
  const { data, error } = await supabase
    .from("tracks")
    .select("*");

  if (error) return res.status(500).json(error);
  res.json(data);
});

/* ---------------- PODCASTS ---------------- */
router.get("/podcasts", async (req, res) => {
  const { data, error } = await supabase
    .from("podcasts")
    .select("*");

  if (error) return res.status(500).json(error);
  res.json(data);
});

/* ---------------- CATEGORIES ---------------- */
router.get("/categories", async (req, res) => {
  res.json(["Music", "Podcast"]);
});

export default router;
