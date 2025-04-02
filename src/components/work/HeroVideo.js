import React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import VideoPlayer from '../common/VideoPlayer';

// FUNCTIONALITY: Displays a hero video at the top of a project page
// ISSUES:
// - Hard-coded height values for different breakpoints
// - No fallback for video loading failure
// - No error handling for invalid video sources
// - Missing proper prop validation

const HeroVideo = ({ videoSrc }) => {
  const theme = useTheme();
  
  if (!videoSrc || (typeof videoSrc !== 'string' && !videoSrc.src)) {
    console.error('Invalid video source provided.');
    return null;
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
        overflow: 'hidden'
      }}
    >
      <VideoPlayer 
        src={typeof videoSrc === 'string' ? videoSrc : videoSrc.src}
        containerHeight="100%"
        containerWidth="100%"
        autoplay={true}
        muted={true}
        loop={true}
        controls={true}
        onError={() => console.error('Failed to load video.')}
      />
    </Box>
  );
};

HeroVideo.propTypes = {
  videoSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      src: PropTypes.string.isRequired
    })
  ]).isRequired
};

export default HeroVideo;
