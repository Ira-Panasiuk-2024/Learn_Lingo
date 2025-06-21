import { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, STORAGE_KEY } from '../utils/constants';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    return storedTheme && THEMES.includes(storedTheme)
      ? storedTheme
      : THEMES[0];
  });

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(currentTheme);
    localStorage.setItem(STORAGE_KEY, currentTheme);
  }, [currentTheme]);

  const changeTheme = themeName => {
    if (THEMES.includes(themeName)) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    changeTheme,
    allThemes: THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
