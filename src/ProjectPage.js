import React, { useEffect, useState } from "react";
import "./ProjectPage.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

//const API_BASE = "https://portfolio-backend-aapr.onrender.com/api";
const API_BASE = process.env.REACT_APP_API_BASE;

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.results || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Projects fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="projects-page">
      <Header />

      <section className="projects-hero">
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>My Projects</h1>
          <p>Explore some of my recent works — built with passion and creativity.</p>
        </div>
      </section>

      <section className="projects-gallery">
        {loading ? (
          <p className="loading">Loading projects...</p>
        ) : projects.length > 0 ? (
          <div className="project-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="project-card">
                <div className="image-wrapper">
                  {proj.cover ? (
                    <img src={proj.cover} alt={proj.title} className="project-img" />
                  ) : (
                    <div className="placeholder">No Image</div>
                  )}
                </div>
                <div className="project-details">
                  <h2>{proj.title}</h2>
                  <p className="desc">{proj.short_description}</p>
                  <p className="stack">{proj.tech_stack}</p>
                </div>
                <div className="project-actions">
                  <Link to={`/projects/${proj.id}`} className="btn view-btn">
                    View Details
                  </Link>
                  {proj.demo_url && (
                    <a href={proj.demo_url} target="_blank" rel="noreferrer" className="btn live-btn">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">No projects found.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ProjectPage;
