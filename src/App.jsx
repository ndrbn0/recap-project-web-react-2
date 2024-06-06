import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });
  const [colorToDelete, setColorToDelete] = useLocalStorageState(
    "colorToDelete",
    { defaultValue: null }
  );
  const [colorToEdit, setColorToEdit] = useLocalStorageState("colorToEdit", {
    defaultValue: null,
  });

  const addColor = (newColor) => {
    setColors((prevColors) => [{ ...newColor, id: nanoid() }, ...prevColors]);
  };

  const deleteColor = (colorId) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== colorId)
    );
    setColorToDelete(null);
  };

  const handleDeleteConfirmation = (colorId) => {
    setColorToDelete(colorId);
  };

  const updateColor = (updatedColor) => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
    setColorToEdit(null);
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
            onEdit={() => setColorToEdit(color.id)}
            isEditing={colorToEdit === color.id}
            updateColor={updateColor}
          />
        ))}
      </div>
    </>
  );
}

export default App;
