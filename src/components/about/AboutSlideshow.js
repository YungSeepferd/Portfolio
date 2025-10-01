import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Handle image loading for current image
  const handleImageLoad = useCallback(() => {
    setLoaded(true);
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
        // Fixed height for consistent layout across all tabs
        height: { xs: 260, sm: 320, md: 380 },
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
      
      <AnimatePresence mode="wait">
        <Box component={motion.div}
          key={`motion-${current}`}
          initial={{ opacity: 0, y: 8, scale: 0.995 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 8, scale: loaded ? 1 : 0.995 }}
          exit={{ opacity: 0, y: -6, scale: 0.995 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          sx={{ width: '100%', height: '100%' }}
        >
          <Box
            component="img"
            src={getCurrentImageSrc(currentImage)}
            alt={`About section content ${current + 1}`}
            onLoad={handleImageLoad}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: (typeof currentImage === 'object' && currentImage?.objectFit) || 'cover',
              objectPosition: getCurrentImagePosition(currentImage),
              display: 'block',
            }}
          />
        </Box>
      </AnimatePresence>

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
  ), [current, defaultPics, loaded, theme, handleImageLoad, getCurrentImageSrc, getCurrentImagePosition, currentImage]);

  return imageDisplay;
});

// Set display name for React DevTools
AboutSlideshow.displayName = 'AboutSlideshow';

export default AboutSlideshow;
