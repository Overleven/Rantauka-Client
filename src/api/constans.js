import { DefaultTheme } from "react-native-paper";

const primaryColor = "#2980b9";
const secondaryColor = "#3498db";
const thirdColor = "#bdc3c7";
const bgColor = "#ecf0f1";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2980b9",
    accent: "#f1c40f"
  }
};

export { theme, bgColor, primaryColor, secondaryColor, thirdColor };
