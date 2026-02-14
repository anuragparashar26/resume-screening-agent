import React from 'react';
import { useNavigate } from 'react-router-dom';

function Terms() {
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
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: February 14, 2026</p>

          <div className="page-content">
            <div>
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using SkillScreen, you accept and agree to be bound by the terms and
                provisions of this agreement.
              </p>
            </div>

            <div>
              <h2>Use License</h2>
              <p>
                Permission is granted to use SkillScreen for resume screening and candidate evaluation purposes.
                This license shall automatically terminate if you violate any of these restrictions.
              </p>
            </div>

            <div>
              <h2>User Responsibilities</h2>
              <p>You agree to:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to access unauthorized areas</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2>Disclaimer</h2>
              <p>
                The materials on SkillScreen are provided on an 'as is' basis. SkillScreen makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2>Limitations</h2>
              <p>
                In no event shall SkillScreen or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of
                the use or inability to use SkillScreen.
              </p>
            </div>

            <div>
              <h2>Modifications</h2>
              <p>
                SkillScreen may revise these terms of service at any time without notice. By using this service,
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2>Contact</h2>
              <p>
                Questions about the Terms of Service should be sent to{' '}
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

export default Terms;
