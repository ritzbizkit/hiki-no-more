import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useBuddy } from '../context/BuddyContext';
import { useTheme } from '../components/ThemeProvider';
import TutorialOverlay from '../components/TutorialOverlay.jsx';

const ChatHomePage = ({ activeChats }) => {
  // Get the chosen buddy's details and the theme
  const { buddyDetails } = useBuddy();
  const { theme } = useTheme();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const showTutorial = searchParams.get('showTutorial') === 'true';

  // --- THIS IS THE FIX ---
  // If no buddy has been chosen yet, show a helpful message instead of crashing.
  if (!buddyDetails) {
    return (
      <div className="p-4 text-center flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Chats!</h1>
        <p className="mb-6 max-w-xs">To start chatting with your buddy, you first need to find out who suits you best.</p>
        <Link to="/" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg">
          Take the Persona Quiz
        </Link>
      </div>
    );
  }
  // --- END OF FIX ---

  return (
    <div className={`p-4 min-h-screen ${theme.background}`}>
      <div className="bg-white/50 p-4 rounded-xl text-center mb-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
      </div>

      {/* Main Buddy Chat Card */}
      <Link to={`/chat/${buddyDetails.name.toLowerCase()}`}>
        <div className="flex items-center gap-4 mb-8 p-4 bg-white/80 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <img src={buddyDetails.image} alt={buddyDetails.name} className="w-20 h-20" />
          <div className="text-left text-gray-800">
            <p className="font-bold text-xl">{buddyDetails.name}</p>
            <p className="text-sm">This is the beginning of your journey with {buddyDetails.name}!</p>
          </div>
        </div>
      </Link>

      <div className="p-4 bg-white/50 rounded-xl">
        <Link to="/connect" className="text-blue-600 font-bold">
          + Connect with others!
        </Link>
      </div>
      
      {showTutorial && (
        <TutorialOverlay
          onClose={() => setSearchParams({})}
        />
      )}
    </div>
  );
};

export default ChatHomePage;