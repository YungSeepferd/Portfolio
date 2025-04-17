import React, { useState, useEffect, useCallback } from 'react';
import { Box, useTheme, Skeleton } from '@mui/material';
import { analyzeImage, getOptimalObjectFit } from '../../utils/mediaUtils';
import ImageErrorHandler from './ImageErrorHandler';

/**
 * ContentAwareImage Component
 * 
 * Enhanced image component that analyzes, displays, and gracefully handles errors
 * for images with intelligent object-fit and positioning decisions.
 * 
 * @param {Object} props
 * @param {string} props.src - The image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {Object} props.imageData - Optional pre-analyzed image data
 * @param {string} props.containerHeight - Height for the container
 * @param {string} props.containerWidth - Width for the container
 * @param {string} props.objectFit - Override detected object-fit
 * @param {string} props.objectPosition - CSS object-position value
 * @param {boolean} props.expandOnHover - Whether to zoom image on hover
 * @param {Function} props.onError - Error handler for image loading failure
 * @param {string} props.fallbackSrc - Fallback image to use on error
 * @param {string} props.containerOrientation - Force container orientation
 * @param {Object} props.sx - Additional styles for container
 */
const ContentAwareImage = ({
  src,
  alt = "Image",
  imageData = null,
  containerHeight = "100%",
  containerWidth = "100%",
  objectFit = null,
  objectPosition = "center center",
  expandOnHover = false,
  onError,
  fallbackSrc,
  containerOrientation = "auto",
  sx = {},
  ...otherProps
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedImageData, setProcessedImageData] = useState(imageData);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Clamp maxRetries to 5 to prevent excessive retries
  const effectiveMaxRetries = Math.min(maxRetries, 5);

  // Process image dimensions and aspects if not already provided
  useEffect(() => {
    if (!processedImageData && src && !error) {
      try {
        const data = analyzeImage(src);
        setProcessedImageData(data);
      } catch (err) {
        console.error("Error analyzing image:", err);
        setError({
          message: "Failed to analyze image dimensions",
          error: err
        });
        
        // Call external error handler if provided
        if (onError) {
          onError(err);
        }
      }
    }
  }, [src, processedImageData, error, onError]);

  // Determine best object-fit value based on image and container
  const determinedObjectFit = objectFit || 
    (processedImageData ? getOptimalObjectFit(processedImageData, containerOrientation) : 'cover');

  // Handle image load success
  const handleImageLoad = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  // Handle image load error with retry logic
  const handleImageError = useCallback((e) => {
    console.error(`Error loading image: ${src}`, e);
    if (retryCount < effectiveMaxRetries) {
      // Try loading again after a delay
      setTimeout(() => {
        setRetryCount(prevCount => prevCount + 1);
        // Force image reload by adding timestamp to src
        const img = e.target;
        if (img) {
          const cacheBuster = `?cb=${Date.now()}`;
          img.src = src.includes('?') ? `${src}&cb=${Date.now()}` : `${src}${cacheBuster}`;
        }
      }, 1000);
    } else {
      // Max retries reached, show error
      setLoading(false);
      setError({
        message: `Failed to load image after ${effectiveMaxRetries} attempts`,
        source: src
      });
      // Call external error handler if provided
      if (onError) {
        onError(e);
      }
    }
  }, [src, retryCount, effectiveMaxRetries, onError]);

  // Reset state when source changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    setRetryCount(0);
    setProcessedImageData(null);
  }, [src]);

  // Handle manual retry from error handler
  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    setRetryCount(0);
    // Force re-render and reload
    setProcessedImageData(null);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: containerHeight,
        width: containerWidth,
        borderRadius: theme.shape.borderRadius,
        ...sx,
      }}
    >
      {/* Skeleton loader shown while loading */}
      {loading && !error && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
            borderRadius: theme.shape.borderRadius,
          }}
        />
      )}

      {/* Show error handler when there's an error */}
      {error && (
        <ImageErrorHandler
          src={src}
          alt={alt}
          fallbackSrc={fallbackSrc}
          onRetry={handleRetry}
          errorMessage={error.message || "Failed to load image"}
          errorDetails={error}
        />
      )}

      {/* Image element (hidden while loading or on error) */}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        sx={{
          display: error ? 'none' : 'block',
          width: "100%",
          height: "100%",
          objectFit: determinedObjectFit,
          objectPosition: objectPosition,
          transition: "transform 0.3s ease",
          borderRadius: theme.shape.borderRadius,
          ...(expandOnHover && {
            "&:hover": {
              transform: "scale(1.05)",
            },
          }),
        }}
        {...otherProps}
      />
    </Box>
  );
};

export default ContentAwareImage;
