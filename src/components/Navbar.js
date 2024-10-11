import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [shadow, setShadow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  // Hook to get current path

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click on "Masuk" button
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Check if the current path is the homepage
  const isHomePage = location.pathname === '/';

  return (
    <nav className={`navbar ${shadow ? 'navbar-shadow' : ''}`}>
      <div className="navbar-container">
        {/* Navigate to home page when clicking the logo */}
        <NavLink className="navbar-brand" to="/">
          <img src="/logo+teks.png" alt="Logo" className="navbar-logo" />
        </NavLink>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            {isHomePage && (  // Only render the "Masuk" button on the homepage
              <li className="nav-item">
                <button onClick={handleLoginClick} className="nav-button">Masuk</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
