import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resultsData } from '../data.js';

const resultMap = {
  0: 'nervy', // 1st row
  1: 'iso',   // 2nd row (purple)
  2: 'avoi',  // 3rd row (ice cube)
  3: 'obli'   // 4th row (fire, aka Enthu)
};

const BuddyScoreCard = ({ buddyKey, percentage }) => {
  const buddy = resultsData[buddyKey];
  return (
    <Link to={`/result/${buddyKey}`} className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-blue-100 active:scale-95 transition-transform">
      <img src={buddy.imageSrc} alt={buddy.name} className="w-24 h-auto" />
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="font-semibold text-gray-600">{percentage}%</span>
    </Link>
  );
};

const ResultsPage = ({ answers }) => {
  const [scores, setScores] = useState({ nervy: 0, obli: 0, iso: 0, avoi: 0 });

  useEffect(() => {
    const answerValues = Object.values(answers);
    const totalAnswers = answerValues.length;

    if (totalAnswers === 0) return;

    const counts = answerValues.reduce((acc, value) => {
      const buddyKey = resultMap[value];
      if (buddyKey) {
        acc[buddyKey] = (acc[buddyKey] || 0) + 1;
      }
      return acc;
    }, {});

    const percentages = {
      nervy: Math.round((counts.nervy || 0) / totalAnswers * 100),
      obli: Math.round((counts.obli || 0) / totalAnswers * 100),
      iso: Math.round((counts.iso || 0) / totalAnswers * 100),
      avoi: Math.round((counts.avoi || 0) / totalAnswers * 100),
    };

    setScores(percentages);
  }, [answers]);

  return (
    <div style={{ backgroundColor: '#FBFBFE' }} className="p-6 min-h-screen">
      <p className="text-left text-gray-500 mb-8">result</p>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Here are your results!</h1>
        <p className="text-gray-600 mt-2">Click on a buddy to find out more!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-12">
        <BuddyScoreCard buddyKey="nervy" percentage={scores.nervy} />
        <BuddyScoreCard buddyKey="iso" percentage={scores.iso} />
        <BuddyScoreCard buddyKey="avoi" percentage={scores.avoi} />
        <BuddyScoreCard buddyKey="obli" percentage={scores.obli} />
      </div>
    </div>
  );
};

export default ResultsPage;