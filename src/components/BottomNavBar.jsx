import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { path: '/check-in', label: 'Diary', icon: '📝' },
  { path: '/chat', label: 'Chats', icon: '💬' },
  { path: '/quests', label: 'Quests', icon: '📖' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

const BottomNavBar = () => {
  const { theme } = useTheme();

  return (
    <nav id="navbar-container" className={`flex justify-around items-center p-2 shadow-lg ${theme.primary}`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => 
            `flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive ? 'bg-white bg-opacity-20' : ''
            }`
          }
        >
          <div className={`text-xl mb-1 ${theme.accentText}`}>{link.icon}</div>
          <span className={`text-xs font-medium ${theme.accentText}`}>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavBar;