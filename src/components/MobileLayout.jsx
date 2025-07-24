import React from 'react';
import { useKeyboard } from '../context/KeyboardContext.jsx';
import Keyboard from './Keyboard.jsx';

const MobileLayout = ({ children }) => {
  const { isKeyboardVisible } = useKeyboard();

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md h-screen bg-white shadow-2xl relative overflow-hidden">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
        <Keyboard isVisible={isKeyboardVisible} />
      </div>
    </div>
  );
};

export default MobileLayout;