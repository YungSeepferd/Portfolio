import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Typography, useTheme, IconButton, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
// Import consolidated utilities
import { analyzeImage, getOptimalObjectFit } from '../../utils/mediaUtils';

/**
 * SmartImage Component
 *
 * Combines lazy loading with content-aware fitting.
 */
export const SmartImage = ({
  src,
  alt = '',
  style = {},
  sx = {},
  onLoad = () => {},
  onError = () => {},
  placeholderColor,
  containerHeight = '100%',
  containerWidth = '100%',
  objectFit = null,
  containerOrientation = 'landscape',
  fallbackSrc = null,
  expandOnHover = false,
  imageData = null,
  intersectionThreshold = 0.1,
  ...props
}) => {
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  const finalPlaceholderColor = placeholderColor || theme.palette.action.hover;

  const [ref, isVisible] = useIntersectionObserver({
    threshold: intersectionThreshold,
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }
    setIsLoaded(false);
    setHasError(false);
    setRetryCount(0);
    setCurrentSrc(src);

    try {
      const processedImage = imageData || analyzeImage(src);
      setImageDetails(processedImage);
    } catch (err) {
      console.error("Error analyzing image:", src, err);
      setHasError(true);
    }
  }, [src, imageData]);

  const handleImageLoad = useCallback((e) => {
    const img = e.target;
    if (imageDetails && imageDetails.orientation === 'unknown' && img.naturalWidth && img.naturalHeight) {
      const isVertical = img.naturalHeight > img.naturalWidth;
      setImageDetails(prev => ({
        ...prev,
        orientation: isVertical ? 'portrait' : 'landscape',
        aspectRatio: img.naturalWidth / img.naturalHeight
      }));
    }
    setIsLoaded(true);
    setHasError(false);
    onLoad(e);
  }, [imageDetails, onLoad]);

  const handleImageError = useCallback((e) => {
    console.error(`Failed to load image (attempt ${retryCount + 1}):`, currentSrc);
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setTimeout(() => setCurrentSrc(`${src}?retry=${retryCount + 1}`), 1000 * (retryCount + 1));
    } else {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        console.log("Attempting fallback image:", fallbackSrc);
        setCurrentSrc(fallbackSrc);
        setRetryCount(0);
      } else {
        setHasError(true);
        onError(e);
      }
    }
  }, [retryCount, currentSrc, src, fallbackSrc, onError]);

  useEffect(() => {
    if (!isVisible || isLoaded || hasError || !currentSrc) return;

    const img = new Image();
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    img.src = currentSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isVisible, currentSrc, isLoaded, hasError, handleImageLoad, handleImageError]);

  const finalObjectFit = useMemo(() => {
    if (objectFit) return objectFit;
    if (imageDetails && imageDetails.orientation !== 'unknown') {
      return getOptimalObjectFit(imageDetails, containerOrientation);
    }
    return 'cover';
  }, [objectFit, imageDetails, containerOrientation]);

  const imageAlt = alt || imageDetails?.alt || 'Image';

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hasError ? theme.palette.action.disabledBackground : finalPlaceholderColor,
        ...sx,
      }}
      {...props}
    >
      {!isLoaded && !hasError && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ backgroundColor: 'transparent' }}
        />
      )}

      {hasError && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: theme.spacing(1),
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Image unavailable
          </Typography>
        </Box>
      )}

      {(isVisible || isLoaded) && !hasError && (
        <Box
          component="img"
          src={currentSrc}
          alt={imageAlt}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: finalObjectFit,
            objectPosition: 'center',
            opacity: isLoaded ? 1 : 0,
            transition: theme.transitions.create(['opacity', 'transform'], {
                duration: theme.transitions.duration.short,
            }),
            transform: expandOnHover ? 'scale(1)' : undefined,
            '&:hover': expandOnHover ? { transform: 'scale(1.05)' } : undefined,
            ...style,
          }}
        />
      )}
    </Box>
  );
};

SmartImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
  sx: PropTypes.object,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  placeholderColor: PropTypes.string,
  containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  objectFit: PropTypes.string,
  containerOrientation: PropTypes.oneOf(['landscape', 'portrait', 'square']),
  fallbackSrc: PropTypes.string,
  expandOnHover: PropTypes.bool,
  imageData: PropTypes.object,
  intersectionThreshold: PropTypes.number,
};


/**
 * VideoPlayer Component
 *
 * Custom video player with controls.
 */
export const VideoPlayer = ({
  src,
  containerWidth = '100%',
  containerHeight = '100%',
  autoplay = false,
  muted = true,
  controls = true,
  loop = true,
  onLoad = () => {},
  sx = {},
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
        overflow: 'hidden', // Ensure controls don't overflow
        borderRadius: (theme) => theme.shape.borderRadius, // Apply border radius
        backgroundColor: 'black', // Background for letterboxing
        ...sx
      }}
      {...props}
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
            backgroundColor: 'rgba(0,0,0,0.5)',
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
        muted={isMuted} // Controlled by state
        loop={loop}
        controls={false} // Disable native controls
        playsInline
        onLoadedData={handleLoadedData}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain', // Contain to avoid cropping
          display: 'block'
        }}
      />

      {controls && !isLoading && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '8px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
            opacity: 0.8,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            }
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

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
  onLoad: PropTypes.func,
  sx: PropTypes.object,
};
