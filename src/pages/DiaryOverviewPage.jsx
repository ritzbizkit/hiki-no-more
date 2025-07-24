import React from 'react';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

// Mock data to represent diary entries with different moods
const diaryEntries = {
  '2025-06-01': { mood: 'red' }, '2025-06-02': { mood: 'red' }, '2025-06-03': { mood: 'green' },
  '2025-06-04': { mood: 'red' }, '2025-06-05': { mood: 'red' }, '2025-06-06': { mood: 'yellow' },
  '2025-06-07': { mood: 'yellow' }, '2025-06-09': { mood: 'yellow' }, '2025-06-10': { mood: 'yellow' },
  '2025-06-11': { mood: 'yellow' }, '2025-06-12': { mood: 'green' }, '2025-06-13': { mood: 'green' },
  '2025-06-14': { mood: 'green' }, '2025-06-15': { mood: 'green' }, '2025-06-16': { mood: 'green' },
  '2025-06-17': { mood: 'green' },
};

// Custom component to render each day with a dot
function CustomDayContent(props) {
  const dateStr = format(props.date, 'yyyy-MM-dd');
  const entry = diaryEntries[dateStr];
  const moodColors = { red: '#F87171', green: '#4ADE80', yellow: '#FBBF24' };

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <span>{props.date.getDate()}</span>
      {entry && (
        <div 
          className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: moodColors[entry.mood] }}
        ></div>
      )}
    </div>
  );
}

const DiaryOverviewPage = () => {
  const calendarStyles = `
    .rdp { --rdp-cell-size: 40px; }
    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: transparent !important; border: 2px solid #60A5FA; color: #1f2937; font-weight: bold; }
    .rdp-caption_label { font-weight: 700; font-size: 1.25rem; color: #374151; }
    .rdp-head_cell abbr { font-weight: 500; font-size: 0.875rem; color: #9ca3af !important; text-decoration: none; }
    .rdp-day { color: #374151; }
    .rdp-nav_button { width: 2rem; height: 2rem; }
    .rdp-day_outside { opacity: 0.3; }
  `;

  return (
    <div style={{ backgroundColor: '#FBFBFE' }} className="p-4 min-h-screen">
      <style>{calendarStyles}</style>

      <div className="bg-blue-100 p-4 rounded-xl flex items-center relative mb-6 shadow-sm">
        <Link to="/chat" className="absolute left-4">
          <ChevronLeftIcon className="w-8 h-8 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 text-center w-full">Calendar</h1>
      </div>

      <DayPicker
        mode="single"
        defaultMonth={new Date('2025-06-01')}
        showOutsideDays
        className="mx-auto" 
        components={{ DayContent: CustomDayContent }}
      />

      <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800">30 Day</h2>
          <p className="text-gray-500">check-in streak</p>
        </div>
        <Link 
          to="/check-in" 
          className="btn btn-lg w-full rounded-2xl border-none text-black mt-6" 
          style={{ backgroundColor: '#A8D1F5' }}
        >
          + Check-in today!
        </Link>
      </div>
    </div>
  );
};

export default DiaryOverviewPage;