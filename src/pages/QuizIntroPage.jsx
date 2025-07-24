import React from 'react';
import { Link } from 'react-router-dom';

const QuizIntroPage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen py-12"
      style={{ backgroundColor: '#FBFBFE' }}
    >
      {/* Icon Group */}
      <div className="flex items-center justify-center gap-8 px-4">
        {/* Placeholder for the first avatar */}
        <img
          src="https://via.placeholder.com/96/E0E0E0/808080?text=Avatar"
          alt="Avatar Placeholder"
          className="w-24 h-24 object-cover rounded-full"
        />
        {/* Second Avatar */}
        <img
          src="/nervy1.svg"
          alt="Nervy Avatar"
          className="w-24 h-auto"
        />
        {/* Third Avatar - Now set to Enthu.svg */}
        <img
          src="/Enthu.svg"
          alt="Enthu Avatar"
          className="w-24 h-auto"
        />
      </div>

      {/* Heading Text */}
      <h2 className="text-2xl font-bold text-gray-700 text-center my-8 max-w-xs">
        Take our persona quiz to find out which buddy suits you the best!
      </h2>

      {/* Take the quiz! Button */}
      <Link
        to="/quiz/1"
        className="btn btn-lg rounded-full border-none text-black w-full max-w-xs"
        style={{ backgroundColor: '#A8D1F5' }}
      >
        Take the quiz!
      </Link>
    </div>
  );
};

export default QuizIntroPage;