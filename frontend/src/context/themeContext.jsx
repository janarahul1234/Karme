import { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/constants";

const ThemeContext = createContext();

const DEFAULT_THEME = Theme.LIGHT;

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const theme = localStorage.getItem("theme");
      return theme ? theme : DEFAULT_THEME;
    } catch (error) {
      console.error("Failed to load theme:", error);
      return DEFAULT_THEME;
    }
  });

  const toggleTheme = () => {
    try {
      const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error("Failed to toggle theme:", error);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === Theme.DARK);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
