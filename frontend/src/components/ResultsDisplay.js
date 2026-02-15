import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { format } from 'date-fns';

function ResultsDisplay({ evaluation }) {
  const { job_title, job_description, created_at, results } = evaluation;

  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  const handleDownloadCSV = () => {
    const headers = ['Candidate', 'Score', 'Matching Skills', 'Missing Skills', 'Summary'];
    const rows = sortedResults.map(r => [
      r.candidate_name,
      r.score,
      (r.matching_skills || []).join('; '),
      (r.missing_skills || []).join('; '),
      r.summary || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation_results_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy \'at\' hh:mm a');
    } catch {
      return dateString;
    }
  };

  return (
    <Box>
      {/* Evaluation Info */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {job_title || 'Evaluation Results'}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Created: {formatDate(created_at)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Job Description:
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
          {job_description}
        </Typography>
      </Paper>

      {/* Results Table */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Candidates ({sortedResults.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadCSV}
            size="small"
          >
            Download CSV
          </Button>
        </Box>

        {/* Desktop Table View */}
        <TableContainer sx={{ display: { xs: 'none', md: 'block' }, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1200, tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 70 }}><strong>Rank</strong></TableCell>
                <TableCell sx={{ width: 190 }}><strong>Candidate</strong></TableCell>
                <TableCell sx={{ width: 110 }}><strong>Score</strong></TableCell>
                <TableCell sx={{ width: 290 }}><strong>Matching Skills</strong></TableCell>
                <TableCell sx={{ width: 290 }}><strong>Missing Skills</strong></TableCell>
                <TableCell sx={{ minWidth: 360 }}><strong>Summary</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ verticalAlign: 'top' }}>{index + 1}</TableCell>
                  <TableCell sx={{ verticalAlign: 'top', wordBreak: 'break-word' }}>{result.candidate_name}</TableCell>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <Chip
                      label={Number(result.score).toFixed(2)}
                      color={result.score >= 70 ? 'success' : result.score >= 50 ? 'warning' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {(result.matching_skills && result.matching_skills.length > 0) ? (
                        result.matching_skills.map((skill, i) => (
                          <Chip key={i} label={skill} size="small" color="success" variant="outlined" />
                        ))
                      ) : (
                        <Chip label="No matching skills" size="small" color="default" variant="outlined" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {(result.missing_skills && result.missing_skills.length > 0) ? (
                        result.missing_skills.map((skill, i) => (
                          <Chip key={i} label={skill} size="small" color="error" variant="outlined" />
                        ))
                      ) : (
                        <Chip label="No missing skills" size="small" color="default" variant="outlined" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <Box sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontStyle: 'italic', color: 'text.secondary', fontSize: '0.95rem', p: 1, borderRadius: 1, bgcolor: 'action.hover' }}>
                      {result.summary && result.summary.length > 0 ? result.summary : 'No summary provided.'}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Mobile Card View */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {sortedResults.map((result, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    #{index + 1} {result.candidate_name}
                  </Typography>
                  <Chip
                    label={Number(result.score).toFixed(2)}
                    color={result.score >= 70 ? 'success' : result.score >= 50 ? 'warning' : 'error'}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Summary:
                </Typography>
                <Typography variant="body2" paragraph>
                  <Box sx={{ whiteSpace: 'pre-line', fontStyle: 'italic', color: 'text.secondary', fontSize: '0.95rem', p: 1, borderRadius: 1, background: '#f7f7fa' }}>
                    {result.summary && result.summary.length > 0 ? result.summary : 'No summary provided.'}
                  </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Matching Skills:
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                  {(result.matching_skills && result.matching_skills.length > 0) ? (
                    result.matching_skills.map((skill, i) => (
                      <Chip key={i} label={skill} size="small" color="success" variant="outlined" />
                    ))
                  ) : (
                    <Chip label="No matching skills" size="small" color="default" variant="outlined" />
                  )}
                </Stack>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Missing Skills:
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {(result.missing_skills && result.missing_skills.length > 0) ? (
                    result.missing_skills.map((skill, i) => (
                      <Chip key={i} label={skill} size="small" color="error" variant="outlined" />
                    ))
                  ) : (
                    <Chip label="No missing skills" size="small" color="default" variant="outlined" />
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default ResultsDisplay;
