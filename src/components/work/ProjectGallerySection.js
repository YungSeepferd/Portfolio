import React, { Suspense } from 'react';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';

// Import our new gallery component instead
const ProjectImageGallery = React.lazy(() => import('./ProjectImageGallery'));

const ProjectGallerySection = ({ images, title }) => {
  const theme = useTheme();
  
  if (!images || images.length <= 1) return null;
  
  return (
    <>
      <Typography 
        variant="h3" 
        component="h3" 
        sx={{ mb: 4, color: theme.palette.text.primary }}
      >
        Project Gallery
      </Typography>
      
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      }>
        <ProjectImageGallery images={images} title={title} />
      </Suspense>
    </>
  );
};

export default ProjectGallerySection;
