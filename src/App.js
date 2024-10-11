// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import CategorySelection from './pages/CategorySelection';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setCategoryId] = useState(null);
  const [setDifficulty] = useState('easy');
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  // Handle user login
  const handleLogin = (username) => {
    setIsLoggedIn(true);
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCategoryId(null);
    setQuizComplete(false);
  };

  // Start the quiz
  const startQuiz = (categoryId, difficulty) => {
    setCategoryId(categoryId);
    setDifficulty(difficulty);
    setQuizComplete(false); // Reset quiz completion when starting a new quiz
  };

  // Handle quiz completion
  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setQuizComplete(true);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
          
          {/* Route to category selection */}
          <Route
            path="/categories"
            element={
              isLoggedIn ? (
                <CategorySelection onStartQuiz={startQuiz} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Route to quiz page */}
          <Route
            path="/quiz"
            element={
              isLoggedIn ? (
                <Quiz />
              ) : (
                <Navigate to="/categories" />
              )
            }
          />
          
          {/* Route to result page */}
          <Route
            path="/result"
            element={
              isLoggedIn && quizComplete ? (
                <Result
                  score={score}
                  totalQuestions={10}  // Assuming a fixed number of questions for now
                  onRetake={() => setQuizComplete(false)}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
