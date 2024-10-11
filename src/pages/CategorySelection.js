import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';
import './CategorySelection.css';

const CategorySelection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 

  const navigate = useNavigate();

  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 2000; // 2 seconds

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(response => {
        setCategories(response.data.trivia_categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      });
  }, []);

  const fetchQuestionsWithRetry = async (url, retryCount = 0) => {
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < MAX_RETRY_ATTEMPTS) {
        console.warn(`Rate limit hit. Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchQuestionsWithRetry(url, retryCount + 1);
      } else {
        throw error;
      }
    }
  };

  const handleStartQuiz = () => {
    if (selectedCategory) {
      const apiURL = `https://opentdb.com/api.php?amount=30&category=${selectedCategory}&difficulty=${difficulty}`; 
      fetchQuestionsWithRetry(apiURL)
        .then(questions => {
          console.log('Fetched Questions:', questions);  // Add this log
          const selectedCategoryName = categories.find(cat => cat.id === parseInt(selectedCategory)).name;
          console.log('Navigating to quiz with state:', {
            categoryId: selectedCategory,
            difficulty,
            questions,
            categoryName: selectedCategoryName,
          });
          navigate('/quiz', {
            state: {
              categoryId: selectedCategory,
              difficulty,
              questions,
              categoryName: selectedCategoryName,
            }
          });
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
          setError('Failed to load quiz. Please try again.');
        });
    } else {
      setShowPopup(true); 
    }
  };

  const closePopup = () => setShowPopup(false);

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
      <div className="category-selection-container">
        {loading ? (
          <div className="loading-message">Loading categories...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="category-selection-card">
            <h1 className="category-selection-header">Choose Your Category</h1>
            <p className="login-subtext">Test your knowledge.</p>

            <div className="category-selection-form">
              <label className="category-selection-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-selection-select category-selection-dropdown"
              >
                <option value="" disabled hidden>Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label className="category-selection-label">Difficulty</label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="category-selection-select"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <button onClick={handleStartQuiz} className="category-selection-button">
                Start Quiz
              </button>

              <p className="category-prompt">Time starts after pressing the button, and questions move forward after selecting an answer.</p>
            </div>
          </div>
        )}
      </div>
      {showPopup && <Popup message="Please select a category!" onClose={closePopup} />}
    </div>
  );
};

export default CategorySelection;
