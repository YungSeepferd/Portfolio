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
        boxShadow: 'none',
        mb: 3,
        scrollMarginTop: { xs: theme.spacing(12), md: theme.spacing(14) },
      }}
    >
      {/* Dynamic Image Container */}
      <Box
        id={`about-tab-image-section-${tabIndex}`}
        sx={{
          flex: { xs: 'none', md: '0 0 45%' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: 'background.paper',
          boxShadow: 'none',
          overflow: 'hidden',
          minHeight: { xs: 260, sm: 320, md: 360 },
          maxHeight: { xs: 360, sm: 400, md: 460 },
        }}
      >
        <AboutSlideshow pictures={tabData.pictures} />
      </Box>
      {/* Responsive Text Content */}
      <Box
        id={`about-tab-text-section-${tabIndex}`}
        sx={{
          flex: 1,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0, // Prevents flex item from overflowing
          gap: theme.spacing(2.5),
          pl: { md: 3 },
          pr: { xs: 0, md: 2 }, // Add right padding on desktop
          '& .MuiTypography-root': {
            marginBottom: 0,
            overflowWrap: 'break-word', // Ensure long words break properly
            hyphens: 'auto', // Enable hyphenation for better text flow
          },
          // Ensure proper spacing and readability
          '& .MuiTypography-h4': {
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            lineHeight: 1.2,
          },
          '& .MuiTypography-body1': {
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            maxWidth: '100%',
          },
        }}
      >
        {tabData.content}
      </Box>
    </Box>
  );
};

export default React.memo(AboutTabContent);
