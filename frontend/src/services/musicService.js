import api from "./api";

export const fetchSongs = () => api.get("/api/songs");
