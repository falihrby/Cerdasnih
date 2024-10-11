import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import Popup from '../components/Popup'; 
import './CategorySelection.css';

const categoryTranslations = {
  9: 'Pengetahuan Umum',
  10: 'Buku',
  11: 'Film',
  12: 'Musik',
  13: 'Musikal & Teater',
  14: 'Televisi',
  15: 'Permainan Video',
  16: 'Papan Permainan',
  17: 'Ilmu Pengetahuan Alam',
  18: 'Komputer',
  19: 'Matematika',
  20: 'Mitologi',
  21: 'Olahraga',
  22: 'Geografi',
  23: 'Sejarah',
  24: 'Politik',
  25: 'Selebriti',
  26: 'Hewan',
  27: 'Kendaraan',
  28: 'Komik',
  29: 'Gadgets',
  30: 'Anime & Manga',
  31: 'Kartun & Animasi',
};

const CategorySelection = ({ onStartQuiz }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const [showTooltip, setShowTooltip] = useState(false); 

  const navigate = useNavigate();  

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(response => {
        const categoriesWithTranslations = response.data.trivia_categories.map(category => ({
          id: category.id,
          name: categoryTranslations[category.id] || category.name,
        }));
        setCategories(categoriesWithTranslations);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Gagal memuat kategori. Silakan coba lagi nanti.');
        setLoading(false);
      });
  }, []);

  const handleStartQuiz = () => {
    if (selectedCategory) {
      navigate('/quiz', {
        state: {
          categoryId: selectedCategory,
          difficulty: difficulty,
        },
      });
    } else {
      setShowPopup(true); 
    }
  };

  const closePopup = () => {
    setShowPopup(false);  
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
      <div className="category-selection-container">
        {loading ? (
          <div className="loading-message">Memuat kategori...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="category-selection-card">
            <h1 className="category-selection-header">Tentukan pilihan kamu</h1>
            <p className="login-subtext">Siap untuk menguji pengetahuanmu</p>

            <div className="category-selection-form">
              <label className="category-selection-label">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-selection-select category-selection-dropdown"
              >
                <option value="" disabled hidden>Pilih Kategori...</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label className="category-selection-label">
                Tingkat Kesulitan
                <img 
                  src="/material-symbols--info-outline.svg" 
                  alt="Info Icon" 
                  className="info-icon" 
                  onMouseEnter={() => setShowTooltip(true)} 
                  onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                  <div className="tooltip">
                    <p>Mudah  : 50 soal, waktu 7 menit 30 detik.</p>
                    <p>Sedang : 35 soal, waktu 9 menit.</p>
                    <p>Sulit  : 25 soal, waktu 10 menit.</p>
                  </div>            
                )}
              </label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="category-selection-select"
              >
                <option value="easy">Mudah</option>
                <option value="medium">Sedang</option>
                <option value="hard">Sulit</option>
              </select>

              <button onClick={handleStartQuiz} className="category-selection-button">
                Mulai Kuis
              </button>

              <p className="category-prompt">Waktu dimulai saat tombol ditekan dan soal<br>
              </br>langsung berpindah setelah memilih jawaban</p>
            </div>
          </div>
        )}
      </div>
      {showPopup && <Popup message="Silakan pilih kategori!" onClose={closePopup} />}
    </div>
  );
};

export default CategorySelection;
