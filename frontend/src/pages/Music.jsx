import { useEffect, useState } from "react";
import { fetchSongs } from "../services/musicService";
import { usePlayer } from "../context/PlayerContext";

export default function Music() {
  const [songs, setSongs] = useState([]);
  const { playTrack } = usePlayer();

  useEffect(() => {
    fetchSongs().then(res => setSongs(res.data));
  }, []);

  if (!songs.length) return <p>No songs uploaded yet</p>;

  return (
    <div className="page">
      <h1>Your Music</h1>

      {songs.map(song => (
        <div key={song.id} className="song-row">
          <span>{song.title}</span>
          <button onClick={() => playTrack(song)}>▶</button>
        </div>
      ))}
    </div>
  );
}
