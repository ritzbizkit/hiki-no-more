import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { tutorialSteps } from '../data';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const TutorialPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNextStep = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Logic for the end of the tutorial
      navigate('/chat');
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      // Logic for the start of the tutorial
      navigate('/results');
    }
  };

  const currentStep = tutorialSteps[currentStepIndex];

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${theme.background}`}>
      <div className={`w-full max-w-sm p-6 rounded-xl shadow-lg text-center ${theme.secondary}`}>
        <p className={`text-md mt-2 ${theme.text}`}>{currentStep.text}</p>
        <div className="flex justify-between items-center mt-4">
          <button onClick={handlePreviousStep} className={`flex items-center text-blue-600 font-bold ${theme.text}`}>
            <ChevronLeftIcon className="w-6 h-6 mr-1" />
            Previous
          </button>
          <button onClick={handleNextStep} className={`flex items-center text-blue-600 font-bold ${theme.text}`}>
            Next
            <ChevronRightIcon className="w-6 h-6 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;