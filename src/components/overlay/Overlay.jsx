import { useContext } from "react";
import { EditContext } from "../../context/EditContext";
import { EditIcon } from "../icons/EditIcon";
import { RotateLeft } from "../icons/RotateLeft";
import { RotateRight } from "../icons/RotateRight";

export const Overlay = () => {
  const { setIsEditMode, selectedId, rotate, isEditMode } =
    useContext(EditContext);
  return (
    <div className="overlay">
      {isEditMode && selectedId ? (
        <>
          <RotateLeft onClick={() => rotate("left")} />
          <RotateRight onClick={() => rotate("right")} />
        </>
      ) : null}
      <EditIcon
        onClick={() => {
          setIsEditMode((prev) => !prev);
        }}
      />
    </div>
  );
};
