/* eslint-disable react/no-unknown-property */
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
function App() {
  return (
    <Canvas>
      <Environment />
    </Canvas>
  );
}

export default App;
