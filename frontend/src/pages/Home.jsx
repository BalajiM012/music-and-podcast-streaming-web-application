import { usePlayer } from "../context/PlayerContext";

export default function Home() {
  const { playTrack } = usePlayer();

  const demoTrack = {
    id: 1,
    title: "Demo Song",
    audio_url: "/demo.mp3" // user-provided audio
  };

  return (
    <div className="page">
      <h1>My Music</h1>
      <button onClick={() => playTrack(demoTrack)}>
        Play Demo Song
      </button>
    </div>
  );
}
