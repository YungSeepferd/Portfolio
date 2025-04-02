import React from 'react';
import { Box, IconButton, Button, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProjectNavigation = ({ onClose, onPrev, onNext }) => {
  const theme = useTheme();
  
  return (
    <>
      {/* Close button - Styled like the contact button in FooterContact */}
      <Box sx={{ position: 'fixed', top: theme.spacing(2.5), right: theme.spacing(2.5), zIndex: 10 }}>
        <Button 
          variant="contained"
          color="secondary"
          onClick={onClose}
          sx={{ 
            textTransform: 'none',
            fontWeight: 'bold',
            px: 3,
            py: 1,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[4],
          }}
        >
          Close
        </Button>
      </Box>
      
      {/* Previous project button */}
      <Box sx={{ 
        position: 'fixed', 
        top: '50%', 
        left: theme.spacing(2.5), 
        transform: 'translateY(-50%)', 
        zIndex: 10 
      }}>
        <IconButton 
          onClick={onPrev}
          sx={{ 
            color: theme.palette.text.primary,
            backgroundColor: 'rgba(19, 31, 45, 0.7)',
            '&:hover': { backgroundColor: 'rgba(19, 31, 45, 0.9)' }
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Box>
      
      {/* Next project button */}
      <Box sx={{ 
        position: 'fixed', 
        top: '50%', 
        right: theme.spacing(2.5), 
        transform: 'translateY(-50%)', 
        zIndex: 10 
      }}>
        <IconButton 
          onClick={onNext}
          sx={{ 
            color: theme.palette.text.primary,
            backgroundColor: 'rgba(19, 31, 45, 0.7)',
            '&:hover': { backgroundColor: 'rgba(19, 31, 45, 0.9)' }
          }}
        >
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
};

export default ProjectNavigation;
