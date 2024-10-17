import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import { EditContext } from "../context/EditContext";
export const Animal = ({ name, objectId, onClick, position, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`/models/animals/${name}.glb`);
  const { actions } = useAnimations(animations, group);
  const { isEditMode, selectedId, draggedPosition } = useContext(EditContext);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const isSelected = objectId === selectedId;
  useEffect(() => {
    actions["Idle"].reset().play();
  }, []);
  useFrame((state) => {
    if (isSelected) {
      const [offsetX, offsetY, offsetZ] = position;
      const { x, y, z } = group.current.children[0].position;
      const realX = offsetX + x;
      const realY = offsetY + y;
      const realZ = offsetZ + z;

      state.camera.lookAt(realX, realY, realZ);
      state.camera.position.lerp(
        new THREE.Vector3(realX, realY + 10, realZ + 20),
        0.01
      );
    }
  });
  return (
    <>
      {isEditMode ? (
        <group
          {...props}
          scale={[2.5, 2.5, 2.5]}
          onClick={onClick(objectId)}
          ref={group}
          position={isSelected ? draggedPosition : position}
        >
          <mesh>
            <boxGeometry args={[3, 1, 4]} />
            <meshBasicMaterial transparent color={"green"} />
          </mesh>
          <primitive {...props} object={clone}></primitive>;
        </group>
      ) : (
        <group ref={group} position={position}>
          <RigidBody
            {...props}
            colliders={"hull"}
            enabledRotations={[false, false, false]}
          >
            <group onClick={onClick(objectId)}>
              <primitive object={clone}></primitive>
            </group>
          </RigidBody>
        </group>
      )}
    </>
  );
};
