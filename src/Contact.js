import React, { useState } from "react";
import "./Contact.css";
import Header from "./Header";
import Footer from "./Footer";

const API_BASE = "https://portfolio-backend-aapr.onrender.com/api/contacts/";
//const API_BASE = process.env.REACT_APP_API_BASE;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message.");

      setStatus({ loading: false, success: "Message sent successfully!", error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        <div className="contact-card">
          <h2>Get in Touch</h2>
          <p className="intro-text">
            Have a project in mind or just want to say hi? I’d love to hear from you.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
              />
            </div>

            <button type="submit" disabled={status.loading}>
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status.success && <p className="success">{status.success}</p>}
          {status.error && <p className="error">{status.error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
