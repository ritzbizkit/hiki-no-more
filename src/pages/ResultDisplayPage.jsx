import React from 'react';
import { useParams } from 'react-router-dom';
import ResultCard from '../components/ResultCard.jsx';
import { resultsData } from '../data.js'; // Import data

const ResultDisplayPage = () => {
  const { buddyName } = useParams();
  const buddyData = resultsData[buddyName];

  if (!buddyData) {
    return <div>Buddy not found!</div>;
  }

  return <ResultCard buddy={buddyData} />;
};

export default ResultDisplayPage;