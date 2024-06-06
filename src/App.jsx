import { useState } from "react";
import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";

function App() {
  const [colors, setColors] = useState(initialColors);

  const addColor = (newColor) => {
    setColors((prevColors) => [...prevColors, { ...newColor, id: nanoid() }]);
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={addColor} />
      <div className="color-container">
        {colors.map((color) => (
          <Color key={color.id} color={color} />
        ))}
      </div>
    </>
  );
}

export default App;
