import React from 'react';
import { Box, IconButton, Button, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

const ProjectNavigation = ({ onClose, onPrev, onNext }) => {
  const theme = useTheme();
  
  return (
    <>
      {/* Close button - Using Button instead of IconButton for better theme consistency */}
      <Box sx={{ position: 'fixed', top: theme.spacing(2.5), right: theme.spacing(2.5), zIndex: 10 }}>
        <Button 
          variant="contained"
          color="primary"
          onClick={onClose}
          startIcon={<CloseIcon />}
          sx={{ 
            ...theme.customButtons.close,
            ...theme.customButtons.contact,
            minWidth: 'unset',
            borderRadius: '50%',
            width: theme.spacing(6),
            height: theme.spacing(6),
            p: 0,
            '& .MuiButton-startIcon': {
              margin: 0,
            }
          }}
        >
          <span className="sr-only">Close</span>
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
