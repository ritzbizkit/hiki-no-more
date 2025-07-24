import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizData } from '../data.js';

const QuizQuestionPage = ({ answers, setAnswers }) => {
  const { questionId } = useParams();
  const questionNumber = parseInt(questionId, 10);
  const currentQuestion = quizData[questionNumber];

  // This function now ONLY saves the user's choice to the state.
  // It does NOT navigate.
  const handleAnswerSelect = (answerIndex) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answerIndex
    }));
  };
  
  // Logic to determine where the "Next" and "Previous" buttons should go.
  const isLastQuestion = questionNumber === Object.keys(quizData).length;
  const nextPath = isLastQuestion ? '/results' : `/quiz/${questionNumber + 1}`;
  const prevPath = `/quiz/${questionNumber - 1}`;

  if (!currentQuestion) {
    return <div>Question not found!</div>;
  }

  return (
    <div
      className="flex flex-col justify-between items-center min-h-screen p-6"
      style={{ backgroundColor: '#FBFBFE' }}
    >
      <div className="w-full">
        <p className="text-left text-gray-500">quiz {questionNumber}</p>
      </div>

      <div className="flex flex-col items-center w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {currentQuestion.question}
        </h2>
        
        <div className="flex flex-col gap-4 w-full">
          {currentQuestion.answers.map((answer, index) => {
            const isSelected = answers[questionId] === index;
            return (
              <button 
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`btn btn-lg h-auto justify-start text-left normal-case rounded-2xl border-2 font-semibold py-3
                  ${isSelected ? 'border-blue-500 bg-blue-200 text-gray-800' : 'border-transparent bg-blue-100 text-gray-700'}`}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full flex justify-between mt-8">
        {/* Previous Button */}
        {questionNumber > 1 ? (
          <Link
            to={prevPath}
            className="btn rounded-full border-none text-black px-8"
            style={{ backgroundColor: '#A8D1F5' }}
          >
            Previous
          </Link>
        ) : (
          <div></div> // Empty div to keep "Next" button on the right
        )}
        
        {/* The "Next" button is now the ONLY thing that navigates forward */}
        <Link
          to={nextPath}
          className="btn rounded-full border-none text-black px-8"
          style={{ backgroundColor: '#A8D1F5' }}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default QuizQuestionPage;