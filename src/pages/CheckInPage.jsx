import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import Card from '../components/Card';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const CheckInPage = () => {
  const { theme } = useTheme();

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  const calendarDays = [
    { day: 1, mood: 'pink' }, { day: 2, mood: 'pink' }, { day: 3, mood: 'pink' },
    { day: 4, mood: 'pink' }, { day: 5, mood: 'pink' }, { day: 6, mood: 'yellow' },
    { day: 7, mood: 'yellow' }, { day: 8, mood: 'yellow' }, { day: 9, mood: 'yellow' },
    { day: 10, mood: 'yellow' }, { day: 11, mood: 'yellow' }, { day: 12, mood: 'green' },
    { day: 13, mood: 'green' }, { day: 14, mood: 'green' }, { day: 15, mood: 'green' },
    { day: 16, mood: 'green' }, { day: 17, mood: 'none' }, { day: 18, mood: 'none' },
    { day: 19, mood: 'none' }, { day: 20, mood: 'none' }, { day: 21, mood: 'none' },
    { day: 22, mood: 'none' }, { day: 23, mood: 'none' }, { day: 24, mood: 'none' },
    { day: 25, mood: 'none' }, { day: 26, mood: 'none' }, { day: 27, mood: 'none' },
    { day: 28, mood: 'none' }, { day: 29, mood: 'none' }, { day: 30, mood: 'none' },
    { day: 31, mood: 'none' },
  ];

  const moodColors = {
    pink: 'bg-pink-300 text-white',
    yellow: 'bg-yellow-300 text-white',
    green: 'bg-green-300 text-white',
    none: 'text-gray-700'
  };

  return (
    <div className={`p-4 min-h-screen ${theme.background}`}>
      {/* Themed Header */}
      <Card className={`text-center mb-6 !p-3 ${theme.primary}`}>
        <div className="flex items-center">
          {/* UPDATED: Changed theme.accentText to theme.text for better contrast */}
          <Link to="/quests" className={`w-1/3 text-left ${theme.text}`}>
            <ChevronLeftIcon className="w-8 h-8" />
          </Link>
          {/* UPDATED: Changed theme.accentText to theme.text for better contrast */}
          <h1 className={`w-1/3 text-2xl font-bold ${theme.text}`}>Calendar</h1>
          <div className="w-1/3"></div>
        </div>
      </Card>
      
      {/* Month Navigator */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className={`font-bold text-lg ${theme.text}`}>June 2025</h2>
        <div className="flex gap-4">
          <ChevronLeftIcon className={`w-6 h-6 ${theme.text}`} />
          <ChevronRightIcon className={`w-6 h-6 ${theme.text}`} />
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 place-items-center">
        {daysOfWeek.map((day, i) => <div key={i} className={`font-bold ${theme.text}`}>{day}</div>)}
        {calendarDays.map(({day, mood}) => (
          <div key={day} className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold ${moodColors[mood]}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Streak and Check-in Button */}
      <div className="text-center my-6">
        <h3 className={`text-3xl font-bold ${theme.text}`}>30 Day</h3>
        <p className={`text-lg ${theme.text}`}>check-in streak</p>
      </div>

      <Link to="/check-in/new">
        <Card className="text-center !py-4">
          <span className={`text-xl font-bold ${theme.text}`}>
            + Check-in today!
          </span>
        </Card>
      </Link>
    </div>
  );
};

export default CheckInPage;