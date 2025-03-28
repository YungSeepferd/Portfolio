import React, { useState } from 'react';
import ProjectBubble from './ProjectBubble';
import { Box, Typography, Button, Dialog, DialogContent, DialogTitle, DialogActions, useTheme } from '@mui/material';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const theme = useTheme();

  const handleReadMore = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Box 
      className="project-card"
      sx={{
        borderRadius: theme.shape.borderRadius,
        transition: `all ${theme.transitions?.short || '0.3s'} ease`,
        boxShadow: `0 4px 12px ${theme.palette.shadow.light}`,
        '&:hover': {
          boxShadow: `0 12px 24px ${theme.palette.shadow.medium}`,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
      }}
    >
      <ProjectBubble image={project.image} alt={project.name} />
      <Typography variant="h5" sx={{ mt: 2 }}>{project.name}</Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleReadMore}
        sx={{ mt: 2 }}
      >
        Read More
      </Button>
      
      <Dialog 
        open={isPopupOpen} 
        onClose={handleClosePopup}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: theme.shape.borderRadius,
            p: theme.spacing(2)
          }
        }}
      >
        <DialogTitle variant="h4">{project.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectCard;