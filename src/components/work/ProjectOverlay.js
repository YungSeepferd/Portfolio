import React from 'react';
import Overlay from './Overlay';
import FooterContact from './FooterContact'; // Import FooterContact component
import { Button, Box, Typography, useTheme, CircularProgress } from '@mui/material';

const ProjectOverlay = ({ project, onClose }) => {
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Overlay onClose={onClose}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(4),
          borderRadius: theme.shape.borderRadius,
          boxShadow: `0 8px 32px ${theme.palette.shadow.medium}`,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.primary.main,
            mb: theme.spacing(3), // Use theme spacing
          }}
        >
          {project.title}
        </Typography>
        
        {project.media ? (
          <>
            {!imageLoaded && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px', // Placeholder height
                  mb: theme.spacing(3),
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <Box
              component="img"
              src={project.media.src}
              alt={project.title}
              onLoad={() => setImageLoaded(true)}
              sx={{
                display: imageLoaded ? 'block' : 'none',
                borderRadius: theme.shape.borderRadius,
                mb: theme.spacing(3), // Use theme spacing
              }}
            />
          </>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.error.main,
              mb: theme.spacing(3), // Use theme spacing
            }}
          >
            Media not available
          </Typography>
        )}
        
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            mb: theme.spacing(4), // Use theme spacing
          }}
        >
          {project.details}
        </Typography>
        
        <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: theme.spacing(3) }}>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.secondary.main,
              mb: theme.spacing(2), // Use theme spacing
            }}
          >
            UX Designer Notes
          </Typography>
          {/* ...remaining content... */}
        </Box>
        
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ 
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
            ...theme.customButtons.contact, // Use consistent styling with FooterContact
          }}
        >
          Close
        </Button>
      </Box>
      
      <FooterContact projectTitle={project.title} />
    </Overlay>
  );
};

export default ProjectOverlay;