// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  const [categoryId, setCategoryId] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCategoryId(null);
    setQuizComplete(false);
  };

  const startQuiz = (categoryId, difficulty) => {
    setCategoryId(categoryId);
    setDifficulty(difficulty);
  };

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
          {isLoggedIn && (
            <Route
              path="/categories"
              element={<CategorySelection onStartQuiz={startQuiz} />}
            />
          )}
          {isLoggedIn && categoryId && !quizComplete && (
            <Route
              path="/quiz"
              element={
                <Quiz
                  categoryId={categoryId}
                  difficulty={difficulty}
                  onComplete={handleQuizComplete}
                />
              }
            />
          )}
          {isLoggedIn && quizComplete && (
            <Route
              path="/result"
              element={
                <Result
                  score={score}
                  totalQuestions={10}
                  onRetake={() => setQuizComplete(false)}
                />
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
