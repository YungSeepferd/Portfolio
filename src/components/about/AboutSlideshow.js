import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, CircularProgress, Fade, useTheme } from '@mui/material';

/**
 * AboutSlideshow Component
 * 
 * Displays a rotating slideshow of images with loading indicators,
 * navigation dots, and accessibility features.
 * 
 * @component
 * @param {Object} props
 * @param {Array} props.pictures - Array of image URLs or image objects with positioning data
 * @returns {JSX.Element} Slideshow component
 */
const AboutSlideshow = React.memo(({ pictures }) => {
  const theme = useTheme();
  // Properly memoize defaultPics to prevent re-renders
  const defaultPics = useMemo(() => {
    return pictures && pictures.length > 0 ? pictures : ['https://via.placeholder.com/300'];
  }, [pictures]);
  
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [aspectRatioValue, setAspectRatioValue] = useState(null);
  const [aspectRatioNumeric, setAspectRatioNumeric] = useState(null);

  // Handle image loading for current image
  const handleImageLoad = useCallback((event) => {
    setLoaded(true);

    if (!event?.target) return;
    const { naturalWidth, naturalHeight } = event.target;
    if (naturalWidth && naturalHeight) {
      setAspectRatioValue(`${naturalWidth} / ${naturalHeight}`);
      setAspectRatioNumeric(naturalWidth / naturalHeight);
    }
  }, []);

  // Helper function to get image source from either string or object format
  const getCurrentImageSrc = useCallback((image) => {
    return typeof image === 'string' ? image : image?.src || image;
  }, []);

  // Helper function to get image positioning from image object if available
  const getCurrentImagePosition = useCallback((image) => {
    // If image is an object with position data, use it
    if (typeof image === 'object' && image.position) {
      return image.position;
    }
    
    // Special case for the WhoAmI tab first image - focus on the bottom part
    const imageSrc = getCurrentImageSrc(image);
    if (imageSrc && imageSrc.includes('Salzburg.jpg')) {
      return 'center bottom 30%'; // Ensure we show more of the bottom portion
    }
    
    // Default position
    return 'center center';
  }, [getCurrentImageSrc]);

  useEffect(() => {
    // If already loaded this image, keep loaded state
    if (loadedImages[getCurrentImageSrc(defaultPics[current])]) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }

    // If there is only one image, do not auto-cycle
    if (!defaultPics || defaultPics.length <= 1) {
      return;
    }

    // Set timer for next image
    const timer = setTimeout(() => {
      // Mark this image as loaded for future reference
      setLoadedImages(prev => ({
        ...prev,
        [getCurrentImageSrc(defaultPics[current])]: true
      }));
      
      setCurrent(prev => (prev + 1) % defaultPics.length);
    }, 5000); // 5 seconds per slide

    // Cleanup timer on unmount or dependencies change
    return () => clearTimeout(timer);
  }, [current, defaultPics, loadedImages, getCurrentImageSrc]);

  // UseMemo for image JSX to prevent unnecessary re-renders
  const currentImage = useMemo(() => {
    return defaultPics[current];
  }, [current, defaultPics]);

  useEffect(() => {
    if (!currentImage || typeof currentImage !== 'object') {
      setAspectRatioValue(null);
      setAspectRatioNumeric(null);
      return;
    }

    if (currentImage.aspectRatioValue) {
      setAspectRatioValue(currentImage.aspectRatioValue);
    } else if (currentImage.width && currentImage.height) {
      setAspectRatioValue(`${currentImage.width} / ${currentImage.height}`);
    } else if (typeof currentImage.aspectRatio === 'string') {
      setAspectRatioValue(currentImage.aspectRatio);
    } else if (typeof currentImage.aspectRatio === 'number') {
      setAspectRatioValue(currentImage.aspectRatio.toString());
    } else {
      setAspectRatioValue(null);
    }

    if (typeof currentImage.aspectRatio === 'number') {
      setAspectRatioNumeric(currentImage.aspectRatio);
    } else if (currentImage.width && currentImage.height) {
      setAspectRatioNumeric(currentImage.width / currentImage.height);
    } else {
      setAspectRatioNumeric(null);
    }
  }, [currentImage]);

  const resolvedAspectRatio = useMemo(() => {
    if (aspectRatioValue) return aspectRatioValue;
    if (aspectRatioNumeric) return aspectRatioNumeric;
    return null;
  }, [aspectRatioValue, aspectRatioNumeric]);

  const imageDisplay = useMemo(() => (
    <Box 
      aria-label="About section slideshow"
      role="img"
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: resolvedAspectRatio || { xs: '4 / 3', sm: '16 / 9' },
        minHeight: resolvedAspectRatio ? { xs: 260, sm: 320 } : { xs: 240, sm: 300 },
        maxHeight: resolvedAspectRatio ? { xs: 500, sm: 540, md: 640 } : { xs: 360, sm: 420, md: 460 },
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
      }}
    >
      {!loaded && (
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
            backgroundColor: 'rgba(0,0,0,0.04)',
          }}
        >
          <CircularProgress 
            size={40} 
            thickness={4} 
            aria-label="Loading image"
            color="secondary"
          />
        </Box>
      )}
      
      <Fade in={loaded} timeout={400} key={`fade-${current}`}>
        <Box component="div" sx={{ width: '100%', height: '100%' }}>
          <Box
            component="img"
            src={getCurrentImageSrc(currentImage)}
            alt={`About section content ${current + 1}`} 
            onLoad={handleImageLoad}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: (typeof currentImage === 'object' && currentImage?.objectFit)
                || (aspectRatioNumeric && aspectRatioNumeric < 1 ? 'contain' : 'cover'),
              objectPosition: getCurrentImagePosition(currentImage),
              display: 'block',
            }}
          />
        </Box>
      </Fade>

      {/* Indicator dots - only show if multiple images */}
      {defaultPics.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '8px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            zIndex: 2,
          }}
          role="tablist"
          aria-label="Slideshow indicators"
        >
          {defaultPics.map((_, i) => (
            <Box
              key={i}
              role="tab"
              tabIndex={i === current ? 0 : -1}
              aria-selected={i === current}
              aria-label={`Slide ${i + 1} of ${defaultPics.length}`}
              onClick={() => setCurrent(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrent(i);
                }
              }}
              sx={{
                width: theme.customComponents?.parallax?.dot?.size || '8px',
                height: theme.customComponents?.parallax?.dot?.size || '8px',
                backgroundColor: i === current 
                  ? theme.palette.dots?.active || theme.palette.primary.main 
                  : theme.palette.dots?.inactive || 'rgba(255,255,255,0.3)',
                borderRadius: '50%',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  ), [current, defaultPics, loaded, theme, handleImageLoad, getCurrentImageSrc, getCurrentImagePosition, currentImage, resolvedAspectRatio, aspectRatioNumeric]);

  return imageDisplay;
});

// Set display name for React DevTools
AboutSlideshow.displayName = 'AboutSlideshow';

export default AboutSlideshow;
