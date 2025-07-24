import React, { createContext, useState, useContext } from 'react';
import { resultsData } from '../data.js'; // We'll use Nervy as a default

const BuddyContext = createContext();

export const useBuddy = () => useContext(BuddyContext);

export const BuddyProvider = ({ children }) => {
  // Set the default buddy to Nervy, or null if you prefer no default
  const [chosenBuddy, setChosenBuddy] = useState(resultsData.nervy);

  const value = {
    chosenBuddy,
    setChosenBuddy,
  };

  return (
    <BuddyContext.Provider value={value}>
      {children}
    </BuddyContext.Provider>
  );
};