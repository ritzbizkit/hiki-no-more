import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

const AppLayout = () => {
  const location = useLocation();
  const showNavBar = ['/chat', '/quests', '/check-in', '/profile'].includes(location.pathname);

  return (
    <div className="flex justify-center h-screen bg-gray-200">
      <div className="relative w-full md:max-w-md bg-white shadow-xl flex flex-col">
        {/* This div contains the main content of your app and handles the scrolling */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        
        {/* The BottomNavBar is now conditionally rendered */}
        {showNavBar && <BottomNavBar />}
      </div>
    </div>
  );
};

export default AppLayout;
