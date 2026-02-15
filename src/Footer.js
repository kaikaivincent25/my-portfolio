import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import "./Footer.css";

//const API_BASE = "https://portfolio-backend-aapr.onrender.com/api";
const API_BASE = process.env.REACT_APP_API_BASE;

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/profiles/`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.results ? data.results[0] : data[0]);
      })
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        {/* Brand + Bio */}
        <div className="footer-left">
          <div className="footer-logo">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="footer-avatar"
              />
            ) : (
              <h2 className="footer-name">
                {profile?.full_name || "My Portfolio"}
              </h2>
            )}
          </div>
          <p className="footer-bio">
            {
              "Creative developer crafting digital experiences with precision and purpose."}
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="footer-social">
          <h3>Connect</h3>
          <div className="social-icons">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                <FaGlobe />
              </a>
            )}
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {profile?.full_name || "Vincent Kaikai"} — 
          Designed & Built using React + Django.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
