import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Button,
  Toolbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';

function HistorySidebar({ evaluations, onSelectEvaluation, onDeleteEvaluation, onNewEvaluation, selectedId }) {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          SkillScreen
        </Typography>
      </Toolbar>
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onNewEvaluation}
        >
          New Evaluation
        </Button>
      </Box>
      
      <Divider />
      
      <Typography variant="subtitle2" sx={{ p: 2, pb: 1 }}>
        History ({evaluations.length})
      </Typography>
      
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {evaluations.length === 0 ? (
          <ListItem>
            <ListItemText
              secondary="No evaluations yet"
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
        ) : (
          evaluations.map((evaluation) => (
            <ListItem
              key={evaluation.evaluation_id}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvaluation(evaluation.evaluation_id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                selected={selectedId === evaluation.evaluation_id}
                onClick={() => onSelectEvaluation(evaluation.evaluation_id)}
              >
                <ListItemText
                  primary={evaluation.job_title || 'Untitled'}
                  secondary={
                    <>
                      {formatDate(evaluation.created_at)}
                      <br />
                      {evaluation.num_candidates} candidate{evaluation.num_candidates !== 1 ? 's' : ''}
                    </>
                  }
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: '0.9rem'
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}

export default HistorySidebar;
