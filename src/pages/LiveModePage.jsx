import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const LiveModePage = () => {
  const [isPromptVisible, setPromptVisible] = useState(false);
  const [isListening, setIsListening] = useState(true);

  return (
    <div className="flex flex-col min-h-screen p-6" style={{ backgroundColor: '#FBFBFE' }}>
      {/* Header */}
      <div className="bg-blue-100 p-4 rounded-xl text-center relative mb-12 shadow-sm">
        <Link to="/group-chat/nervy-rittu" className="absolute left-4 top-4">
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Live Mode</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center gap-6 flex-grow">
        <p className="text-lg text-gray-700">
          {isListening ? "Nervy is listening in!" : "Nervy is not listening in now"}
        </p>

        {isPromptVisible ? (
          <>
            <div className="bg-pink-100 p-4 rounded-xl text-left text-gray-800 w-full max-w-xs relative">
              <p>They're opening up emotionally — that's a chance to show empathy. You don't have to fix it. Just acknowledge how they feel.</p>
              <span className="absolute bottom-2 right-4 text-xs text-gray-500">time</span>
            </div>
            <button 
              onClick={() => setPromptVisible(false)}
              className="btn btn-lg h-auto py-3 rounded-2xl border-none text-black w-full max-w-xs" 
              style={{ backgroundColor: '#A8D1F5' }}
            >
              Done!
            </button>
          </>
        ) : (
          <>
            <img 
              // This is the updated line with the corrected filename
              src={isListening ? "/Nervy4.svg" : "/Asset16.svg"} 
              alt="Nervy Live Mode" 
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
                  className="btn btn-lg h-auto py-3 rounded-2xl border-none text-black w-full max-w-xs" 
                  style={{ backgroundColor: '#A8D1F5' }}
                >
                  Tap me for prompts!
                </button>
                <p className="text-gray-500">
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