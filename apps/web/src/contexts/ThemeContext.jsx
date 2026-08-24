import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage on initialization
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('virtho_theme');
      return savedTheme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document root
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('virtho_theme', newTheme);
      }
      
      return newTheme;
    });
  };

  const setLightTheme = () => {
    setTheme('light');
    if (typeof window !== 'undefined') {
      localStorage.setItem('virtho_theme', 'light');
    }
  };

  const setDarkTheme = () => {
    setTheme('dark');
    if (typeof window !== 'undefined') {
      localStorage.setItem('virtho_theme', 'dark');
    }
  };

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDarkMode: theme === 'dark',
    isLightMode: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}