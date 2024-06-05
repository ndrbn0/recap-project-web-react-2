import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import { getA11yScore } from "../../lib/contrastChecker";
import "./Color.css";

export default function Color({
  color,
  onDelete,
  confirmDelete,
  deleteColor,
  onEdit,
  isEditing,
  updateColor,
}) {
  const [a11yScore, setA11yScore] = useState(null);

  useEffect(() => {
    const fetchA11yScore = async () => {
      const score = await getA11yScore(color);
      setA11yScore(score);
    };

    fetchA11yScore();
  }, [color]);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? (
        <ColorForm
          onSubmitColor={updateColor}
          initialData={color}
          isEditMode={true}
        />
      ) : (
        <>
          <h3 className="color-card-highlight">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>Contrast: {color.contrastText}</p>
          <p>A11y Score: {a11yScore ? a11yScore.ratio : "Loading..."}</p>
          {confirmDelete ? (
            <div>
              <p className="color-card-highlight">Are you sure?</p>
              <button onClick={() => deleteColor(color.id)}>Yes</button>
              <button onClick={() => onDelete(null)}>No</button>
            </div>
          ) : (
            <>
              <button onClick={() => onDelete(color.id)}>Delete</button>
              <button onClick={onEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
