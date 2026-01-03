import { useEffect, useState } from "react";
import { saveSongOffline, getSongOffline } from "../utils/offlineCache";
import { usePlayer } from "../context/PlayerContext";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const { playTrack } = usePlayer();

  // Load song list from IndexedDB keys
  useEffect(() => {
    const loadSongs = async () => {
      const db = await indexedDB.databases();
      setSongs(
        db.map((_, index) => ({
          id: `offline-${index}`,
          title: `Offline Song ${index + 1}`
        }))
      );
    };

    loadSongs();
  }, []);

  // Upload handler
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const songId = crypto.randomUUID();

    await saveSongOffline(songId, file);

    setSongs((prev) => [
      ...prev,
      { id: songId, title: file.name }
    ]);
  };

  const handlePlay = async (song) => {
    const blob = await getSongOffline(song.id);
    const url = URL.createObjectURL(blob);

    playTrack({
      id: song.id,
      title: song.title,
      audio_url: url
    });
  };

  return (
    <div className="page">
      <h1>Offline Music Player</h1>

      <input type="file" accept="audio/*" onChange={handleUpload} />

      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title}
            <button onClick={() => handlePlay(song)}>▶ Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
