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
        alignItems: 'stretch',
        gap: { xs: 4, md: 6 },
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: 'background.paper',
        borderRadius: 0.5, // Minimized rounded corners
        boxShadow: 1,
        mb: 3,
      }}
    >
      {/* Standardized Image Frame */}
      <Box
        id={`about-tab-image-section-${tabIndex}`}
        sx={{
          flex: { xs: 'none', md: '0 0 40%' },
          // Dynamically set height based on image aspect ratio if available
          height: tabData.pictures && tabData.pictures[0] && tabData.pictures[0].aspectRatio
            ? {
                xs: `calc(100vw / ${tabData.pictures[0].aspectRatio})`,
                md: `calc(40vw / ${tabData.pictures[0].aspectRatio})`,
                lg: `calc(40vw / ${tabData.pictures[0].aspectRatio})`
              }
            : { xs: 220, sm: 280, md: 340, lg: 400 },
          maxHeight: { xs: 320, md: 420, lg: 500 },
          width: '100%',
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadius, // Apply theme shape border radius
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          boxShadow: 1,
        }}
      >
        <AboutSlideshow pictures={tabData.pictures} />
      </Box>
      {/* Standardized Text Content */}
      <Box
        id={`about-tab-text-section-${tabIndex}`}
        sx={{
          flex: 1,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pl: { md: 3 },
          '& .MuiTypography-root': {
            mb: 2.5,
          },
        }}
      >
        {tabData.content}
      </Box>
    </Box>
  );
};

export default React.memo(AboutTabContent);
