import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

const MainLayout = () => {
  return (
    <div style={{ backgroundColor: '#FBFBFE' }} className="min-h-dvh">
      {/* The Outlet will render the current page's content */}
      <main className="pb-24"> {/* Added padding-bottom to prevent overlap */}
        <Outlet />
      </main>
      
      {/* The BottomNavBar is always visible */}
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;