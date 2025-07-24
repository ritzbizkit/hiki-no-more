import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const ProfileSetup1Page = () => {
  return (
    <div 
      className="flex flex-col justify-center items-center min-h-screen p-6 gap-8" 
      style={{ backgroundColor: '#FBFBFE' }}
    >
      <div className="text-center w-full max-w-xs">
        <h1 className="text-2xl font-bold text-gray-800 mb-12">First lets set up your profile!</h1>
        
        <UserCircleIcon className="w-40 h-40 text-gray-300 mx-auto" />

        <Link 
          to="/profile-setup-2"
          className="btn btn-lg h-auto py-4 mt-12 rounded-2xl border-none text-black w-full" 
          style={{ backgroundColor: '#A8D1F5' }}
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default ProfileSetup1Page;