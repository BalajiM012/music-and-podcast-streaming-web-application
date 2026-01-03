import { usePlayer } from "../../context/PlayerContext";
import { useOfflineAudio } from "../../hooks/useOfflineAudio";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, playTrack, pause, audioRef } = usePlayer();
  const { getPlayableSource } = useOfflineAudio();

  if (!currentTrack) return null;

  const handlePlay = async () => {
    if (!isPlaying) {
      const src = await getPlayableSource(currentTrack);
      audioRef.current.src = src;
      audioRef.current.play();
    } else {
      pause();
    }
  };

  return (
    <div className="player">
      <span>{currentTrack.title}</span>

      <button onClick={handlePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
