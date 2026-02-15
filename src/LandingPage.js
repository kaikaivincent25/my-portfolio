import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

//const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = "https://portfolio-backend-aapr.onrender.com/api";

const LandingPage = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/profiles/`)
      .then((res) => res.json())
      .then((data) => setProfile(data.results ? data.results[0] : data[0]))
      .catch((err) => console.error("Profile fetch error:", err));

    fetch(`${API_BASE}/projects/`)
      .then((res) => res.json())
      .then((data) => setProjects(data.results || data))
      .catch((err) => console.error("Projects fetch error:", err));
  }, []);

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="landing-page">
      <Header profile={profile} />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="fade-in">
              Hi, I’m <span className="accent">{profile.full_name}</span>
            </h1>
            <h2 className="typewriter">{profile.title}</h2>
            <p className="fade-in-delay">{profile.bio}</p>

            <div className="hero-buttons fade-in-delay">
              <Link to="/projects" className="btn primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn secondary">
                Hire Me
              </Link>
            </div>

            <div className="social-icons fade-in-delay">
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noreferrer">
                  <i className="fas fa-globe"></i>
                </a>
              )}
            </div>
          </div>

          <div className="hero-image fade-in-delay">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="profile-img"
              />
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((proj) => (
              <Link
                to={`/projects/${proj.id}`}
                key={proj.id}
                className="project-card"
              >
                {proj.cover && (
                  <div className="project-image-wrapper">
                    <img
                      src={proj.cover}
                      alt={proj.title}
                      className="project-image"
                    />
                  </div>
                )}
                <div className="project-info">
                  <h3>{proj.title}</h3>
                  <p>{proj.short_description}</p>
                  <p className="tech">{proj.tech_stack}</p>
                </div>
                <div className="project-links">
                  {proj.demo_url && (
                    <a href={proj.demo_url} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                  {proj.repo_url && (
                    <a href={proj.repo_url} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p>No projects yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
