import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { tutorialSteps } from '../data';

const TutorialOverlay = ({ onClose }) => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highlightRect, setHighlightRect] = useState(null);

  useEffect(() => {
    const step = tutorialSteps[currentStepIndex];
    if (step.highlightId) {
      const element = document.getElementById(step.highlightId);
      if (element) {
        setHighlightRect(element.getBoundingClientRect());
      }
    } else {
      setHighlightRect(null);
    }
  }, [currentStepIndex]);

  const handleNextStep = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      onClose();
    }
  };

  const currentStep = tutorialSteps[currentStepIndex];

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4">
      {highlightRect && (
        <div
          className="absolute"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
            borderRadius: '12px',
          }}
        />
      )}
      <div className="relative p-6 rounded-lg text-center max-w-sm">
        {currentStep.title && (
            <h1 className="text-xl font-bold mb-4 text-white">
                {currentStep.title}
            </h1>
        )}
        <p className="text-white mb-6">
          {currentStep.text}
        </p>
        <div className={`flex items-center mt-4 ${currentStepIndex > 0 ? 'justify-between' : 'justify-end'}`}>
          {currentStepIndex > 0 && (
            <button 
              onClick={handlePreviousStep} 
              className="flex items-center text-white font-bold text-lg"
            >
              <ChevronLeftIcon className="w-6 h-6 mr-1" />
              Previous
            </button>
          )}
          <button 
            onClick={handleNextStep} 
            className="flex items-center text-white font-bold text-lg"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;