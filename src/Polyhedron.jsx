import { useRef, useState } from "react";

export default function Polyhedron({ polyhedron, color, ...props }) {
  const ref = useRef();
  const [count, setCount] = useState(2);

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3);
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}
