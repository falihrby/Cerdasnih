import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';  
import './Signup.css';

const InputField = ({ label, type, placeholder, value, onChange, togglePasswordVisibility, showPassword, error }) => (
  <div className="input-field">
    <label className="input-label">
      {label} <span className="required">*</span>
    </label>
    <div className="password-wrapper">
      <input
        className={`input-element ${error ? 'input-error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {togglePasswordVisibility && (
        <button
          type="button"
          className="toggle-password"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      )}
    </div>
    {error && <small className="error-text">{error}</small>}
  </div>
);

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState(''); 
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 64;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
      setPasswordError(`Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const newUser = { name, email, password };

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(newUser));
      setLoading(false);
      setShowPopup(true); 
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closePopup = () => {
    setShowPopup(false);  
    navigate('/login');   
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
      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-header">Daftar Gratis</h1>
          <p className="signup-subtext">
            Masukkan detail kamu di bawah ini untuk<br></br>
            membuat akun dan memulai.
          </p>

          <form onSubmit={handleSignup} className="signup-form">
            <InputField
              label="Nama lengkap"
              type="text"
              placeholder="Masukkan nama lengkap..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            <InputField
              label="Kata sandi"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan kata sandi..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />
            <InputField
              label="Konfirmasi kata sandi"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan kembali kata sandi..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
              error={passwordError}
            />
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Mendaftarkan...' : 'Daftar'}
            </button>
          </form>

          <p className="login-prompt">
            Sudah punya akun? <button onClick={() => navigate('/login')} className="login-link">Masuk</button>
          </p>

          {showPopup && <Popup message="Signup successful!" onClose={closePopup} />}
        </div>
      </div>
    </div>
  );
};

export default Signup;
