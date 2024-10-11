import React, { useState } from 'react';
import './Quiz.css'; // Assuming you have a CSS file for styling

const Quiz = ({ categoryId, difficulty, onComplete }) => {
  const [showPopup, setShowPopup] = useState(false); // State to control the popup

  const handleStartQuiz = () => {
    if (categoryId) {
      // Logic to start the quiz
      console.log(`Starting quiz with category: ${categoryId} and difficulty: ${difficulty}`);
    } else {
      setShowPopup(true); // Show popup if category is not selected
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <p>Category: {categoryId ? categoryId : 'Not selected'}</p>
      <p>Difficulty: {difficulty}</p>
      
      {/* Start Quiz Button */}
      <button className="start-quiz-button" onClick={handleStartQuiz}>
        Start Quiz
      </button>

      {/* Modal Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Warning</h2>
            <p>Please select a category to start the quiz!</p>
            <button onClick={closePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
