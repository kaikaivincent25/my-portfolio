// src/Header.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ profile }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="nav-container">
        {/* Logo or Avatar */}
        <Link to="/" className="logo">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.full_name}
              className="logo-img"
            />
          ) : (
            <span className="logo-text">{profile?.full_name || "Portfolio"}</span>
          )}
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li className={location.pathname === "/home" ? "active" : ""}>
            <Link to="/home">Home</Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">About</Link>
          </li>
          <li className={location.pathname.startsWith("/projects") ? "active" : ""}>
            <Link to="/projects">Projects</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Hire Me Button */}
        <Link to="/contact" className="hire-btn">
          Hire Me
        </Link>
      </div>
    </header>
  );
};

export default Header;
