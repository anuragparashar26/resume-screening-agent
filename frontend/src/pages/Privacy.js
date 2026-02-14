import React from 'react';
import { useNavigate } from 'react-router-dom';

function Privacy() {
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
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: February 14, 2026</p>

          <div className="page-content">
            <div>
              <h2>Information We Collect</h2>
              <p>
                SkillScreen collects information necessary to provide resume screening services. This includes
                job descriptions and resume documents you upload for analysis.
              </p>
            </div>

            <div>
              <h2>How We Use Your Information</h2>
              <p>We use the information you provide to:</p>
              <ul>
                <li>Analyze and evaluate resumes against job requirements</li>
                <li>Generate screening reports and insights</li>
                <li>Provide customer support</li>
              </ul>
            </div>

            <div>
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2>Data Retention</h2>
              <p>
                Your uploaded documents and evaluation results are stored locally in your browser. We do not
                retain copies of your documents on our servers after processing.
              </p>
            </div>

            <div>
              <h2>Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information at any time.
                Simply clear your browser's local storage to remove all locally stored data.
              </p>
            </div>

            <div>
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
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

export default Privacy;
