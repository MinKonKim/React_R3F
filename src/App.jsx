/* eslint-disable react/no-unknown-property */
import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import "./App.css";

const cardData = [
  {
    imageUrl: "/tarrot_1.png",
    position: [0, -1, 0],
    rotationY: -10,
    rotationZ: 0,
  },
  {
    imageUrl: "/tarrot_2.png",
    position: [0.5, -1.05, -0.1],
    rotationY: -10,
    rotationZ: -10,
  },
  {
    imageUrl: "/tarrot_3.png",
    position: [-0.5, -1.05, 0.1],
    rotationY: -10,
    rotationZ: 10,
  },
  {
    imageUrl: "/tarrot_4.png",
    position: [-1, -1.15, 0.2],
    rotationY: -10,
    rotationZ: 20,
  },
  {
    imageUrl: "/tarrot_5.png",
    position: [1, -1.15, -0.1],
    rotationY: -10,
    rotationZ: -20,
  },
];

// 컴포넌트
// 다른 카드에서 같은 imageUrl을 사용해야 할때에는 id 같은 다른 프로퍼티를 추가해서 key 에 할당해주세요!

const CardComponent = ({ position, rotationY, rotationZ, imageUrl }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  texture.colorSpace = THREE.DisplayP3ColorSpace; // P3 색공간으로 변경

  const materials = [
    new THREE.MeshStandardMaterial(), // 오른쪽
    new THREE.MeshStandardMaterial(), // 왼쪽
    new THREE.MeshStandardMaterial(), // 윗면
    new THREE.MeshStandardMaterial(), // 바닥면
    new THREE.MeshStandardMaterial({
      map: texture,
    }), // 앞면 (이미지 적용)
    new THREE.MeshStandardMaterial(), // 뒷면
  ];

  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      rotation-y={THREE.MathUtils.degToRad(rotationY)}
      rotation-z={THREE.MathUtils.degToRad(rotationZ)}
      material={materials}
    >
      <boxGeometry args={[1, 1.6, 0.01]} />
    </mesh>
  );
};

const Elements = () => {
  const lightRef = useRef(null);
  useHelper(lightRef, THREE.DirectionalLightHelper, 1, "red");
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
        ref={lightRef}
        intensity={4}
        target-position={[0, -1, 0]}
        shadow-mapSize={[5000, 5000]}
        position={[-4, -2.1, 4]}
      />
      {cardData.map((props, index) => {
        return <CardComponent {...props} key={index} />;
      })}
    </>
  );
};

function App() {
  return (
    <Canvas shadows>
      <Elements />
    </Canvas>
  );
}

export default App;
