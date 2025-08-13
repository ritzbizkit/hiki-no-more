import React from 'react';
import { Link } from 'react-router-dom';

const QuizIntroPage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-dvh p-6"
      style={{ backgroundColor: '#FBFBFE' }}
    >
      <div className="text-center">
        {/* Icon Group */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
          <img
            src="/Iso.svg"
            alt="Iso Avatar"
            className="w-20 h-auto sm:w-24"
          />
          <img
            src="/nervy1.svg"
            alt="Nervy Avatar"
            className="w-20 h-auto sm:w-24"
          />
          <img
            src="/Enthu.svg"
            alt="Enthu Avatar"
            className="w-20 h-auto sm:w-24"
          />
        </div>

        {/* Heading Text */}
        <h2 className="text-3xl font-bold text-gray-800 max-w-sm mx-auto">
          Take our persona quiz to find out which buddy suits you the best!
        </h2>

        {/* Take the quiz! Button */}
        <Link
          to="/quiz/1"
          className="btn btn-lg rounded-full border-none text-black w-full max-w-xs mt-10"
          style={{ backgroundColor: '#A8D1F5' }}
        >
          Take the quiz!
        </Link>
      </div>
    </div>
  );
};

export default QuizIntroPage;
