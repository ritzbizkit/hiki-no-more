import React, { createContext, useContext } from 'react';
import { useBuddy } from '../context/BuddyContext';

// UPDATED: Themes now include a full palette of Tailwind CSS classes
const themes = {
  nervy: {
    background: 'bg-gradient-to-b from-blue-100 to-blue-200',
    primary: 'bg-blue-400',
    secondary: 'bg-blue-50/80',
    text: 'text-blue-900',
    accentText: 'text-white',
  },
  iso: {
    background: 'bg-gradient-to-b from-purple-100 to-purple-200',
    primary: 'bg-purple-400',
    secondary: 'bg-purple-50/80',
    text: 'text-purple-900',
    accentText: 'text-white',
  },
  avoi: {
    background: 'bg-gradient-to-b from-pink-100 to-pink-200',
    primary: 'bg-pink-400',
    secondary: 'bg-pink-50/80',
    text: 'text-red-900',
    accentText: 'text-white',
  },
  enthu: {
    background: 'bg-gradient-to-b from-orange-100 to-orange-200',
    primary: 'bg-orange-400',
    secondary: 'bg-orange-50/80',
    text: 'text-orange-900',
    accentText: 'text-white',
  },
  default: {
    background: 'bg-gray-200',
    primary: 'bg-gray-400',
    secondary: 'bg-white/80',
    text: 'text-gray-900',
    accentText: 'text-white',
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { chosenBuddy } = useBuddy();
  const theme = themes[chosenBuddy] || themes.default;
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;