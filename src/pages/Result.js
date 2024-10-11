import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state;
  const navigate = useNavigate();

  return (
    <div className="result-container">
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / {totalQuestions}</p>
      <button onClick={() => navigate('/')} className="retry-btn">Try Again</button>
    </div>
  );
};

export default Result;
