// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const InputField = ({ label, type, placeholder, value, onChange, togglePasswordVisibility, showPassword }) => (
  <div className="input-field">
    <label className="input-label">{label}</label>
    <div className="password-wrapper">
      <input
        className="input-element"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {/* Toggle button for password visibility */}
      {togglePasswordVisibility && (
        <button
          type="button"
          className="toggle-password"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? '🙈' : '👁️'} {/* Display icon based on state */}
        </button>
      )}
    </div>
  </div>
);

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to handle password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem('user'));

    setTimeout(() => {
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        onLogin(email);
        navigate('/categories');
      } else {
        alert('Invalid email or password');
        setLoading(false);
      }
    }, 1000); // Simulate a network request delay
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to signup page
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between true and false
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
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-header">Selamat datang kembali</h1>
          <p className="login-subtext">
            Senang bertemu kamu lagi 👋🏻
            <br />
            Masuk ke akun kamu di bawah ini.
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <InputField
              label="Email"
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Kata sandi"
              type={showPassword ? 'text' : 'password'} // Toggle input type based on state
              placeholder="Masukkan kata sandi..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Memuat...' : 'Masuk'}
            </button>
          </form>

          <p className="signup-prompt">
            Belum punya akun? <button onClick={handleSignUp} className="signup-link">Daftar gratis</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
