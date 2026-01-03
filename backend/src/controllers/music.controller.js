import * as musicService from "../services/music.service.js";

export const getSongs = async (req, res, next) => {
  try {
    const songs = await musicService.getSongsByUser(req.user.id);
    res.json(songs);
  } catch (err) {
    next(err);
  }
};
