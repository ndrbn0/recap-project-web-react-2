import { useState } from "react";
import "../Components/ThemeSwitcher.css";

export default function ThemeSwitcher({
  themes,
  activeThemeId,
  setActiveThemeId,
  addTheme,
  deleteTheme,
}) {
  const [newThemeName, setNewThemeName] = useState("");

  const handleAddTheme = () => {
    if (newThemeName.trim()) {
      addTheme(newThemeName);
      setNewThemeName("");
    }
  };

  return (
    <div className="theme-switcher">
      <select
        value={activeThemeId}
        onChange={(e) => setActiveThemeId(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <div className="theme-actions">
        <input
          type="text"
          value={newThemeName}
          onChange={(e) => setNewThemeName(e.target.value)}
          placeholder="New theme name"
        />
        <button onClick={handleAddTheme}>Add Theme</button>
        <ul>
          {themes.map(
            (theme) =>
              theme.id !== "t1" && (
                <li key={theme.id}>
                  {theme.name}
                  <button onClick={() => deleteTheme(theme.id)}>Delete</button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}
