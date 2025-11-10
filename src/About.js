import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Header from "./Header";
import Footer from "./Footer";

const API_BASE = "http://127.0.0.1:8000/api"; // adjust if needed

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/profiles/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched profile data:", data);
        setProfile(data.results ? data.results[0] : data[0]);
      })
      .catch((err) => console.error("Fetch error (profile):", err));
  }, []);

  if (!profile) {
    return <div className="about-container"><p>Loading profile...</p></div>;
  }

  return (
    <>
      <Header />
      <div className="about-container">
        <section className="about-section">
          <div className="about-left">
            <div className="avatar-frame">
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="about-avatar"
              />
            </div>
          </div>

          <div className="about-right">
            <h1>{profile.full_name}</h1>
            <h3 className="about-title">{profile.title}</h3>
            <p className="about-bio">{profile.bio}</p>

            <div className="extra-info">
              <h3>More About Me</h3>
              <p>
                I’m passionate about building user-centered digital solutions that
                combine design, performance, and accessibility. My focus is on
                creating impactful web experiences using modern technologies.
              </p>
              <p>
                Outside of coding, I explore new trends in AI, UX, and open-source
                collaboration — and occasionally unwind with some gaming or photography.
              </p>
            </div>

            <div className="about-buttons">
              <Link to="/contact" className="hire-btn">Hire Me</Link>
              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-btn"
                >
                  Download CV
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
