import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Skeleton } from '@mui/material';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

/**
 * LazyImage component that loads images only when they're in viewport
 * with smart retry logic to prevent excessive loading attempts
 */
const LazyImage = ({ 
  src, 
  alt = '', 
  style = {}, 
  onLoad = () => {}, 
  onError = () => {}, 
  placeholderColor = 'rgba(0, 0, 0, 0.11)',
  maxRetries = 3, // Default to 3 retries
  retryDelay = 3000, // 3 seconds between retries
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [permanentError, setPermanentError] = useState(false);
  const retryTimeoutRef = useRef(null);
  
  // Use our enhanced hook with freezeOnceVisible set to true
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  // Clamp maxRetries to 5 to prevent excessive retries
  const effectiveMaxRetries = Math.min(maxRetries, 5);

  // Fix: Wrap handleError in useCallback to prevent recreating it on every render
  const handleError = useCallback((e) => {
    console.error(`Image failed to load: ${src}`);
    setPermanentError(true);
    if (onError) {
      onError(e);
    }
  }, [src, onError]);

  // Start loading the image when it becomes visible
  useEffect(() => {
    if (!isVisible || isLoaded || permanentError) return;
    
    // Clear any existing retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setRetryCount(0);
      onLoad();
    };
    
    img.onerror = (e) => {
      // Implement retry logic with progressive backoff
      if (retryCount < effectiveMaxRetries) {
        console.log(`Retry ${retryCount + 1}/${effectiveMaxRetries} for image: ${src}`);
        
        // Increase delay progressively
        const progressiveDelay = retryDelay * (1 + (retryCount * 0.5));
        
        retryTimeoutRef.current = setTimeout(() => {
          setRetryCount(prev => prev + 1);
          // Reload with a cache-busting parameter
          img.src = `${src}?retry=${retryCount + 1}&time=${Date.now()}`;
        }, progressiveDelay);
      } else {
        // Max retries reached
        console.error(`Error loading image: ${src}`);
        handleError(e);
      }
    };
    
    img.src = src;
    
    // If the image is already cached, onload might not fire
    if (img.complete) {
      setIsLoaded(true);
      onLoad();
    }
    
    // Cleanup on unmount or when dependencies change
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [src, isVisible, onLoad, isLoaded, retryCount, retryDelay, effectiveMaxRetries, permanentError, handleError]);
  
  return (
    <Box 
      ref={ref}
      sx={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {(!isLoaded && !permanentError) && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation={permanentError ? false : "wave"}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: placeholderColor,
          }} 
        />
      )}
      
      {(isVisible && !permanentError) && (
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
      
      {permanentError && (
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
          Image unavailable
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;
