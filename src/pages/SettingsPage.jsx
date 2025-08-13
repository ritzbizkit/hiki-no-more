// src/pages/SettingsPage.jsx
import React from 'react';
import { useTheme } from '../components/ThemeProvider';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 min-h-dvh ${theme.background}`}>
      <Card>
        <h1 className={`text-2xl font-bold ${theme.text}`}>Settings</h1>
        <p className={`mt-4 ${theme.text}`}>
          This is where the app settings will go.
        </p>
        <Link to="/profile" className="text-blue-500 mt-6 inline-block">
          &lt; Back to Profile
        </Link>
      </Card>
    </div>
  );
};

export default SettingsPage;