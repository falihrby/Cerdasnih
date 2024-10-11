// src/components/Popup.js
import React from 'react';
import './Popup.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{message}</h2>
        <button className="close-popup" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
