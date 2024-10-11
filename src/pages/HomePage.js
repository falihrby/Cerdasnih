import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './HomePage.css'; 

const wordList = [
  'Pengetahuan Umum',  
  'Buku',              
  'Film',              
  'Musik',             
  'Musikal & Teater',  
  'Televisi',          
  'Permainan Video',   
  'Papan Permainan',   
  'Ilmu Pengetahuan Alam',
  'Komputer',          
  'Matematika',        
  'Mitologi',          
  'Olahraga',          
  'Geografi',          
  'Sejarah',           
  'Politik',           
  'Selebriti',         
  'Hewan',             
  'Kendaraan',         
  'Komik',             
  'Gadgets',          
  'Anime & Manga',    
  'Kartun & Animasi'   
]; 

const HomePage = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  const navigate = useNavigate(); 

  useEffect(() => {
    const typingSpeed = 100; 
    const delayBetweenWords = 1500; 

    if (isTyping) {
      if (charIndex < wordList[wordIndex].length) {
        setTimeout(() => {
          setCurrentWord(currentWord + wordList[wordIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setCharIndex(0);
          setWordIndex((prevIndex) => (prevIndex + 1) % wordList.length);
          setCurrentWord(''); 
        }, delayBetweenWords);
      }
    }
  }, [isTyping, charIndex, wordIndex, currentWord]);

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

  // Function to handle "Mulai" button click
  const handleStartClick = () => {
    navigate('/login'); // Navigate to the login page when "Mulai" is clicked
  };

  return (
    <div style={backgroundStyle}>
      <div className="container">     
        <img src="/Illustration/brain.png" alt="Brain illustration" className="quiz-image" />

        {/* Updated dynamic typing text */}
        <h1 className="quiz-text">
          Seberapa cerdas pengetahuan<br />kamu tentang <span className="dynamic-word">{currentWord}</span>?
        </h1>

        {/* "Mulai" button with navigation */}
        <button className="start-button" onClick={handleStartClick}>Mulai</button>

        <p className="start-instruction">
          Klik <span className='mulai'>'Mulai'</span> untuk memulai.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
