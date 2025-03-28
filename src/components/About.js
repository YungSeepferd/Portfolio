import React from 'react';
import { Box } from '@mui/material';
import ParallaxScroll from './ParallaxScroll';

const About = () => {
  return (
    <Box 
      id="about" 
      component="section"
      sx={{ 
        width: '100%',
        mt: { xs: 10, md: 16 }, // Add significant top margin to push it below Work section
        mb: { xs: 8, md: 10 },  // Add bottom margin before footer
      }}
    >
      <ParallaxScroll />
    </Box>
  );
};

export default About;