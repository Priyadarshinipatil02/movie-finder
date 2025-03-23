import { createContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  // Load theme mode from localStorage or default to false (light mode)
  const storedTheme = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedTheme);

  useEffect(() => {
    // Save dark mode state to localStorage whenever it changes
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
