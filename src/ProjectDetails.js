import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProjectDetails.css";
import Header from "./Header";
import Footer from "./Footer";

//const API_BASE = "https://portfolio-backend-aapr.onrender.com/api";
const API_BASE = process.env.REACT_APP_API_BASE;

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/profiles/`)
      .then((res) => res.json())
      .then((data) => setProfile(data.results ? data.results[0] : data[0]))
      .catch((err) => console.error("Fetch error (profile):", err));

    fetch(`${API_BASE}/projects/${id}/`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error("Fetch error (project):", err));
  }, [id]);

  if (!project) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  return (
    <div className="project-details-page">
    {/* Header */}
      <Header profile={profile} />
      

      {/* Header */}
      <header className="project-header fade-in">
        <Link to="/" className="back-link">← Back</Link>
        <h1 className="project-title">{project.title}</h1>
        <p className="project-tech">{project.tech_stack}</p>
      </header>

      {/* Main content */}
      <main className="project-main fade-in">
        {project.cover && (
          <div className="project-cover">
            <img src={project.cover} alt={project.title} />
          </div>
        )}

        <div className="project-content">
          <h2>About this Project</h2>
          <p className="project-desc">{project.description || project.short_description}</p>

          {project.features && (
            <>
              <h3>Key Features</h3>
              <ul>
                {project.features.split(",").map((feature, index) => (
                  <li key={index}>{feature.trim()}</li>
                ))}
              </ul>
            </>
          )}

          {(project.demo_url || project.repo_url) && (
            <div className="project-links">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                >
                  Live Demo
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  View Code
                </a>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetails;
