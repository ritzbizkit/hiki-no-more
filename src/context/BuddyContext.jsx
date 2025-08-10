import React, { createContext, useState, useContext, useEffect } from 'react';
import { resultsData } from '../data'; // We need the buddy details

// 1. Create the context
const BuddyContext = createContext();

// 2. Create the Provider component
// This component will wrap parts of our app that need buddy info.
export const BuddyProvider = ({ children }) => {
  // State to hold the name of the chosen buddy, e.g., 'nervy'
  const [chosenBuddy, setChosenBuddy] = useState(() => {
    // Try to get the buddy from localStorage on initial load
    return localStorage.getItem('chosenBuddy') || null;
  });

  // Whenever chosenBuddy changes, save it to localStorage
  useEffect(() => {
    if (chosenBuddy) {
      localStorage.setItem('chosenBuddy', chosenBuddy);
    } else {
      localStorage.removeItem('chosenBuddy');
    }
  }, [chosenBuddy]);

  // The 'value' is what we share with all child components
  const value = { 
    chosenBuddy, 
    setChosenBuddy, 
    buddyDetails: chosenBuddy ? resultsData[chosenBuddy] : null 
  };

  return (
    <BuddyContext.Provider value={value}>
      {children}
    </BuddyContext.Provider>
  );
};

// 3. Create the custom hook
// This is the hook our components will use to get the buddy info.
export const useBuddy = () => {
  const context = useContext(BuddyContext);
  
  // This is a safety check. If a component tries to use this hook
  // but it's not inside a <BuddyProvider>, we throw a helpful error.
  if (context === undefined) {
    throw new Error('useBuddy must be used within a BuddyProvider');
  }
  
  return context;
};