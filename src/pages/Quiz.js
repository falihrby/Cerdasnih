import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Call hooks unconditionally
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Destructure state passed via the navigate
  const { categoryId, difficulty, questions, categoryName } = location.state || {};

  // If required state is missing, redirect using `useEffect`
  useEffect(() => {
    if (!categoryId || !difficulty || !questions) {
      navigate('/categories');
    }
  }, [categoryId, difficulty, questions, navigate]);

  // If state is still loading (before redirect happens), return a loading screen
  if (!categoryId || !difficulty || !questions) {
    return <div>Loading quiz...</div>; 
  }

  // Access the current question safely
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the current question is valid before proceeding
  if (!currentQuestion || !currentQuestion.incorrect_answers || !currentQuestion.correct_answer) {
    return <div>Error: Invalid question data.</div>; // Fallback UI in case the data is invalid
  }

  const shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/result', { state: { score, totalQuestions: questions.length } });
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    handleNextQuestion();
  };

  const backgroundStyle = {
    backgroundColor: '#FFFBF9',
    backgroundImage: 'url("/background.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="quiz-layout">
        <div className="quiz-container">
          <h3>Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</h3>
          <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></p>
          <div className="answers">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer === currentQuestion.correct_answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
                className="answer-btn"
              />
            ))}
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="explanation-card">
          <p>Kategori : <strong>{categoryName}</strong></p>
          <p>Tingkat Kesulitan : <strong>{difficulty}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
