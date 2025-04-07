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
const HeroVideo = ({ videoSrc }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [normalizedSrc, setNormalizedSrc] = useState('');
  
  // Normalize the video source on component mount and when it changes
  useEffect(() => {
    try {
      if (!videoSrc) {
        setHasError(true);
        console.error('No video source provided');
        return;
      }
      
      // Handle different videoSrc formats
      if (typeof videoSrc === 'string') {
        setNormalizedSrc(videoSrc);
      } else if (videoSrc.src) {
        setNormalizedSrc(videoSrc.src);
      } else if (videoSrc.type === 'video' && videoSrc.src) {
        setNormalizedSrc(videoSrc.src);
      } else {
        throw new Error('Invalid video source format');
      }
      
      setHasError(false);
    } catch (error) {
      console.error('Error processing video source:', error);
      setHasError(true);
    }
  }, [videoSrc]);
  
  // Handle successful video loading
  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };
  
  // Handle video loading error
  const handleVideoError = (error) => {
    console.error('Video failed to load:', normalizedSrc, error);
    setIsLoading(false);
    setHasError(true);
  };
  
  if (hasError) {
    return (
      <Box 
        component="section"
        sx={{ 
          my: 6,
          width: '100%',
          height: { xs: '200px', sm: '300px', md: '400px' },
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
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
          Please check the source: {normalizedSrc || 'No source provided'}
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box 
      component="section"
      sx={{ 
        my: 6,
        width: '100%',
        height: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        position: 'relative',
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
      
      <VideoPlayer 
        src={normalizedSrc}
        containerHeight="100%"
        containerWidth="100%"
        autoplay={true}
        muted={true}
        loop={true}
        controls={true}
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
  ])
};

export default HeroVideo;
