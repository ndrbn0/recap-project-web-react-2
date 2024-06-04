import "./Color.css";

export default function Color({ color, onDelete, confirmDelete, deleteColor }) {
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-highlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>Contrast: {color.contrastText}</p>
      {confirmDelete ? (
        <div>
          <p className="color-card-highlight">Are you sure?</p>
          <button onClick={() => deleteColor(color.id)}>Yes</button>
          <button onClick={() => onDelete(null)}>No</button>
        </div>
      ) : (
        <button onClick={() => onDelete(color.id)}>Delete</button>
      )}
    </div>
  );
}
