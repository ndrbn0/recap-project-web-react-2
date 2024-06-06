import { useState, useEffect } from "react";

export default function ColorInput({ id, value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="color-input">
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleInputChange}
      />
      <input type="color" value={inputValue} onChange={handleInputChange} />
    </div>
  );
}
