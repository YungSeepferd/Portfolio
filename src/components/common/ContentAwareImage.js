import React, { useState, useEffect, useRef } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { analyzeImage, getOptimalObjectFit } from '../../utils/mediaUtils';

/**
 * ContentAwareImage
 * 
 * A smart image component that handles different image orientations and types.
 * - Analyzes image dimensions and sets appropriate object-fit properties
 * - Handles loading states with skeleton placeholders
 * - Manages error states with fallback images
 * - Implements smart retry logic with backoff to prevent excessive retries
 */
const ContentAwareImage = ({ 
  src, 
  alt = '',
  imageData = null,
  containerHeight = '100%',
  containerWidth = '100%',
  expandOnHover = false,
  objectFit = null,
  containerOrientation = 'landscape',
  onLoad = () => {},
  onError = () => {},
  fallbackSrc = null,
  maxRetries = 3, // Default max retries (can be increased to 10 from props)
  retryDelay = 3000, // 3 seconds between retries
  ...props
}) => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [permanentError, setPermanentError] = useState(false);
  const retryTimeoutRef = useRef(null);
  
  // Process image data on component mount or when src changes
  useEffect(() => {
    // Clear any existing retry timeout when src changes
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    // Reset states when src changes
    setLoaded(false);
    setRetryCount(0);
    setPermanentError(false);
    
    // Use provided imageData if available, otherwise analyze from src
    try {
      const processedImage = imageData || analyzeImage(src);
      setImageDetails(processedImage);
    } catch (err) {
      console.error("Error analyzing image:", err);
      setPermanentError(true); // Use permanentError instead
    }
    
    // Cleanup function
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [src, imageData]);
  
  // Handle image loading and additional orientation detection
  const handleLoad = (e) => {
    try {
      const img = e.target;
      
      // Update orientation based on actual dimensions if not already determined
      if (imageDetails && imageDetails.orientation === 'unknown' && img.naturalWidth && img.naturalHeight) {
        const isVertical = img.naturalHeight > img.naturalWidth;
        setImageDetails({
          ...imageDetails,
          orientation: isVertical ? 'portrait' : 'landscape',
          aspectRatio: img.naturalWidth / img.naturalHeight
        });
      }
      
      setLoaded(true);
      setRetryCount(0); // Reset retry count on successful load
      onLoad(e);
    } catch (err) {
      console.error("Error in image load handler:", err);
      setPermanentError(true); // Use permanentError instead
    }
  };
  
  // Handle image loading errors with improved retry mechanism
  const handleError = (e) => {
    setLoaded(false);
    
    // If we're not at maximum retries yet, schedule another attempt
    if (retryCount < maxRetries) {
      console.log(`Retry ${retryCount + 1}/${maxRetries} for image: ${src}`);
      
      // Clear any existing retry timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      // Schedule next retry with progressive backoff
      const progressiveDelay = retryDelay * (1 + (retryCount * 0.5)); // Increase delay progressively
      
      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Force reload by adding a cache-busting parameter
        if (e.target) {
          e.target.src = `${imageSrc}?retry=${retryCount + 1}&time=${Date.now()}`;
        }
      }, progressiveDelay);
    } else {
      console.error(`Failed to load image after ${maxRetries} retries:`, src);
      setPermanentError(true);
      
      // Try fallback image if provided
      if (fallbackSrc && e.target) {
        e.target.src = fallbackSrc;
        e.target.onload = () => {
          setLoaded(true);
        };
      } else if (theme.customDefaults?.placeholderImage && e.target) {
        e.target.src = theme.customDefaults.placeholderImage;
        e.target.onload = () => {
          setLoaded(true);
        };
      }
      
      onError(e);
    }
  };
  
  // Determine the best object-fit property
  const determineObjectFit = () => {
    // If explicitly specified, use that
    if (objectFit) return objectFit;
    
    // If we have image details, compute optimal fit
    if (imageDetails && imageDetails.orientation !== 'unknown') {
      return getOptimalObjectFit(imageDetails, containerOrientation);
    }
    
    // Default fallback behavior
    return 'cover';
  };
  
  const imageSrc = imageDetails?.src || src;
  const imageAlt = alt || imageDetails?.alt || 'Image';
  const finalObjectFit = determineObjectFit();
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius, // This will use the updated value
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {!loaded && !permanentError && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation={permanentError ? false : "wave"}
        />
      )}
      
      {permanentError && (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: theme.spacing(2),
            backgroundColor: 'rgba(0,0,0,0.05)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Image unavailable
          </Typography>
        </Box>
      )}
      
      {!permanentError && (
        <Box
          component="img"
          src={imageSrc}
          alt={imageAlt}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: finalObjectFit,
            objectPosition: 'center',
            transition: theme.transitions.create(['transform', 'opacity']),
            opacity: loaded ? 1 : 0,
            display: permanentError ? 'none' : 'block',
            ...(expandOnHover && {
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }),
            ...props.sx
          }}
        />
      )}
    </Box>
  );
};

export default ContentAwareImage;
