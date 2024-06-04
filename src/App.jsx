import { useState } from "react";
import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";

function App() {
  const [colors, setColors] = useState(initialColors);
  const [colorToDelete, setColorToDelete] = useState(null);

  const addColor = (newColor) => {
    setColors((prevColors) => [{ ...newColor, id: nanoid() }, ...prevColors]);
  };

  const deleteColor = (colorId) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== colorId)
    );
    setColorToDelete(null); // Reset the confirmation state
  };

  const handleDeleteConfirmation = (colorId) => {
    setColorToDelete(colorId);
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={addColor} />
      <div className="color-container">
        {colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDelete={handleDeleteConfirmation}
            confirmDelete={colorToDelete === color.id}
            deleteColor={deleteColor}
          />
        ))}
      </div>
    </>
  );
}

export default App;
