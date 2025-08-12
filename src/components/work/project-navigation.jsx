import React from 'react';
import { Box, IconButton, Button, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProjectNavigation = ({ onClose, onPrev, onNext }) => {
  const theme = useTheme();

  return (
    <>
      {/* Close button - Styled like the contact button in FooterContact */}
      <Box
        sx={{ position: 'fixed', top: theme.spacing(2.5), right: theme.spacing(2.5), zIndex: 10 }}
      >
        <Button
          variant="contained"
          color="primary" // Changed to primary to match tab color scheme
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
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: theme.spacing(2.5),
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={onPrev}
          sx={{
            color: theme.palette.primary.main, // Updated to primary color
            backgroundColor: theme.palette.background.overlay || 'rgba(19, 31, 45, 0.7)',
            '&:hover': {
              backgroundColor: theme.palette.background.overlayHover || 'rgba(19, 31, 45, 0.9)',
              color: theme.palette.primary.light, // Add hover effect
            },
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Next project button */}
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          right: theme.spacing(2.5),
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={onNext}
          sx={{
            color: theme.palette.primary.main, // Updated to primary color
            backgroundColor: 'rgba(19, 31, 45, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(19, 31, 45, 0.9)',
              color: theme.palette.primary.light, // Add hover effect
            },
          }}
        >
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
};

export default ProjectNavigation;
