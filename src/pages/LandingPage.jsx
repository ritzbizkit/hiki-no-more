import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{ backgroundColor: '#FBFBFE' }}
    >
      {/* Logo Image */}
      <img
  src="/logo.svg"
  alt="Hiki-No-More Logo"
  className="w-32 h-auto mb-4" 
/>

      {/* App Name */}
      <h1 className="text-2xl my-8 font-bold text-gray-700">
  Hiki-No-More
</h1>

      {/* Buttons Container */}
      <div className="flex flex-col gap-4 w-full max-w-xs px-4">
        {/* Log In Button */}
        <Link
            to="/login"
            className="btn btn-lg rounded-full border-none text-black"
            style={{ backgroundColor: '#A8D1F5' }}
        >
          Log In
        </Link>

        {/* Sign up Button - I've made this a link to a future /signup page */}
        <Link
            to="/signup"
            className="btn btn-lg rounded-full border-none text-black"
            style={{ backgroundColor: '#A8D1F5' }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;