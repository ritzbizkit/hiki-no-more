import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

const MoodButton = ({ mood, selectedMood, setSelectedMood }) => {
  const isSelected = selectedMood === mood.name;
  return (
    <button 
      onClick={() => setSelectedMood(mood.name)}
      className={`text-5xl p-2 rounded-full transition-transform duration-200 ${isSelected ? 'scale-125' : 'opacity-50 hover:opacity-100'}`}
    >
      {mood.emoji}
    </button>
  );
};

const CheckInPage = () => {
  // State for the sliders and mood
  const [feelValue, setFeelValue] = useState(50);
  const [worryValue, setWorryValue] = useState(50);
  const [frontValue, setFrontValue] = useState(50);
  const [selectedMood, setSelectedMood] = useState('neutral');

  const moods = [
    { name: 'happy', emoji: '🙂' },
    { name: 'neutral', emoji: '😐' },
    { name: 'sad', emoji: '🙁' },
  ];

  return (
    <div style={{ backgroundColor: '#FBFBFE' }} className="p-4 min-h-screen">
      {/* Header */}
      <div className="bg-blue-100 p-4 rounded-xl flex items-center justify-between relative mb-6 shadow-sm">
        <Link to="/diary">
          <ChevronLeftIcon className="w-8 h-8 text-gray-800" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Check-In</h1>
        <button>
          <Cog6ToothIcon className="w-8 h-8 text-gray-800" />
        </button>
      </div>

      {/* Questions Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
        {/* Interaction Feel Slider */}
        <div>
          <label className="label justify-start font-semibold text-gray-700">How did social interactions make you feel today?</label>
          <input type="range" min={0} max="100" value={feelValue} onChange={(e) => setFeelValue(e.target.value)} className="range range-primary" />
          <div className="w-full flex justify-between text-xs px-2">
            <span>Bad</span>
            <span>Good</span>
          </div>
        </div>
        {/* Worry Slider */}
        <div>
          <label className="label justify-start font-semibold text-gray-700">How much did you worry about being judged?</label>
          <input type="range" min={0} max="100" value={worryValue} onChange={(e) => setWorryValue(e.target.value)} className="range range-primary" />
          <div className="w-full flex justify-between text-xs px-2">
            <span>Alot</span>
            <span>Not at all</span>
          </div>
        </div>
        {/* Front Slider */}
        <div>
          <label className="label justify-start font-semibold text-gray-700">How much were you putting on a front today?</label>
          <input type="range" min={0} max="100" value={frontValue} onChange={(e) => setFrontValue(e.target.value)} className="range range-primary" />
          <div className="w-full flex justify-between text-xs px-2">
            <span>Alot</span>
            <span>Not at all</span>
          </div>
        </div>

        <div className="border-t pt-6">
          <label className="label justify-center font-semibold text-gray-700">Overall Mood</label>
          <div className="flex justify-around items-center mt-4">
            {moods.map(mood => (
              <MoodButton key={mood.name} mood={mood} selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
            ))}
          </div>
        </div>

        <button className="btn btn-lg w-full rounded-2xl border-none text-black mt-6" style={{ backgroundColor: '#A8D1F5' }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CheckInPage;