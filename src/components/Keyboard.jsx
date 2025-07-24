import React from 'react';

const Keyboard = ({ isVisible }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-56 bg-gray-300 p-2 space-y-1 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((row) => (
        <div key={row} className="flex justify-center gap-1">
          {row.split('').map((key) => (
            <div key={key} className="h-10 w-8 bg-white rounded-md shadow flex items-center justify-center font-semibold text-gray-800">
              {key}
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-1">
        <div className="h-10 w-full max-w-xs bg-white rounded-md shadow"></div>
      </div>
    </div>
  );
};

export default Keyboard;