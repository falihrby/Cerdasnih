// src/components/Result.js
import React from 'react';

const Result = ({ score, totalQuestions, onRetake }) => {
  const percentage = (score / totalQuestions) * 100;

  const getFeedback = () => {
    if (percentage <= 20) return 'Semangat! Percobaan membuat kamu lebih baik.';
    if (percentage <= 40) return 'Awal Baik! Dengan latihan lebih banyak, skor akan semakin tinggi.';
    if (percentage <= 60) return 'Hebat! Coba lagi untuk mencapai skor yang lebih tinggi.';
    if (percentage <= 80) return 'Hampir Sempurna! Hanya beberapa langkah lagi untuk mencapai puncak.';
    return 'Luar Biasa! Kamu benar-benar menguasai topik ini.';
  };

  return (
    <div>
      <h2>Your Score: {score}/{totalQuestions}</h2>
      <p>{getFeedback()}</p>
      <button onClick={onRetake}>Retake Quiz</button>
    </div>
  );
};

export default Result;
