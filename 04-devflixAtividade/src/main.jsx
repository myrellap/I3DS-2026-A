import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const THEME_STORAGE_KEY = "devflix-theme";

const applyTheme = (isDarkMode) => {
  const theme = isDarkMode ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
};

const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

if (storedTheme === "dark" || storedTheme === "light") {
  applyTheme(storedTheme === "dark");
} else {
  applyTheme(mediaQuery.matches);
}

const handleThemeChange = (event) => {
  const manualTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (manualTheme === "dark" || manualTheme === "light") {
    return;
  }

  applyTheme(event.matches);
};

if (mediaQuery.addEventListener) {
  mediaQuery.addEventListener("change", handleThemeChange);
} else {
  mediaQuery.addListener(handleThemeChange);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
