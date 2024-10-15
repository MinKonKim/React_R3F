/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import "./App.css";
import * as THREE from "three";
function App() {
  return (
    <Canvas>
      <directionalLight intensity={2} position={[3, 3, 3]} />
      <mesh
        rotation={[THREE.MathUtils.DEG2RAD(45), THREE.MathUtils.DEG2RAD(45)]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </Canvas>
  );
}

export default App;
