import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions, categoryName, difficulty } = location.state || {};

  const scorePercentage = (score / totalQuestions) * 100;

  let representativeWord = '';
  let copywriting = '';
  let imagePath = '';

  if (scorePercentage <= 20) {
    representativeWord = 'Semangat!';
    copywriting = 'Percobaan membuat kamu lebih baik.';
    imagePath = '/Illustration/spirit.png';
  } else if (scorePercentage <= 40) {
    representativeWord = 'Awal Baik!';
    copywriting = 'Dengan latihan lebih banyak, skor akan semakin tinggi.';
    imagePath = '/Illustration/spirit.png';
  } else if (scorePercentage <= 60) {
    representativeWord = 'Hebat!';
    copywriting = 'Coba lagi untuk mencapai skor yang lebih tinggi.';
    imagePath = '/Illustration/spirit.png';
  } else if (scorePercentage <= 80) {
    representativeWord = 'Hampir Sempurna!';
    copywriting = 'Hanya beberapa langkah lagi untuk mencapai puncak.';
    imagePath = '/Illustration/winner.png';
  } else {
    representativeWord = 'Luar Biasa!';
    copywriting = 'Kamu benar-benar menguasai topik ini.';
    imagePath = '/Illustration/winner.png';
  }

  // Inline background style for the entire page
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
      <div className="results-container">
        <img src={imagePath} alt="Result Illustration" className="result-image" />
        
        <h2 className="representative-word">{representativeWord}</h2>
        <p className="copywriting">{copywriting}</p>

        <div className="results-info">
          <div className="results-info-left">
            <p>Kategori : <strong>{categoryName}</strong></p>
            <p>Tingkat kesulitan  :  <strong>{difficulty}</strong></p>
          </div>
          <div className="results-info-right">
            <p>Jawaban benar   : <strong>{score}</strong></p>
            <p>Jawaban salah   :  <strong>{totalQuestions - score}</strong></p>
            <p>Total jawaban   : <strong>{totalQuestions}</strong></p>
          </div>
        </div>

        {/* Button container for layout */}
        <div className="button-container">
          <button onClick={() => navigate('/')} className="home-page">
            Beranda
          </button>
          <button onClick={() => navigate('/categories')} className="try-again">
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
