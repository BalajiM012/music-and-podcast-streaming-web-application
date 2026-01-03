import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";

export default function AudioVisualizer() {
  const canvasRef = useRef(null);
  const { analyser } = usePlayer();

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // bass = beat
      const bass = dataArray.slice(0, 10);
      const energy = bass.reduce((a, b) => a + b, 0) / bass.length;

      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        80 + energy,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `hsl(${energy * 2}, 100%, 60%)`;
      ctx.lineWidth = 4;
      ctx.stroke();
    };

    draw();
  }, [analyser]);

  return <canvas ref={canvasRef} className="visualizer" />;
}
