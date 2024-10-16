import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <directionalLight position={[1, 2, 3]} intensity={2} />
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <gridHelper />
      <mesh rotation={[Math.PI / 4, 0, 0]} position={[1, 1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} position={[-1, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]} position={[0, 0.5, 3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </Canvas>
  );
}

export default App;
