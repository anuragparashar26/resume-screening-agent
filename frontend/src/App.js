import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  Drawer,
  useMediaQuery,
  Alert,
  Snackbar
} from '@mui/material';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import EvaluationForm from './components/EvaluationForm';
import ResultsDisplay from './components/ResultsDisplay';
import HistorySidebar from './components/HistorySidebar';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const STORAGE_KEY = 'skillscreen_evaluations';

// Helper functions for localStorage
const saveToLocalStorage = (evaluations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return [];
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/evaluate" element={<EvaluatePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);


  return (
    <div className="app-wrapper">
      <nav className="navbar nav-with-toggle">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/icons/black.png" alt="SkillScreen logo" className="logo-icon" style={{height:36, width:36, marginRight:8}} />
            <span className="logo-text">SkillScreen</span>
          </div>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            ☰
          </button>
          <div className={`nav-links ${mobileNavOpen ? 'mobile-open' : ''}`}> 
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <button className="nav-cta" onClick={() => navigate('/evaluate')}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section redesigned-hero" id="home">
        <div className="hero-content-wrapper">
          <div className="hero-main-content">
            <span className="redesigned-badge">AI Resume Screening</span>
            <h1 className="hero-title redesigned-title">
              <span className="gradient-text">Screen Smarter.</span> <br />
              <span>Hire Faster.</span>
            </h1>
            <p className="hero-subtitle redesigned-subtitle">
              Instantly turn resumes into actionable, role-specific scorecards. <br />
              Uncover strengths, gaps, and fit, no manual review required.
            </p>
            <div className="hero-cta-row redesigned-cta-row">
              <button type="button" className="redesigned-cta" onClick={() => navigate('/evaluate')}>
                Try SkillScreen
              </button>
            </div>
            <div className="hero-trust-row redesigned-trust-row">
              <span>PDF & DOCX</span>
              <span>Role-Aware AI</span>
              <span>Local History</span>
              <span>No Signup Needed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="features-container">
          <h2>Why Choose SkillScreen</h2>
          <div className="features-grid">
            <div className="feature-card">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3>Role-Aware Scoring</h3>
                <p>Generate candidate scores aligned to the exact position requirements.</p>
              </div>
            </div>
            <div className="feature-card">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3>Skill Gap Breakdown</h3>
                <p>Get matched skills, missing skills, and decision-ready summaries.</p>
              </div>
            </div>
            <div className="feature-card">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3>Recruiter Workflow Speed</h3>
                <p>Reduce manual screening time and focus interviews on top candidates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/icons/white.png" alt="SkillScreen logo" className="logo-icon" style={{height:36, width:36, marginRight:8}} />
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

function EvaluatePage() {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [currentResults, setCurrentResults] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  const isMobile = useMediaQuery('(max-width:768px)');

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#7c3aed',
      },
      secondary: {
        main: '#14b8a6',
      },
      background: {
        default: '#f4f4f9',
        paper: '#ffffff'
      },
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: 'Inter, Segoe UI, Roboto, Arial, sans-serif',
    },
  });

  // Load evaluations on mount
  useEffect(() => {
    const stored = loadFromLocalStorage();
    setEvaluations(stored);
  }, []);

  const handleEvaluate = async (formData) => {
    setLoading(true);
    setCurrentResults(null);
    setSelectedEvaluation(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/evaluate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const evaluationData = response.data;
      setCurrentResults(evaluationData);
      
      // Save to localStorage
      const newEvaluation = {
        evaluation_id: evaluationData.evaluation_id,
        job_title: evaluationData.job_title,
        created_at: evaluationData.created_at,
        num_candidates: evaluationData.results.length,
        job_description: evaluationData.job_description,
        results: evaluationData.results
      };
      
      const updatedEvaluations = [newEvaluation, ...evaluations];
      setEvaluations(updatedEvaluations);
      saveToLocalStorage(updatedEvaluations);
      
      setNotification({
        open: true,
        message: 'Evaluation completed successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Evaluation failed:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Evaluation failed';
      setNotification({
        open: true,
        message: errorMsg,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvaluation = (evaluationId) => {
    const evaluation = evaluations.find(e => e.evaluation_id === evaluationId);
    if (evaluation) {
      setSelectedEvaluation(evaluation);
      setCurrentResults(null);
      if (isMobile) {
        setDrawerOpen(false);
      }
    } else {
      setNotification({
        open: true,
        message: 'Evaluation not found',
        severity: 'error'
      });
    }
  };

  const handleDeleteEvaluation = (evaluationId) => {
    const updatedEvaluations = evaluations.filter(e => e.evaluation_id !== evaluationId);
    setEvaluations(updatedEvaluations);
    saveToLocalStorage(updatedEvaluations);
    
    if (selectedEvaluation?.evaluation_id === evaluationId) {
      setSelectedEvaluation(null);
    }
    
    setNotification({
      open: true,
      message: 'Evaluation deleted',
      severity: 'success'
    });
  };

  const handleNewEvaluation = () => {
    setSelectedEvaluation(null);
    setCurrentResults(null);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const sidebarContent = (
    <HistorySidebar
      evaluations={evaluations}
      onSelectEvaluation={handleSelectEvaluation}
      onDeleteEvaluation={handleDeleteEvaluation}
      onNewEvaluation={handleNewEvaluation}
      selectedId={selectedEvaluation?.evaluation_id}
      onClose={isMobile ? () => setDrawerOpen(false) : undefined}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-wrapper">
        {/* Mobile Navbar */}
        {isMobile && (
          <nav className="navbar nav-with-toggle" style={{ position: 'sticky', top: 0, zIndex: 120 }}>
            <div className="nav-container">
              <div className="nav-logo">
                <img src="/icons/black.png" alt="SkillScreen logo" className="logo-icon" style={{height:32, width:32, marginRight:8}} />
                <span className="logo-text">SkillScreen</span>
              </div>
              <button
                className="nav-toggle"
                type="button"
                aria-label="Toggle navigation"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                ☰
              </button>
            </div>
          </nav>
        )}
        <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(160deg, #f4f4f9 0%, #ede9fe 100%)' }}>
          {/* Sidebar */}
          {isMobile ? (
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{
                '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box' }
              }}
            >
              {sidebarContent}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                width: 280,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: 280,
                  boxSizing: 'border-box',
                  borderRight: '1px solid #ddd6fe',
                  background: 'rgba(255,255,255,0.94)',
                  backdropFilter: 'blur(8px)'
                },
              }}
            >
              {sidebarContent}
            </Drawer>
          )}

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 280px)` },
              mt: isMobile ? 1 : 0,
            }}
          >
            <Container maxWidth="lg">
              {/* Workspace Header */}
              <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #ddd6fe', background: 'rgba(255,255,255,0.9)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    SkillScreen Workspace
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Unified scoring, matching insights, and faster shortlist decisions
                </Typography>
              </Paper>

              {/* Main Content Area */}
              {selectedEvaluation ? (
                <ResultsDisplay evaluation={selectedEvaluation} />
              ) : currentResults ? (
                <ResultsDisplay evaluation={currentResults} />
              ) : (
                <EvaluationForm onEvaluate={handleEvaluate} loading={loading} />
              )}
            </Container>
          </Box>
        </Box>
      </div>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
