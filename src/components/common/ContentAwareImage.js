import React, { useState, useEffect } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { analyzeImage, getOptimalObjectFit } from '../../utils/imageAnalyzer';

/**
 * ContentAwareImage
 * 
 * A smart image component that handles different image orientations and types.
 * - Analyzes image dimensions and sets appropriate object-fit properties
 * - Handles loading states with skeleton placeholders
 * - Manages error states with fallback images
 * 
 * @param {string} src - Image URL
 * @param {string} alt - Alt text for accessibility
 * @param {object} imageData - Optional pre-processed image data
 * @param {string} containerHeight - Height of the container
 * @param {string} containerWidth - Width of the container
 * @param {boolean} expandOnHover - Whether the image expands on hover
 * @param {string} objectFit - Explicit object-fit property
 * @param {string} containerOrientation - Orientation of the container
 * @param {function} onLoad - Callback function for image load event
 * @param {function} onError - Callback function for image error event
 * @param {string} fallbackSrc - Fallback image source if primary fails
 * @param {object} props - Additional props
 */
const ContentAwareImage = ({ 
  src, 
  alt = '',
  imageData = null, // Allow passing pre-processed image data
  containerHeight = '100%',
  containerWidth = '100%',
  expandOnHover = false,
  objectFit = null, // Allow explicit override
  containerOrientation = 'landscape',
  onLoad = () => {},
  onError = () => {},
  fallbackSrc = null,
  ...props
}) => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  
  // Process image data on component mount or when src changes
  useEffect(() => {
    // Reset states when src changes
    setLoaded(false);
    setError(false);
    setRetryCount(0);
    
    // Use provided imageData if available, otherwise analyze from src
    try {
      const processedImage = imageData || analyzeImage(src);
      setImageDetails(processedImage);
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError(true);
    }
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
      setError(false);
      onLoad(e);
    } catch (err) {
      console.error("Error in image load handler:", err);
      setError(true);
    }
  };
  
  // Handle image loading errors with retry mechanism
  const handleError = (e) => {
    if (retryCount < maxRetries) {
      // Retry loading the image after a short delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Force reload by adding a cache-busting parameter
        e.target.src = `${imageSrc}?retry=${retryCount + 1}`;
      }, 1000);
    } else {
      console.error("Failed to load image after retries:", src);
      setError(true);
      
      // Use fallback image if provided, otherwise use theme default
      if (fallbackSrc) {
        e.target.src = fallbackSrc;
      } else if (theme.customDefaults?.placeholderImage) {
        e.target.src = theme.customDefaults.placeholderImage;
      } else {
        // If no fallback is available, show the error state
        e.target.style.display = 'none';
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
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {!loaded && !error && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave"
        />
      )}
      
      {error && !loaded && (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: theme.spacing(2),
            backgroundColor: 'rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            Image could not be loaded
          </Typography>
        </Box>
      )}
      
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
          display: error && !loaded ? 'none' : 'block',
          ...(expandOnHover && {
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }),
          ...props.sx
        }}
      />
    </Box>
  );
};

export default ContentAwareImage;
