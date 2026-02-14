import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
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
          <h1>About SkillScreen</h1>
          <p>AI-powered resume screening made simple</p>

          <div className="page-content">
            <div>
              <h2>What is SkillScreen?</h2>
              <p>
                SkillScreen is an intelligent resume screening tool that helps recruiters and hiring managers
                quickly evaluate candidates against job requirements. Using advanced AI technology, it analyzes
                resumes and provides detailed insights about candidate fit.
              </p>
            </div>

            <div>
              <h2>How It Works</h2>
              <p>
                Simply upload job descriptions and candidate resumes. Our AI analyzes the content, matches skills,
                and provides comprehensive evaluation reports including scores, matching skills, and areas for improvement.
              </p>
            </div>

            <div>
              <h2>Key Features</h2>
              <ul>
                <li>Automated resume analysis</li>
                <li>Skills matching and gap analysis</li>
                <li>Comparative candidate ranking</li>
                <li>Detailed evaluation reports</li>
                <li>Support for PDF and DOCX formats</li>
              </ul>
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

export default About;
