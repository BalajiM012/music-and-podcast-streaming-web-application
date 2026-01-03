import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePlayer } from "../../context/PlayerContext";

export default function ThreeVisualizer() {
  const mountRef = useRef();
  const { analyser } = usePlayer();

  useEffect(() => {
    if (!analyser) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      wireframe: true
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 6;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      requestAnimationFrame(animate);

      analyser.getByteFrequencyData(dataArray);
      const bass =
        dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;

      sphere.scale.setScalar(1 + bass / 200);
      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, [analyser]);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}
