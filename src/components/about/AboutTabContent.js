import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AboutSlideshow from './AboutSlideshow';

/**
 * AboutTabContent Component
 * 
 * Renders the content for a single tab in the About section,
 * including slideshow and text content.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.tabData - Data for the current tab
 * @param {number} props.tabIndex - Index of the current tab
 * @returns {JSX.Element} Tab content component
 */
const AboutTabContent = ({ tabData, tabIndex }) => {
  const theme = useTheme();
  
  if (!tabData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No content available</Typography>
      </Box>
    );
  }
  
  return (
    <Box
      role="tabpanel"
      id={`about-tabpanel-${tabIndex}`}
      aria-labelledby={`about-tab-${tabIndex}`}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 4, md: 6 },
        padding: { xs: 3, sm: 4, md: 5 }, // Increased padding for more space
      }}
    >
      {/* Image section - REDUCED FROM 50% to 40% */}
      <Box
        sx={{
          flex: { 
            xs: '1', 
            md: '0 0 40%' // Changed from 900px/50% to 40%
          },
          mb: { xs: 3, md: 0 },
          // Making sure the container fills the available height
          height: { xs: 'auto', md: '100%' },
          minHeight: { xs: '400px', md: '600px' }, // Maintain height for visual appeal
        }}
      >
        <AboutSlideshow pictures={tabData.pictures} />
      </Box>
      
      {/* Text content section - INCREASED TO 60% */}
      <Box
        sx={{
          flex: 1, // Will take remaining 60% in the flex container
          color: theme.palette.text.primary,
          overflowY: 'visible', // Changed from 'auto' to 'visible'
          // Removed maxHeight constraint to show all content
          '& .MuiTypography-root': {
            mb: 3, // Add consistent spacing between typography elements
          },
          pl: { md: 2 }, // Add padding to separate from the image
        }}
      >
        {tabData.content}
      </Box>
    </Box>
  );
};

export default React.memo(AboutTabContent);
