import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioCtxRef.current = new AudioContext();

    const source =
      audioCtxRef.current.createMediaElementSource(audioRef.current);

    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);
  }, []);

  const playTrack = (track) => {
    if (currentTrack?.id !== track.id) {
      audioRef.current.src = track.audio_url;
      setCurrentTrack(track);
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        analyser: analyserRef.current,
        currentTrack,
        isPlaying,
        playTrack,
        pause
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
