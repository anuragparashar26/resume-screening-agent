import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Chip,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

function EvaluationForm({ onEvaluate, loading }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [resumes, setResumes] = useState([]);
  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const isValidType = file.name.endsWith('.pdf') || file.name.endsWith('.docx');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors({
        ...errors,
        files: 'Some files were excluded. Only PDF/DOCX files under 5MB are allowed.'
      });
    } else {
      setErrors({ ...errors, files: null });
    }

    setResumes(validFiles);
  };

  const handleRemoveFile = (index) => {
    setResumes(resumes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate
    const newErrors = {};
    if (!jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    }
    if (!apiKey.trim()) {
      newErrors.apiKey = 'Google API key is required';
    }
    if (resumes.length === 0) {
      newErrors.resumes = 'At least one resume is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('job_description', jobDescription);
    formData.append('job_title', jobTitle);
    formData.append('api_key', apiKey);
    resumes.forEach(resume => {
      formData.append('resumes', resume);
    });

    onEvaluate(formData);
  };

  const handleReset = () => {
    setJobTitle('');
    setJobDescription('');
    setResumes([]);
    setErrors({});
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        New Evaluation
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* API Key */}
        <TextField
          fullWidth
          label="Google Gemini API Key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          error={!!errors.apiKey}
          helperText={errors.apiKey || 'Get your API key from https://aistudio.google.com/app/apikey'}
          margin="normal"
          required
        />

        {/* Job Title */}
        <TextField
          fullWidth
          label="Job Title (optional)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          margin="normal"
        />

        {/* Job Description */}
        <TextField
          fullWidth
          label="Job Description"
          multiline
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          error={!!errors.jobDescription}
          helperText={errors.jobDescription}
          margin="normal"
          required
        />

        {/* File Upload */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Upload Resumes (PDF or DOCX)
            <input
              type="file"
              hidden
              multiple
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
          </Button>
          {errors.resumes && (
            <Alert severity="error" sx={{ mt: 1 }}>{errors.resumes}</Alert>
          )}
          {errors.files && (
            <Alert severity="warning" sx={{ mt: 1 }}>{errors.files}</Alert>
          )}
        </Box>

        {/* Selected Files */}
        {resumes.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Selected files ({resumes.length}):
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {resumes.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => handleRemoveFile(index)}
                  deleteIcon={<DeleteIcon />}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Evaluating...' : 'Evaluate Resumes'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default EvaluationForm;
