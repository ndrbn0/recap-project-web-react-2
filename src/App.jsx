import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/InitialTheme";
import ThemeSwitcher from "./Components/ThemeSwitcher";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [activeThemeId, setActiveThemeId] = useLocalStorageState(
    "activeThemeId",
    { defaultValue: "t1" }
  );
  const [colorToDelete, setColorToDelete] = useLocalStorageState(
    "colorToDelete",
    { defaultValue: null }
  );
  const [colorToEdit, setColorToEdit] = useLocalStorageState("colorToEdit", {
    defaultValue: null,
  });

  const activeTheme = themes.find((theme) => theme.id === activeThemeId);

  const addColor = (newColor) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId
          ? {
              ...theme,
              colors: [{ ...newColor, id: nanoid() }, ...theme.colors],
            }
          : theme
      )
    );
  };

  const deleteColor = (colorId) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId
          ? {
              ...theme,
              colors: theme.colors.filter((color) => color.id !== colorId),
            }
          : theme
      )
    );
    setColorToDelete(null);
  };

  const handleDeleteConfirmation = (colorId) => {
    setColorToDelete(colorId);
  };

  const updateColor = (updatedColor) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId
          ? {
              ...theme,
              colors: theme.colors.map((color) =>
                color.id === updatedColor.id ? updatedColor : color
              ),
            }
          : theme
      )
    );
    setColorToEdit(null);
  };

  const addTheme = (name) => {
    const newTheme = { id: nanoid(), name, colors: [] };
    setThemes((prevThemes) => [...prevThemes, newTheme]);
  };

  const deleteTheme = (themeId) => {
    if (themeId === "t1") return; // Cannot delete Default Theme
    setThemes((prevThemes) =>
      prevThemes.filter((theme) => theme.id !== themeId)
    );
  };

  const updateTheme = (themeId, updatedData) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === themeId ? { ...theme, ...updatedData } : theme
      )
    );
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeSwitcher
        themes={themes}
        activeThemeId={activeThemeId}
        setActiveThemeId={setActiveThemeId}
        addTheme={addTheme}
        deleteTheme={deleteTheme}
      />
      <ColorForm onSubmitColor={addColor} />
      <div className="color-container">
        {activeTheme.colors.map((color) => (
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
