import AudioPlayer from "./components/Player/AudioPlayer";
import AudioVisualizer from "./components/Player/AudioVisualizer";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      {/* Background visualization */}
      <AudioVisualizer />

      {/* Pages */}
      <Home />

      {/* Fixed bottom player */}
      <AudioPlayer />
    </>
  );
}
