import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      <div className="color-container">
        {initialColors.map((color) => (
          <Color key={color.id} color={color} />
        ))}
      </div>
    </>
  );
}

export default App;
