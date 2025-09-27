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
  
  // Extract the first h4 heading to place it in the top row
  const content = React.Children.toArray(tabData.content.props.children);
  const heading = content.find(child => child.type === Typography && child.props.variant === 'h4');
  const restContent = content.filter(child => child !== heading);

  return (
    <Box
      role="tabpanel"
      id={`about-tabpanel-${tabIndex}`}
      aria-labelledby={`about-tab-${tabIndex}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 4, md: 6 },
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: 'background.paper',
        borderRadius: 0.5,
        boxShadow: 'none',
        mb: 3,
        scrollMarginTop: { xs: theme.spacing(12), md: theme.spacing(14) },
      }}
    >
      {/* Top Row: Image and Heading */}
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '45% 1fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'flex-start',
        }}
      >
        {/* Image Container */}
        <Box
          id={`about-tab-image-section-${tabIndex}`}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'background.paper',
            boxShadow: 'none',
            overflow: 'hidden',
            minHeight: { xs: 260, sm: 320, md: 280 },
            maxHeight: { xs: 360, sm: 400, md: 380 },
          }}
        >
          <AboutSlideshow pictures={tabData.pictures} />
        </Box>

        {/* Heading Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: { md: '100%' },
            '& .MuiTypography-h4': {
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              lineHeight: 1.2,
              mb: 2,
            },
            '& .MuiTypography-subtitle1': {
              color: 'text.secondary',
              mb: 2,
            },
          }}
        >
          {heading}
          {tabData.subtitle && (
            <Typography variant="subtitle1">
              {tabData.subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Bottom Row: Full Width Content */}
      <Box
        id={`about-tab-content-section-${tabIndex}`}
        sx={{
          width: '100%',
          color: theme.palette.text.primary,
          '& .MuiTypography-root': {
            marginBottom: 0,
            overflowWrap: 'break-word',
            hyphens: 'auto',
          },
          '& .MuiTypography-body1': {
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            mb: 2,
            '&:last-child': {
              mb: 0,
            },
          },
          '& ul, & ol': {
            pl: 2.5,
            mb: 2,
            '& li': {
              mb: 1,
              '&:last-child': {
                mb: 0,
              },
            },
          },
        }}
      >
        {restContent}
      </Box>
    </Box>
  );
};

export default React.memo(AboutTabContent);
