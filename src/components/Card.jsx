// src/components/Card.jsx
import React from 'react';
import { useTheme } from './ThemeProvider';

const Card = ({ children, className = '' }) => {
  const { theme } = useTheme();

  // This component combines the theme's secondary color with any other classes you want to add
  const cardClasses = `p-4 rounded-xl shadow-sm ${theme.secondary} ${className}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;