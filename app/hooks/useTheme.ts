import { useEffect, useState } from "react";

//NOTE - No longer used as we use the shadcn/ui toaster.
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
