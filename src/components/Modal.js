// src/components/Modal.js
import React from 'react';
import './Modal.css'; // Tambahkan CSS sesuai kebutuhan

const Modal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>Lanjutkan Kuis Sebelumnya?</h3>
        <p>Ada kuis yang belum selesai. Apakah Anda ingin melanjutkannya?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-btn">Ya</button>
          <button onClick={onCancel} className="cancel-btn">Tidak</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
