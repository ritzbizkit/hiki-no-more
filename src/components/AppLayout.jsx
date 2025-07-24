import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar.jsx';

const AppLayout = () => {
  return (
    // The background is now a light gray
    <div className="max-w-md mx-auto h-screen bg-gray-50">
      <main className="pb-24"> {/* Extra padding-bottom for nav bar */}
        <Outlet /> {/* Child pages will be rendered here */}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default AppLayout;