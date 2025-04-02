import React, { useState, useEffect } from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';
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
  ...props
}) => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);
  
  // Process image data on component mount or when src changes
  useEffect(() => {
    // Use provided imageData if available, otherwise analyze from src
    const processedImage = imageData || analyzeImage(src);
    setImageDetails(processedImage);
  }, [src, imageData]);
  
  // Handle image loading and additional orientation detection
  const handleLoad = (e) => {
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
    onLoad(e);
  };
  
  // Handle image loading errors
  const handleError = (e) => {
    console.error("Failed to load image:", src);
    e.target.src = theme.customDefaults?.placeholderImage || '/assets/placeholder.jpg';
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
      {!loaded && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave"
        />
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
