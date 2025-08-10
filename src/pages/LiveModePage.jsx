import React, { useState } from 'react';
// UPDATED: We need useNavigate for the back button
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../components/ThemeProvider';
import { useBuddy } from '../context/BuddyContext';
import Card from '../components/Card';

const LiveModePage = () => {
  const { theme } = useTheme();
  const { buddyDetails } = useBuddy();
  // UPDATED: Initialize the navigate function
  const navigate = useNavigate();

  const [isPromptVisible, setPromptVisible] = useState(false);
  const [isListening, setIsListening] = useState(true);

  if (!buddyDetails) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Live Mode</h1>
        <p>No buddy chosen yet.</p>
        <Link to="/" className="text-blue-500">Go back and take the quiz</Link>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen p-6 ${theme.background}`}>
      <Card className={`text-center relative mb-12 !p-3 ${theme.primary}`}>
        {/* UPDATED: This is now a button that calls navigate(-1) */}
        <button onClick={() => navigate(-1)} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text}`}>
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className={`text-2xl font-bold ${theme.text}`}>Live Mode</h1>
      </Card>

      <div className="flex flex-col items-center text-center gap-6 flex-grow">
        <p className={`text-lg ${theme.text}`}>
          {isListening ? `${buddyDetails.name} is listening in!` : `${buddyDetails.name} is not listening in now`}
        </p>

        {isPromptVisible ? (
          <>
            <div className="bg-pink-100 p-4 rounded-xl text-left text-gray-800 w-full max-w-xs relative">
              <p>They're opening up emotionally — that's a chance to show empathy. You don't have to fix it. Just acknowledge how they feel.</p>
              <span className="absolute bottom-2 right-4 text-xs text-gray-500">time</span>
            </div>
            <button 
              onClick={() => setPromptVisible(false)}
              className={`btn btn-lg h-auto py-3 rounded-2xl border-none w-full max-w-xs ${theme.primary} ${theme.accentText}`}
            >
              Done!
            </button>
          </>
        ) : (
          <>
            <img 
              src={buddyDetails.image} 
              alt={`${buddyDetails.name} Live Mode`}
              className="w-40 h-auto cursor-pointer"
              onMouseDown={() => setIsListening(false)}
              onMouseUp={() => setIsListening(true)}
              onTouchStart={() => setIsListening(false)}
              onTouchEnd={() => setIsListening(true)}
            />
            
            {isListening && (
              <>
                <button 
                  onClick={() => setPromptVisible(true)}
                  className={`btn btn-lg h-auto py-3 rounded-2xl border-none w-full max-w-xs ${theme.primary} ${theme.accentText}`}
                >
                  Tap me for prompts!
                </button>
                <p className={`text-gray-500`}>
                  Hold down avatar to cover their ears!
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LiveModePage;