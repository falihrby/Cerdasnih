import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';
import Modal from '../components/Modal';

const Quiz = ({ setQuizComplete, setScore }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes in seconds
  const [showModal, setShowModal] = useState(false); // State for modal

  const { categoryId, difficulty, questions, categoryName } = location.state || {};

  // Load quiz data from localStorage when component mounts
  useEffect(() => {
    const savedQuizData = localStorage.getItem('quizData');
    if (savedQuizData) {
      setShowModal(true); // Show the modal if there is saved quiz data
    }
  }, []);

  const handleModalConfirm = () => {
    const savedQuizData = localStorage.getItem('quizData');
    const { savedIndex, savedScore, savedTime } = JSON.parse(savedQuizData);
    setCurrentQuestionIndex(savedIndex);
    setLocalScore(savedScore);
    setTimeLeft(savedTime);
    setShowModal(false); // Close the modal
  };

  const handleModalCancel = () => {
    localStorage.removeItem('quizData');
    setShowModal(false); // Close the modal and start new quiz
  };

  useEffect(() => {
    if (!categoryId || !difficulty || !questions) {
      navigate('/categories');
    }
  }, [categoryId, difficulty, questions, navigate]);

  // Stable submitQuiz function wrapped in useCallback
  const submitQuiz = useCallback(() => {
    setScore(localScore);
    setQuizComplete(true);
    localStorage.removeItem('quizData'); // Clear quiz data after completion
    navigate('/result', { state: { score: localScore, totalQuestions: questions.length, categoryName, difficulty } });
  }, [localScore, setScore, setQuizComplete, navigate, questions.length, categoryName, difficulty]);

  useEffect(() => {
    // Timer that decreases every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [submitQuiz]); 

  // Save quiz data to localStorage whenever there's an update
  useEffect(() => {
    localStorage.setItem(
      'quizData',
      JSON.stringify({
        savedIndex: currentQuestionIndex,
        savedScore: localScore,
        savedTime: timeLeft
      })
    );
  }, [currentQuestionIndex, localScore, timeLeft]);

  if (!categoryId || !difficulty || !questions) {
    return <div className='loading-message'>Memuat kuis...</div>; 
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion || !currentQuestion.incorrect_answers || !currentQuestion.correct_answer) {
    return <div className='loading-message'>Error: Data pertanyaan tidak valid.<br>
    </br>Silakan refresh halaman untuk memulai ulang kuis.</div>;
  }

  const shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz();
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setLocalScore(localScore + 1);
    handleNextQuestion();
  };

  // Function to format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
      <Modal
        isVisible={showModal}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
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

          {/* Progress bar */}
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="explanation-card">
          <p>Kategori: <strong>{categoryName}</strong></p>
          <p>Tingkat Kesulitan: <strong>{difficulty}</strong></p>
          
          {/* Horizontal line */}
          <hr className="separator-line" />
          
          {/* Countdown timer display */}
          <div className="timer-container">
            <p className="timer-label">Sisa waktu</p>
            <p className="timer-countdown"><strong>{formatTime(timeLeft)}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
