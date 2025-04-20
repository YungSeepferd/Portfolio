import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import VideoPlayer from '../common/VideoPlayer';

/**
 * HeroVideo Component
 * 
 * Displays a hero video at the top of a project page with robust error handling
 * and support for different video source formats.
 */
const HeroVideo = ({ videoSrc, posterImage }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (!videoSrc) {
      setHasError(true);
      console.error('No video source provided to HeroVideo component');
    } else {
      setHasError(false);
    }
  }, [videoSrc]);
  
  // Handle successful video loading
  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };
  
  // Handle video loading error
  const handleVideoError = (error) => {
    console.error('Video failed to load:', videoSrc, error);
    setIsLoading(false);
    setHasError(true);
  };
  
  if (hasError) {
    return (
      <Box 
        component="section"
        sx={{ 
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
          Video could not be loaded
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          The video may be missing or in an unsupported format.
          <br/>
          Please check the source: {typeof videoSrc === 'object' ? videoSrc.src : videoSrc || 'No source provided'}
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box 
      component="section"
      sx={{ 
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isLoading && (
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 1,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      <video
        src={typeof videoSrc === 'object' ? videoSrc.src : videoSrc}
        autoPlay
        loop
        muted
        playsInline
        controls={false} // Remove control bar
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
        onLoad={handleVideoLoad}
        onError={handleVideoError}
      />
    </Box>
  );
};

HeroVideo.propTypes = {
  videoSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      src: PropTypes.string,
      type: PropTypes.string
    })
  ]),
  posterImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      src: PropTypes.string
    })
  ])
};

export default HeroVideo;
