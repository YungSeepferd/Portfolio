import React, { useState, useRef } from 'react';
import { Box, IconButton, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

/**
 * Custom video player component with controls
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
  showOverlayControls = true, // NEW: controls overlay toggle
  ...props 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
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
        ...props.sx
      }}
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
      />
      
      {controls && showOverlayControls && !isLoading && (
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
        >
          <IconButton size="small" onClick={handlePlayPause} sx={{ color: 'white' }}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          
          <IconButton size="small" onClick={handleMute} sx={{ color: 'white' }}>
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default VideoPlayer;
