import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";

/**
 * mode:
 * "circle"  → beat pulse circle (default)
 * "bars"    → frequency bars
 * "wave"    → waveform
 */
export default function AudioVisualizer({ mode = "circle" }) {
  const canvasRef = useRef(null);
  const { analyser } = usePlayer();

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    /* ===============================
       SMOOTH BEAT DETECTION (EMA)
    =============================== */
    let smoothEnergy = 0;
    const SMOOTHING = 0.15;      // lower = smoother
    const BEAT_THRESHOLD = 140;  // tweak if needed

    const drawCircle = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ---- bass energy (raw) ----
      const bass = dataArray.slice(0, 10);
      const rawEnergy =
        bass.reduce((a, b) => a + b, 0) / bass.length;

      // ---- exponential moving average ----
      smoothEnergy =
        smoothEnergy * (1 - SMOOTHING) + rawEnergy * SMOOTHING;

      // ---- beat detection ----
      const isBeat = smoothEnergy > BEAT_THRESHOLD;

      const radius = isBeat ? 200 : 120;

      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `hsl(${smoothEnergy * 2}, 100%, 60%)`;
      ctx.lineWidth = 4;
      ctx.stroke();
    };

    const drawBars = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;

      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i];
        const barHeight = value * 1.3;

        ctx.fillStyle = `hsl(${i * 2}, 100%, 60%)`;
        ctx.fillRect(
          i * barWidth,
          canvas.height - barHeight,
          barWidth - 1,
          barHeight
        );
      }
    };

    const drawWave = () => {
      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (mode === "bars") drawBars();
      else if (mode === "wave") drawWave();
      else drawCircle(); // default
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, [analyser, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="visualizer fixed inset-0 -z-10"
    />
  );
}
