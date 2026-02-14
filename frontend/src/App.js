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
  IconButton,
  useMediaQuery,
  AppBar,
  Toolbar,
  Alert,
  Snackbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import EvaluationForm from './components/EvaluationForm';
import ResultsDisplay from './components/ResultsDisplay';
import HistorySidebar from './components/HistorySidebar';
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
  const [darkMode, setDarkMode] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [currentResults, setCurrentResults] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  const isMobile = useMediaQuery('(max-width:768px)');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
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
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* AppBar for mobile */}
        {isMobile && (
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(!drawerOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                SkillScreen
              </Typography>
            </Toolbar>
          </AppBar>
        )}

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
            mt: isMobile ? 8 : 0,
          }}
        >
          <Container maxWidth="lg">
            {/* Header */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  SkillScreen - Resume Screening Agent
                </Typography>
                <IconButton
                  component="a"
                  href="https://github.com/anuragparashar26/skillscreen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                AI-powered resume evaluation using Google Gemini
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
