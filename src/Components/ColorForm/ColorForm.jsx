import { useState } from "react";
import ColorInput from "../../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  onSubmitColor,
  initialData = { role: "", hex: "#ffffff", contrastText: "#000000" },
  isEditMode = false,
}) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitColor(formData);
    if (!isEditMode) {
      setFormData({ role: "", hex: "#ffffff", contrastText: "#000000" });
    }
  };

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="hex">Hex</label>
        <ColorInput
          id="hex"
          name="hex"
          value={formData.hex}
          onChange={(value) => handleChange({ target: { name: "hex", value } })}
          placeholder="#ffffff"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contrastText">Contrast Text</label>
        <ColorInput
          id="contrastText"
          name="contrastText"
          value={formData.contrastText}
          onChange={(value) =>
            handleChange({ target: { name: "contrastText", value } })
          }
          placeholder="#000000"
          required
        />
      </div>
      <button type="submit">{isEditMode ? "SAVE COLOR" : "ADD COLOR"}</button>
    </form>
  );
}
