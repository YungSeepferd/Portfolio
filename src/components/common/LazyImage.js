import React, { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * LazyImage component that loads images only when they're in viewport
 * and preserves them in the DOM regardless of visibility
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for the image
 * @param {Object} style - Additional styles for the image
 * @param {function} onLoad - Callback for when image loads
 * @param {string} placeholderColor - Background color for the placeholder
 * @returns {JSX.Element} - Lazy-loaded image with skeleton placeholder
 */
const LazyImage = ({ 
  src, 
  alt = '', 
  style = {}, 
  onLoad = () => {}, 
  placeholderColor = 'rgba(0, 0, 0, 0.11)',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  
  // Load the image as soon as the component mounts
  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      onLoad();
    };
    
    img.onerror = () => {
      setError(true);
      console.error(`Failed to load image: ${src}`);
    };
    
    img.src = src;
    
    // If the image is already cached, onload might not fire
    if (img.complete) {
      setIsLoaded(true);
      onLoad();
    }
  }, [src, onLoad]);
  
  return (
    <Box 
      ref={imgRef}
      sx={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {(!isLoaded && !error) && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave"
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: placeholderColor,
          }} 
        />
      )}
      
      {!error && (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            ...style
          }}
          {...props}
        />
      )}
      
      {error && (
        <Box 
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.05)',
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          Image not available
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;
