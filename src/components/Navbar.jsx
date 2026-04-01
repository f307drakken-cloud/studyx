import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ scrolled }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>AbdullahHayat<span>StudyHub</span></Link>
        </div>

        {/* Desktop nav links */}
        <ul className="nav-links">
          <li>
            <Link to="/" className={isHome ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/resources" className={!isHome ? 'active' : ''}>Resources</Link>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to={isHome ? "#register" : "/#register"} className="btn btn-primary btn-sm">
            Join Now
          </Link>
          {/* Hamburger Button */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" className={isHome ? 'active' : ''} onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/resources" className={!isHome ? 'active' : ''} onClick={closeMenu}>Resources</Link>
          </li>
          <li>
            <Link to={isHome ? "#register" : "/#register"} className="btn btn-primary btn-sm mobile-join" onClick={closeMenu}>
              Join Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
