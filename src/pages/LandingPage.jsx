import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import { tutorialStepsLanding } from '../data';

const LandingPage = () => {
  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      const tutorialCompleted = localStorage.getItem('tutorial_LandingPage');
      if (tutorialCompleted !== 'true') {
        setStepsEnabled(true);
      }
    }, 1000);

    return () => clearTimeout(handle);
  }, []);

  const onTutorialComplete = () => {
    localStorage.setItem('tutorial_LandingPage', 'true');
    setStepsEnabled(false);
  };

  const replayTutorial = () => {
    setStepsEnabled(true);
  };

  const onExit = (stepIndex) => {
    // Check if we're on the last step (intro.js uses 0-based indexing)
    if (stepIndex === tutorialStepsLanding.length - 1) {
      onTutorialComplete();
    } else {
      setStepsEnabled(false);
    }
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-dvh"
      style={{ backgroundColor: '#FBFBFE' }}
    >
      <Steps
        enabled={stepsEnabled}
        steps={tutorialStepsLanding}
        initialStep={0}
        onExit={onExit}
        onComplete={onTutorialComplete}
      />
      {/* Logo Image */}
      <img
        src="/logo.svg"
        alt="Hiki-No-More Logo"
        className="w-32 h-auto mb-4"
      />

      {/* App Name */}
      <h1 id="title" className="text-2xl my-8 font-bold text-gray-700">
        Hiki-No-More
      </h1>

      {/* Buttons Container */}
      <div className="flex flex-col gap-4 w-full max-w-xs px-4">
        {/* Log In Button */}
        <Link
            to="/login"
            id="login-button"
            className="btn btn-lg rounded-full border-none text-black"
            style={{ backgroundColor: '#A8D1F5' }}
        >
          Log In
        </Link>

        {/* Sign up Button - I've made this a link to a future /signup page */}
        <Link
            to="/signup"
            id="signup-button"
            className="btn btn-lg rounded-full border-none text-black"
            style={{ backgroundColor: '#A8D1F5' }}
        >
          Sign up
        </Link>
        <button
            id="play-tutorial-button"
            className="btn btn-lg rounded-full border-none text-black"
            style={{ backgroundColor: '#A8D1F5' }}
            onClick={replayTutorial}
        >
          Replay Tutorial
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
