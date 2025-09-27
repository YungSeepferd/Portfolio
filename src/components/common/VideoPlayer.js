import React, { useState, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

/**
 * Custom video player component with controls
 * Uses non-button elements for controls to avoid nesting issues with CardActionArea
 */
const VideoPlayer = ({ 
  src, 
  containerWidth = '100%',
  containerHeight = '100%',
  autoplay = false,
  muted = true,
  controls = true,
  loop = true,
  onLoad = () => {},
  ...props 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);
  
  const handlePlayPause = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to parent
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMute = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to parent
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);
  
  const handleLoadedData = (e) => {
    setIsLoading(false);
    onLoad(e);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        bgcolor: 'background.paper'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 1
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}
      
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={false} 
        playsInline
        onLoadedData={handleLoadedData}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
        {...props}
      />
      
      {controls && !isLoading && showControls && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '8px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 2
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching CardActionArea
        >
          <Box
            role="button"
            tabIndex={0}
            onClick={handlePlayPause}
            onKeyPress={(e) => e.key === 'Enter' && handlePlayPause(e)}
            sx={{ 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
              borderRadius: '4px',
              transition: 'background-color 0.2s',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </Box>
          
          <Box
            role="button"
            tabIndex={0}
            onClick={handleMute}
            onKeyPress={(e) => e.key === 'Enter' && handleMute(e)}
            sx={{ 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
              borderRadius: '4px',
              transition: 'background-color 0.2s',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
