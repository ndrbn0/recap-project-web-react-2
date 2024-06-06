import axios from "axios";

export const getA11yScore = async (color) => {
  try {
    const response = await axios.get(
      `https://webaim.org/resources/contrastchecker/?fcolor=${color.hex.substring(
        1
      )}&bcolor=${color.contrastText.substring(1)}&api`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching a11y score:", error);
    return null;
  }
};
