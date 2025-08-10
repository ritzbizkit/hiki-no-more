import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon, LinkIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { resultsData } from '../data.js';

const BuddyProfilePage = () => {
  const { buddyName } = useParams();
  const profile = resultsData[buddyName] || { name: "Not Found" };
  // Correct back link for the buddy profile page
  const backLink = `/chat/${buddyName}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBFBFE' }}>
      <div className="bg-blue-100 p-6 pt-8 rounded-b-3xl shadow-sm text-center relative">
        <Link to={backLink} className="absolute left-4 top-6">
          <ChevronLeftIcon className="w-8 h-8 text-gray-800" />
        </Link>
        <div className="flex flex-col items-center gap-2 mt-8">
          <img src={profile.imageSrc} alt={profile.name} className="w-24 h-24" />
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{profile.name}</h2>
          <p className="text-gray-600">"{profile.quote}"</p>
        </div>
      </div>
      <div className="px-4 mt-[-1.5rem] relative z-10">
        <Link to={`/quests/${buddyName}`} className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-md hover:bg-gray-50">
          <LinkIcon className="w-6 h-6 text-blue-500" />
          <span className="text-blue-500 font-semibold">Click to see their adventure progress</span>
        </Link>
      </div>
      <div className="p-4 mt-4">
        <div className="bg-white p-4 rounded-xl shadow-sm text-gray-700 space-y-3">
          <p className="font-bold text-lg">Info:</p>
          <p>Age: {profile.age || 'N/A'}</p>
          <p>Interests: {profile.interests || 'Not specified'}</p>
          <p>Looking to improve: {profile.lookingToImprove || 'Not specified'}</p>
        </div>
      </div>
      <div className="tabs tabs-bordered px-6 mt-2">
        <a className="tab tab-bordered tab-active">Media</a> 
        <a className="tab tab-bordered">Files</a> 
        <a className="tab tab-bordered">Links</a>
        <a className="tab tab-bordered">GIFs</a>
      </div>
      <div className="grid grid-cols-3 gap-1 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-200 h-24 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default BuddyProfilePage;