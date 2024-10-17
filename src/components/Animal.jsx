import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useMemo, useRef } from "react";
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
