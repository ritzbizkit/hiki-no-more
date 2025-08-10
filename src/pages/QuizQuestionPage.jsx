import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { quizData } from '../data.js';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const QuizQuestionPage = ({ answers, setAnswers }) => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const question = quizData.find(q => q.id === Number(questionId));

  if (!question) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Question Not Found</h1>
        <p className="text-gray-600">Could not find a quiz question with the ID: {questionId}</p>
      </div>
    );
  }

  const handleAnswer = (persona) => {
    const newAnswers = { ...answers, [question.id]: persona };
    setAnswers(newAnswers);
    
    // After answering, automatically navigate to the next screen
    const nextQuestionId = Number(questionId) + 1;
    if (nextQuestionId > quizData.length) {
      navigate('/results'); // Go to results if it's the last question
    } else {
      navigate(`/quiz/${nextQuestionId}`);
    }
  };

  // --- NEW NAVIGATION LOGIC ---
  const currentQuestionIndex = quizData.findIndex(q => q.id === Number(questionId));
  const hasPrevious = currentQuestionIndex > 0;
  const hasNext = currentQuestionIndex < quizData.length - 1;
  const previousQuestionId = hasPrevious ? quizData[currentQuestionIndex - 1].id : null;
  const nextQuestionId = hasNext ? quizData[currentQuestionIndex + 1].id : null;


  return (
    <div className="p-4 min-h-screen flex flex-col justify-between" style={{ backgroundColor: '#F8F8F8' }}>
      <div>
        <div className="text-center my-8">
          <h1 className="text-2xl font-bold text-gray-800 px-4">{question.question}</h1>
        </div>
        
        <div className="space-y-3 px-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.persona)}
              className="w-full text-left p-4 bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-400 focus:border-blue-400 transition-all"
            >
              <span className="text-base text-gray-700">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* --- NEW BUTTONS SECTION --- */}
      <div className="py-4 px-4 flex items-center justify-between">
        {hasPrevious ? (
          <Link 
            to={`/quiz/${previousQuestionId}`}
            className="px-8 py-3 bg-blue-400 text-white font-bold rounded-full shadow-lg"
          >
            Previous
          </Link>
        ) : (
          // This is an invisible spacer to keep "Next" on the right
          <div className="w-28"></div> 
        )}

        {hasNext ? (
          <Link 
            to={`/quiz/${nextQuestionId}`}
            className="px-8 py-3 bg-blue-400 text-white font-bold rounded-full shadow-lg"
          >
            Next
          </Link>
        ) : (
          // On the last question, you might want a "Finish" button instead
           <button 
            onClick={() => navigate('/results')}
            className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionPage;