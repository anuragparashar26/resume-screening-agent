import React from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="logo-text">SkillScreen</span>
          </div>
          <div className="nav-links">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <button className="nav-cta" onClick={() => navigate('/evaluate')}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="page-section">
        <div className="page-container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>

          <div className="page-content">
            <div>
              <h2>Get In Touch</h2>
              <p>
                Have questions or feedback about SkillScreen? We'd love to hear from you.
              </p>
            </div>

            <div>
              <h2>Support</h2>
              <p>
                For technical support or questions about using SkillScreen, please reach out to us at{' '}
                <a href="mailto:anuragp5025@gmail.com" className="contact-link">
                  anuragp5025@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">SkillScreen</span>
            </div>
            <p>AI-powered resume screening for modern recruitment.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 SkillScreen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
