import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage";
import ProjectDetails from "./ProjectDetails";
import Contact from "./Contact";
import About from "./About";
import ProjectPage from "./ProjectPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home / landing page */}
          <Route path="/home" element={<LandingPage />} />

          {/* Project details page */}
          <Route path="/projects/:id" element={<ProjectDetails />} />
          {/* Contact page */}
          <Route path="/contact" element={<Contact />} />

          {/* About page */}
          <Route path="/about" element={<About />} />

          {/* Projects listing page */}
          <Route path="/projects" element={<ProjectPage />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
