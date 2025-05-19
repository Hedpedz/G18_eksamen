import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.scss';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span
        aria-label='Logo'
        >Billettlyst</span>
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link to="/category/musikk">Musikk</Link>
        </li>
        <li>
          <Link to="/category/sport">Sport</Link>
        </li>
        <li>
          <Link to="/category/teater">Teater</Link>
        </li>
      </ul>
      <Link to="/dashboard" className="navbar-login">
        Logg inn
      </Link>
    </nav>
  );
};

export default NavBar;