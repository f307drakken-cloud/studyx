import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ scrolled }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">AbdullahHayat<span>StudyHub</span></Link>
        </div>
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
