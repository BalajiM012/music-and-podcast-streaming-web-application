import { usePlayer } from "../../context/PlayerContext";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, playTrack, pause } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="player">
      <span>{currentTrack.title}</span>

      <button onClick={() => (isPlaying ? pause() : playTrack(currentTrack))}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
