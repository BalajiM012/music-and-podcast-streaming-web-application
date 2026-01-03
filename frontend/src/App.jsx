import { useState } from "react";
import AudioPlayer from "./components/Player/AudioPlayer";
import AudioVisualizer from "./components/Player/AudioVisualizer";
import Home from "./pages/Home";

export default function App() {
  // visualizer modes: "circle" | "bars" | "wave"
  const [visualMode, setVisualMode] = useState("circle");

  return (
    <>
      {/* Background visualization */}
      <AudioVisualizer mode={visualMode} />

      {/* Optional: visualizer mode switch (dev / demo) */}
      <div className="fixed top-4 right-4 z-10 flex gap-2">
        <button onClick={() => setVisualMode("circle")}>Circle</button>
        <button onClick={() => setVisualMode("bars")}>Bars</button>
        <button onClick={() => setVisualMode("wave")}>Wave</button>
      </div>

      {/* Pages */}
      <Home />

      {/* Fixed bottom player */}
      <AudioPlayer />
    </>
  );
}
