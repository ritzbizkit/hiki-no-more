import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../components/ThemeProvider';
import { useBuddy } from '../context/BuddyContext';
import { useAuth } from '../context/AuthContext';

// Define the sub-component ONCE at the top
const ProfileMenuItem = ({ to, label, isSignOut = false, onClick }) => {
  const textColor = isSignOut ? 'text-red-500' : 'text-gray-700';
  const content = (
    <div className="flex justify-between items-center w-full p-4">
      <span className={`text-lg font-medium ${textColor}`}>{label}</span>
      {!isSignOut && <ChevronRightIcon className="w-6 h-6 text-gray-400" />}
    </div>
  );

  if (isSignOut) {
    return (
      <button onClick={onClick} className="w-full text-left hover:bg-gray-50">
        {content}
      </button>
    );
  }
  
  return (
    <Link to={to} className="w-full text-left hover:bg-gray-50 block border-b">
      {content}
    </Link>
  );
};


const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { buddyDetails } = useBuddy();
  const { logout } = useAuth();

  return (
    <div className={`p-4 min-h-screen ${theme.background}`}>
      <Link to="/quests" className={`flex items-center mb-4 font-semibold ${theme.text}`}>
        &lt; Back
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col items-center p-6 border-b">
          {buddyDetails ? (
            <img src={buddyDetails.image} alt={buddyDetails.name} className="w-24 h-24 rounded-full" />
          ) : (
            <UserCircleIcon className="w-24 h-24 text-gray-300" />
          )}
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Henry Sanke</h1>
        </div>

        {/* Menu List */}
        <div>
          {/* Change Buddy and Rewatch Tutorial have been removed */}
          <ProfileMenuItem to="/profile-setup-2" label="Edit profile" />
          <ProfileMenuItem to="/settings" label="Settings" />
          <ProfileMenuItem to="/quiz-intro" label="Retake Persona Test" />
          <ProfileMenuItem label="Sign out" isSignOut={true} onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;