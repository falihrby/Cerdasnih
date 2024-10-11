import React, { useState, useEffect } from 'react';
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
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    if (savedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setQuizComplete(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
          
          <Route 
            path="/categories" 
            element={isLoggedIn ? <CategorySelection /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/quiz" 
            element={isLoggedIn ? <Quiz setQuizComplete={setQuizComplete} setScore={setScore} /> : <Navigate to="/categories" />} 
          />
          <Route 
            path="/result" 
            element={isLoggedIn && quizComplete ? <Result score={score} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
