import { useState } from "react";

export const useTheme = (localStorage: Storage, window: Window) => {
  const [isDarkTheme, setThemeDark] = useState(false);

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setThemeDark(true);
  }

  return isDarkTheme;
};
