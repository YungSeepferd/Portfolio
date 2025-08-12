import React, { useState, useRef } from 'react';
import { Box, IconButton, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

/**
 * Custom video player component with controls
 * Enhanced to show controls only when hovering over the video
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
  showOverlayControls = true, // Controls overlay toggle
  priority = false, // For prioritized loading
  poster = null, // Optional poster image
  ...props
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
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

  // Mouse enter/leave handlers for hover controls
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
        borderRadius: (theme) => theme.shape.borderRadius,
        '&:hover .video-controls': {
          opacity: 1,
        },
        ...props.sx,
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
            zIndex: 1,
          }}
        >
          <CircularProgress size={40} aria-label="Loading video" />
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
        poster={poster}
        onClick={handlePlayPause} // Click to play/pause
        preload={priority ? 'auto' : 'metadata'}
        onLoadedData={handleLoadedData}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          cursor: 'pointer', // Show pointer cursor to indicate interactivity
        }}
      />

      {/* Play/Pause central button - shows briefly when state changes or on hover */}
      {!isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '50px',
            opacity: isHovering ? 0.8 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2,
            cursor: 'pointer',
          }}
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <PauseIcon sx={{ color: 'white', fontSize: '30px' }} />
          ) : (
            <PlayArrowIcon sx={{ color: 'white', fontSize: '30px' }} />
          )}
        </Box>
      )}

      {/* Bottom controls bar - only visible on hover */}
      {controls && showOverlayControls && !isLoading && (
        <Box
          className="video-controls"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '8px 12px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.3s ease',
            backdropFilter: 'blur(4px)',
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
