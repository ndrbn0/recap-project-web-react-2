import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import { getA11yScore } from "../../lib/contrastChecker";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
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
          <div className="color-info">
            <h3 className="color-card-highlight">{color.hex}</h3>
            <CopyToClipboard text={color.hex} label="Hex" />
          </div>
          <div className="color-info">
            <h4>{color.role}</h4>
          </div>
          <div className="color-info">
            <p>Contrast: {color.contrastText}</p>
            <CopyToClipboard text={color.contrastText} label="Contrast Text" />
          </div>
          <p>A11y Score: {a11yScore ? a11yScore.ratio : "Loading..."}</p>
          {confirmDelete ? (
            <div>
              <p className="color-card-highlight">Are you sure?</p>
              <button onClick={() => deleteColor(color.id)}>Yes</button>
              <button onClick={() => onDelete(null)}>No</button>
            </div>
          ) : (
            <>
              <button className="button1" onClick={() => onDelete(color.id)}>
                Delete
              </button>
              <button className="button1" onClick={onEdit}>
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
