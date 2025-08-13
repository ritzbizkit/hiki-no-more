import React from 'react';

const MobileLayout = ({ children }) => {

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
      <div className="w-full md:max-w-md h-screen bg-white shadow-2xl relative overflow-hidden">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
