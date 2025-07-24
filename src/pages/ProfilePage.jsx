import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ProfileMenuItem = ({ to, label }) => (
  <Link to={to} className="flex justify-between items-center w-full p-4 border-b hover:bg-gray-50">
    <span className="text-lg text-gray-700">{label}</span>
    <ChevronRightIcon className="w-6 h-6 text-gray-400" />
  </Link>
);

const ProfilePage = () => {
  return (
    <div style={{ backgroundColor: '#FBFBFE' }} className="min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col items-center p-6 bg-white shadow-sm">
        <Link to="/chat" className="self-start text-gray-600 mb-4">
          &lt; Back
        </Link>
        <UserCircleIcon className="w-24 h-24 text-gray-300" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Henry Sanke</h1>
      </div>

      {/* Menu List */}
      <div className="mt-8">
        {/* This is the updated link */}
        <ProfileMenuItem to="/results" label="Change Buddy" />
        <ProfileMenuItem to="/profile-setup-2" label="Edit profile" />
        <ProfileMenuItem to="/settings" label="Settings" />
        <ProfileMenuItem to="/quiz-intro" label="Retake Persona Test" />
        <div className="flex justify-between items-center w-full p-4 border-b">
           <button className="text-lg text-red-500">Sign out</button>
           <ChevronRightIcon className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;