import { OrbitControls } from "@react-three/drei";

const Environments = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry></boxGeometry>
      </mesh>
    </>
  );
};

export default Environments;
