import { useEffect, useState } from "react";

const useTheme = () => {
  const [isDarkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
      setDarkTheme(true);
  }, []);

  return isDarkTheme;
};

export default useTheme;
