import { useEffect, useRef } from "react";
import { usePlayer } from "../../context/PlayerContext";

/**
 * mode:
 * "circle"     → beat pulse circle (default)
 * "bars"       → frequency bars
 * "wave"       → waveform
 * "particles"  → beat particles
 */
export default function AudioVisualizer({ mode = "circle" }) {
  const canvasRef = useRef(null);
  const { analyser } = usePlayer();

  useEffect(() => {
    if (!analyser) return;

    // 🔹 performance win
    analyser.fftSize = 128;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    /* ===============================
       SMOOTH BEAT DETECTION (EMA)
    =============================== */
    let smoothEnergy = 0;
    const SMOOTHING = 0.15;
    const BEAT_THRESHOLD = 140;

    /* ===============================
       PARTICLES STATE
    =============================== */
    let particles = [];

    const drawCircle = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bass = dataArray.slice(0, 10);
      const rawEnergy =
        bass.reduce((a, b) => a + b, 0) / bass.length;

      smoothEnergy =
        smoothEnergy * (1 - SMOOTHING) + rawEnergy * SMOOTHING;

      const isBeat = smoothEnergy > BEAT_THRESHOLD;
      const radius = isBeat ? 200 : 120;

      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 / DPR,
        canvas.height / 2 / DPR,
        radius,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `hsl(${smoothEnergy * 2},100%,60%)`;
      ctx.lineWidth = 4;
      ctx.stroke();
    };

    const drawBars = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / DPR / bufferLength;

      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i];
        const barHeight = value * 1.3;

        ctx.fillStyle = `hsl(${i * 2},100%,60%)`;
        ctx.fillRect(
          i * barWidth,
          canvas.height / DPR - barHeight,
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

      const sliceWidth = canvas.width / DPR / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / DPR / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width / DPR, canvas.height / DPR / 2);
      ctx.stroke();
    };

    const drawParticles = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bass = dataArray.slice(0, 10);
      const rawEnergy =
        bass.reduce((a, b) => a + b, 0) / bass.length;

      smoothEnergy =
        smoothEnergy * (1 - SMOOTHING) + rawEnergy * SMOOTHING;

      if (smoothEnergy > BEAT_THRESHOLD) {
        particles.push({
          x: canvas.width / DPR / 2,
          y: canvas.height / DPR / 2,
          r: 4,
          alpha: 1
        });
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,255,${p.alpha})`;
        ctx.fill();

        p.r += 1.5;
        p.alpha -= 0.03;
      });

      // 🔹 particle limit (performance)
      particles = particles.filter(p => p.alpha > 0).slice(-50);
    };

    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame++;
      if (frame % 2 !== 0) return; // ~30fps

      if (mode === "bars") drawBars();
      else if (mode === "wave") drawWave();
      else if (mode === "particles") drawParticles();
      else drawCircle();
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
