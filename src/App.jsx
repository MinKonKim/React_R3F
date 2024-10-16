/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import "./App.css";

const cardData = [
  {
    imageUrl: "/tarrot_1.png",
    position: [0, -1, 0],
    rotationY: -10,
    rotationZ: 0,
    name: "타로카드1",
  },
  {
    imageUrl: "/tarrot_2.png",
    position: [0.5, -1.05, -0.1],
    rotationY: -10,
    rotationZ: -10,
    name: "타로카드2",
  },
  {
    imageUrl: "/tarrot_3.png",
    position: [-0.5, -1.05, 0.1],
    rotationY: -10,
    rotationZ: 10,
    name: "타로카드3",
  },
  {
    imageUrl: "/tarrot_4.png",
    position: [-1, -1.15, 0.2],
    rotationY: -10,
    rotationZ: 20,
    name: "타로카드4",
  },
  {
    imageUrl: "/tarrot_5.png",
    position: [1, -1.15, -0.1],
    rotationY: -10,
    rotationZ: -20,
    name: "타로카드5",
  },
];

// 컴포넌트
// 다른 카드에서 같은 imageUrl을 사용해야 할때에는 id 같은 다른 프로퍼티를 추가해서 key 에 할당해주세요!

import { animated, useSpring } from "@react-spring/three";
const CardComponent = ({ name, position, rotationY, rotationZ, imageUrl }) => {
  const [hovered, setHovered] = useState(false);

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

  const props = useSpring({
    scale: hovered ? [1.1, 1.1, 1] : [1, 1, 1],
    position: calculatePosition(position, hovered),
    rotation: calculateRotation(rotationY, rotationZ, hovered),
    config: { mass: 5, tension: 400, friction: 100 },
  });

  const handleOnClick = (event) => {
    event.stopPropagation();
    window.alert(name + "입니다!");
  };

  return (
    <animated.mesh
      castShadow
      receiveShadow
      position={position}
      rotation-y={THREE.MathUtils.degToRad(rotationY)}
      rotation-z={THREE.MathUtils.degToRad(rotationZ)}
      material={materials}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => handleOnClick(e)}
      {...props}
    >
      <boxGeometry args={[1, 1.6, 0.01]} />
    </animated.mesh>
  );
};

const createMaterials = (texture) => {
  return [
    new THREE.MeshStandardMaterial(), // 뒷면
    new THREE.MeshStandardMaterial(), // 앞면
    new THREE.MeshStandardMaterial(), // 윗면
    new THREE.MeshStandardMaterial(), // 바닥면
    new THREE.MeshStandardMaterial({ map: texture, toneMapped: true }), // 앞면 (이미지 적용)
    new THREE.MeshStandardMaterial(), // 뒷면
  ];
};

const calculatePosition = (position, hovered) => {
  return hovered ? [position[0], position[1] + 0.5, position[2]] : position;
};

const adjustRotation = (rotation, adjustment) => {
  return rotation === 0 ? rotation : rotation + adjustment;
};

const calculateRotation = (rotationY, rotationZ, hovered) => {
  return hovered
    ? [
        0,
        THREE.MathUtils.degToRad(adjustRotation(rotationY, 5)),
        THREE.MathUtils.degToRad(
          adjustRotation(rotationZ, rotationZ > 0 ? -5 : 5)
        ),
      ]
    : [
        0,
        THREE.MathUtils.degToRad(rotationY),
        THREE.MathUtils.degToRad(rotationZ),
      ];
};

const Elements = () => {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, 0.5, 0);
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
        intensity={2}
        target-position={[0, -1, 0]}
        shadow-mapSize={[5000, 5000]}
        position={[-4, -2.1, 4]}
      />
      {cardData.map((props) => (
        <CardComponent key={props.imageUrl} {...props} />
      ))}
    </>
  );
};

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 3] }}>
      <Elements />
    </Canvas>
  );
}

export default App;
