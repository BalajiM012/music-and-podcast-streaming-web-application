import { useEffect, useState } from "react";
import {
  saveSongOffline,
  getAllSongsOffline
} from "../utils/offlineCache";
import {
  searchTrackMetadata,
  fetchAlbumCover
} from "../services/metadataService";
import { usePlayer } from "../context/PlayerContext";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const { playTrack } = usePlayer();

  useEffect(() => {
    getAllSongsOffline().then(setSongs);
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const title = prompt("Song title?");
    const artist = prompt("Artist name?");

    const meta = await searchTrackMetadata(artist, title);
    const cover = await fetchAlbumCover(artist);

    const song = {
      id: crypto.randomUUID(),
      title,
      artist,
      album: meta?.releases?.[0]?.title || "Unknown",
      cover,
      file
    };

    await saveSongOffline(song);
    setSongs((prev) => [...prev, song]);
  };

  const handlePlay = (song) => {
    const url = URL.createObjectURL(song.file);
    playTrack({
      id: song.id,
      title: song.title,
      artist: song.artist,
      audio_url: url
    });
  };

  return (
    <div className="page">
      <h1>Your Offline Music</h1>

      <input type="file" accept="audio/*" onChange={handleUpload} />

      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.cover && (
              <img src={song.cover} width="50" alt="" />
            )}
            <strong>{song.title}</strong> – {song.artist}
            <button onClick={() => handlePlay(song)}>▶</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
