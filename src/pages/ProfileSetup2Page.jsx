import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

const ProfileSetup2Page = () => {
  return (
    <div 
      className="flex flex-col min-h-screen p-6" 
      style={{ backgroundColor: '#FBFBFE' }}
    >
      <Link to="/profile" className="flex items-center text-gray-600 mb-8">
        <ChevronLeftIcon className="w-6 h-6" /> Back
      </Link>

      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
          <PlusIcon className="w-10 h-10 text-gray-400" />
        </div>
        <p className="font-bold text-lg text-gray-800">Henry Sanke</p>
        <p className="text-gray-500 text-center">"Come up with a quote that describes yourself!"</p>
      </div>

      <div className="flex-grow mt-8 space-y-4">
        <div className="flex justify-between items-center"><span className="text-gray-700">Age:</span><PlusIcon className="w-6 h-6 text-gray-400" /></div>
        <div className="flex justify-between items-center"><span className="text-gray-700">Interests:</span><PlusIcon className="w-6 h-6 text-gray-400" /></div>
        <div className="flex justify-between items-center"><span className="text-gray-700">Looking to improve:</span><PlusIcon className="w-6 h-6 text-gray-400" /></div>
      </div>

      {/* This link now points back to the main profile page */}
      <Link 
        to="/profile"
        className="btn btn-lg h-auto py-4 mt-8 rounded-2xl border-none text-black w-full" 
        style={{ backgroundColor: '#A8D1F5' }}
      >
        Done
      </Link>
    </div>
  );
};

export default ProfileSetup2Page;