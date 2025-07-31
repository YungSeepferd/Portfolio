import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ContentAwareImage from '../common/ContentAwareImage';

/**
 * AboutTabContent Component
 * 
 * Renders the content for a single tab in the About section,
 * including static image and text content.
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

  // Get the image source and position from tabData
  const imageData = tabData.pictures && tabData.pictures.length > 0 ? tabData.pictures[0] : null;
  const imgSrc = typeof imageData === 'string' ? imageData : imageData?.src;
  const imgPosition = typeof imageData === 'object' && imageData.position ? imageData.position : 'center center';
  
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
          height: imageData && imageData.aspectRatio
            ? {
                xs: `calc(100vw / ${imageData.aspectRatio})`,
                md: `calc(40vw / ${imageData.aspectRatio})`,
                lg: `calc(40vw / ${imageData.aspectRatio})`
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
        {imgSrc ? (
          <ContentAwareImage
            src={imgSrc}
            alt={`${tabData.title || 'About'} image`}
            objectPosition={imgPosition}
            objectFit="contain"
            containerHeight="100%"
            containerWidth="100%"
            expandOnHover={true}
            imageData={typeof imageData === 'object' ? imageData : null}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.background.paper,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '50%',
                height: '50%',
                opacity: 0.5,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23ccc\' d=\'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Box>
        )}
      </Box>
      {/* Standardized Text Content */}
      <Box
        id={`about-tab-text-section-${tabIndex}`}
        sx={{
          flex: 1,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          pl: { md: 3 },
          '& .MuiTypography-root': {
            mb: 2,
          },
          // Main headings in secondary color
          '& h4, & h5, & h6': {
            color: theme.palette.secondary.main,
            mb: 2,
          },
          // Subheadings back to gray tone
          '& .subheading, & .MuiTypography-subtitle1, & .MuiTypography-subtitle2': {
            color: theme.palette.text.secondary,
          },
          // Set icons to match heading color
          '& .MuiSvgIcon-root': {
            color: theme.palette.secondary.main,
          },
          // Ensure spacing between grid elements
          '& .MuiGrid-container': {
            mb: 3,
          }
        }}
      >
        {tabData.content}
      </Box>
    </Box>
  );
};

export default React.memo(AboutTabContent);
