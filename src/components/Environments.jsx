import { OrbitControls, useHelper } from "@react-three/drei";
import { ZooMap } from "./ZooMap";

import { useFrame, useThree } from "@react-three/fiber";
import {
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";
import { Physics, RigidBody } from "@react-three/rapier";
import { BlendFunction } from "postprocessing";
import { Fragment, Suspense, useContext, useRef } from "react";
import * as THREE from "three";
import { EditContext } from "../context/EditContext";
import { Animal } from "./Animal";
import { Dino } from "./Dino";
import { Rtanny } from "./Rtanny";
const START_Y = 20;

export const Environments = () => {
  const { isEditMode, objects, onObjectClicked, onPointMove } =
    useContext(EditContext);

  const { camera } = useThree();
  useFrame(() => {
    if (isEditMode) {
      camera.position.x = 0;
      camera.position.y = 400;
      camera.position.z = 0;
    }
  });

  const lightRef = useRef();
  useHelper(lightRef, THREE.DirectionalLightHelper);
  return (
    <>
      {isEditMode ? (
        <gridHelper
          args={[500, 50]}
          position={(0, START_Y, 0)}
          onPointerMove={onPointMove}
        />
      ) : null}
      <ambientLight intensity={4} />
      <directionalLight
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-left={-100}
        shadow-camera-bottom={-100}
        shadow-mapSize={[5000, 5000]}
        castShadow
        intensity={4}
        position={[162, 10, 102]}
        target-position={[160, 0, 100]}
      />
      <OrbitControls />
      <Suspense>
        <Physics gravity={[0, -9.81, 0]}>
          <RigidBody
            name="land"
            friction={3}
            type="fixed"
            colliders={"trimesh"}
          >
            <ZooMap />
          </RigidBody>
          {objects.map(({ id, ...objects }) => (
            <Fragment key={id}>
              {objects.type === "animal" ? (
                <Animal objectId={id} onClick={onObjectClicked} {...objects} />
              ) : (
                <Dino objectId={id} onClick={onObjectClicked} {...objects} />
              )}
            </Fragment>
          ))}
          <Rtanny />
        </Physics>
      </Suspense>

      <EffectComposer>
        <HueSaturation
          blendFunction={BlendFunction.NORMAL}
          hue={0}
          saturation={0}
        />
        <BrightnessContrast brightness={0} contrast={0} />
        {isEditMode ? (
          <Noise premultiply blendFunction={BlendFunction.ADD} />
        ) : null}
      </EffectComposer>
    </>
  );
};
