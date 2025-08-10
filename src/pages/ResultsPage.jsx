import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resultsData } from '../data.js';

// Import the hooks we need to save the buddy and get the theme
import { useBuddy } from '../context/BuddyContext.jsx';
import { useTheme } from '../components/ThemeProvider.jsx';

const ResultsPage = ({ answers }) => {
  // Get the function to save the chosen buddy from our context
  const { setChosenBuddy } = useBuddy();

  const winningPersona = useMemo(() => {
    if (!answers || Object.keys(answers).length === 0) {
      return null;
    }
    const counts = Object.values(answers).reduce((acc, persona) => {
      acc[persona] = (acc[persona] || 0) + 1;
      return acc;
    }, {});
    let maxCount = 0;
    let winner = null;
    for (const persona in counts) {
      if (counts[persona] > maxCount) {
        maxCount = counts[persona];
        winner = persona;
      }
    }
    return winner || 'nervy';
  }, [answers]);

  // --- NEW LOGIC START ---
  // This hook runs after the winner is calculated.
  // It tells the rest of the app who the chosen buddy is.
  useEffect(() => {
    if (winningPersona) {
      setChosenBuddy(winningPersona);
    }
  }, [winningPersona, setChosenBuddy]);
  
  // Get the correct theme based on the now-chosen buddy
  const { theme } = useTheme();
  // --- NEW LOGIC END ---

  const buddy = resultsData[winningPersona];

  if (!buddy) {
    return <div className="p-4">Could not determine your buddy. Please try the quiz again.</div>;
  }

  return (
    // UPDATED: The background now comes from our dynamic theme
    <div className={`min-h-screen flex flex-col items-center justify-center text-center p-4 ${theme.background}`}>
      <h1 className="text-xl font-semibold text-white/80 mb-2">You got...</h1>
      <h2 className="text-5xl font-bold text-white mb-4">{buddy.name}!</h2>
      
      <div className="my-8">
        <img src={buddy.image} alt={buddy.name} className="w-48 h-48" />
      </div>
      
      <p className="text-lg font-medium text-white/90">{buddy.tagline}</p>
      <p className="max-w-sm mx-auto my-4 text-white/80">
        {buddy.description}
      </p>

      <Link
        to="/quests" 
        className="mt-8 px-10 py-4 bg-white text-blue-500 font-bold rounded-full shadow-xl text-lg"
      >
        Meet your buddy!
      </Link>
    </div>
  );
};

export default ResultsPage;