import React, { createContext, useState, useContext } from 'react';

const KeyboardContext = createContext();

export const useKeyboard = () => useContext(KeyboardContext);

export const KeyboardProvider = ({ children }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const value = {
    isKeyboardVisible,
    showKeyboard: () => setKeyboardVisible(true),
    hideKeyboard: () => setKeyboardVisible(false),
  };

  return (
    <KeyboardContext.Provider value={value}>
      {children}
    </KeyboardContext.Provider>
  );
};