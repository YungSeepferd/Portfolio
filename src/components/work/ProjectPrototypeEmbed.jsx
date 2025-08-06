import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

/**
 * ProjectPrototypeEmbed Component
 *
 * Handles the actual embedding of prototypes (e.g., Figma) in an iframe.
 */
const ProjectPrototypeEmbed = ({ type = 'figma', url, title = 'Prototype' }) => {
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          p: 2,
        }}
      >
        <Typography color="error">Invalid prototype URL provided.</Typography>
      </Box>
    );
  }

  // Construct the correct embed URL (example for Figma)
  let embedUrl = url;
  if (type === 'figma') {
    // Basic check if it looks like a Figma embed URL already
    if (!url.includes('figma.com/embed')) {
      // Attempt to construct embed URL from a standard Figma link
      // Example: https://www.figma.com/file/...?node-id=... or https://www.figma.com/proto/...?node-id=...
      try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'www.figma.com' || urlObj.hostname === 'figma.com') {
          // Keep existing query params, add embed specific ones
          urlObj.pathname = `/embed`;
          urlObj.searchParams.set('embed_host', 'share'); // Standard embed host
          // urlObj.searchParams.set('hub_file_id', '...'); // Optional: if you have hub file ID
          embedUrl = urlObj.toString();
        } else {
          console.warn("Provided URL doesn't look like a standard Figma link. Using as is.");
        }
      } catch (e) {
        console.error('Error parsing Figma URL, using as is:', e);
      }
    }
    // Add necessary Figma embed parameters if missing
    if (!embedUrl.includes('scaling=scale-down-width')) {
      embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'scaling=scale-down-width';
    }
  }
  // Add logic for other types (e.g., InVision, Marvel) if needed

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {hasError ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            p: 2,
            flexDirection: 'column',
          }}
        >
          <Typography color="error" variant="h6" gutterBottom>
            Failed to load prototype
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The interactive prototype could not be loaded.
          </Typography>
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
