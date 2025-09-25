import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

/**
 * ProjectPrototypeEmbed Component
 *
 * Handles the actual embedding of prototypes (e.g., Figma) in an iframe.
 */
const ProjectPrototypeEmbed = ({ type = 'figma', url, title = "Prototype" }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error(`Failed to load ${type} embed from:`, url);
  };

  // Basic URL validation
  if (!url || typeof url !== 'string') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: 2 }}>
        <Typography color="error">Invalid prototype URL provided.</Typography>
      </Box>
    );
  }

  // Construct the correct embed URL (example for Figma)
  let embedUrl = url;
  if (type === 'figma') {
    const isEmbedUrl = /figma\.com\/embed/i.test(url);

    if (!isEmbedUrl) {
      try {
        const urlObj = new URL(url);

        if (urlObj.hostname === 'www.figma.com' || urlObj.hostname === 'figma.com') {
          const normalizedUrl = urlObj.toString();
          embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(normalizedUrl)}`;
        } else {
          console.warn("Provided URL doesn't look like a standard Figma link. Using as is.");
        }
      } catch (e) {
        console.error("Error parsing Figma URL, using as is:", e);
      }
    }

    // Ensure the embed respects width scaling without duplicating the param
    if (!/scaling=/.test(embedUrl)) {
      embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'scaling=scale-down-width';
    }
  }
  // Add logic for other types (e.g., InVision, Marvel) if needed

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, backgroundColor: theme.palette.background.default }}>
          <CircularProgress />
        </Box>
      )}
      {hasError ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: 2, flexDirection: 'column' }}>
          <Typography color="error" variant="h6" gutterBottom>Failed to load prototype</Typography>
          <Typography variant="body2" color="text.secondary">The interactive prototype could not be loaded.</Typography>
        </Box>
      ) : (
        <iframe
          title={title}
          style={{ border: 'none', width: '100%', height: '100%' }}
          src={embedUrl}
          onLoad={handleLoad}
          onError={handleError}
          allowFullScreen
          loading="lazy" // Add lazy loading
        ></iframe>
      )}
    </Box>
  );
};

export default ProjectPrototypeEmbed;
