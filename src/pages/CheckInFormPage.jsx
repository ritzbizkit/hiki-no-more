// src/pages/CheckInFormPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { ChevronLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import Card from '../components/Card';

// A small component for the slider questions
const MoodSlider = ({ question, lowLabel, highLabel }) => {
  const { theme } = useTheme();
  return (
    <div className="w-full">
      <label className={`block font-semibold mb-2 ${theme.text}`}>{question}</label>
      <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
      <div className={`flex justify-between text-sm mt-1 ${theme.text}`}>
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
};

const CheckInFormPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 min-h-dvh flex flex-col justify-between ${theme.background}`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/check-in" className={`${theme.text}`}>
            <ChevronLeftIcon className="w-8 h-8" />
          </Link>
          <h1 className={`text-2xl font-bold ${theme.text}`}>Check-In</h1>
          <button className={`${theme.text}`}>
            <Cog6ToothIcon className="w-8 h-8" />
          </button>
        </div>

        {/* Form Card */}
        <Card>
          <div className="space-y-6">
            <MoodSlider question="How did social interactions make you feel today?" lowLabel="Bad" highLabel="Good" />
            <MoodSlider question="How much did you worry about being judged?" lowLabel="A lot" highLabel="Not at all" />
            <MoodSlider question="How much were you putting on a front today?" lowLabel="A lot" highLabel="Not at all" />
            
            <div className="text-center pt-4">
              <label className={`block font-semibold mb-4 ${theme.text}`}>Overall Mood</label>
              <div className="flex justify-center gap-6">
                <span className="text-4xl">😞</span>
                <span className="text-4xl">😐</span>
                <span className="text-4xl">🙂</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <button className={`w-full py-4 rounded-full font-bold shadow-lg ${theme.primary} ${theme.accentText}`}>
        Submit
      </button>
    </div>
  );
};

export default CheckInFormPage;