import React, { useState } from 'react';
import { Box, Typography, Tooltip, IconButton, useTheme } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';

/**
 * ImageErrorHandler Component
 * 
 * Provides specialized error handling for image loading failures
 * with fallback display and retry capability.
 * 
 * @param {Object} props
 * @param {string} props.src - Original image source URL that failed to load
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.fallbackSrc - Optional backup image source to try
 * @param {Function} props.onRetry - Optional callback when retry is clicked
 * @param {Object} props.sx - Additional MUI styling
 * @param {ReactNode} props.icon - Custom error icon
 * @param {boolean} props.showRetry - Whether to show retry button
 * @param {string} props.errorMessage - Custom error message
 */
const ImageErrorHandler = ({
  src,
  alt = 'Image',
  fallbackSrc,
  onRetry,
  sx = {},
  icon,
  showRetry = true,
  errorMessage = 'Failed to load image',
  errorDetails,
  ...props
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();

  // Format error details for display
  const formattedErrorDetails = errorDetails ? 
    (typeof errorDetails === 'object' ? JSON.stringify(errorDetails, null, 2) : errorDetails) :
    `Unable to load image from: ${src}`;

  // Handle retry attempt
  const handleRetry = () => {
    setIsRetrying(true);
    
    // Create a new image object to test loading
    const img = new Image();
    img.onload = () => {
      // If we have a retry callback, execute it
      if (onRetry) {
        onRetry(src);
      }
      setIsRetrying(false);
    };
    
    img.onerror = () => {
      // Still failing, stay in error state
      setIsRetrying(false);
      console.error(`Retry failed for image: ${src}`);
    };
    
    // Try loading the image again
    img.src = src;
  };

  // Toggle error details display
  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '120px',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: 1,
        p: 2,
        textAlign: 'center',
        position: 'relative',
        ...sx
      }}
      {...props}
    >
      {/* If we have a fallbackSrc, render it as background */}
      {fallbackSrc && (
        <Box
          component="img"
          src={fallbackSrc}
          alt={`Fallback for ${alt}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
            filter: 'blur(3px)',
            zIndex: 0,
          }}
        />
      )}
      
      {/* Error icon */}
      {icon || (
        <BrokenImageIcon
          color="action"
          sx={{
            fontSize: '3rem',
            mb: 1,
            zIndex: 1,
          }}
        />
      )}
      
      {/* Error message */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          mb: 1,
          zIndex: 1,
          maxWidth: '80%'
        }}
      >
        {errorMessage}
      </Typography>
      
      {/* Image info and retry buttons */}
      <Box sx={{ 
        display: 'flex', 
        gap: 0.5, 
        mt: 1,
        zIndex: 1,
        '& .MuiIconButton-root': {
          p: 0.5
        }
      }}>
        {/* Info button */}
        <Tooltip title={showDetails ? "Hide details" : "Show details"}>
          <IconButton
            aria-label="Show error details"
            size="small"
            onClick={toggleDetails}
            color="info"
          >
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        {/* Retry button */}
        {showRetry && (
          <Tooltip title="Retry loading image">
            <IconButton
              aria-label="Retry loading image"
              size="small"
              onClick={handleRetry}
              disabled={isRetrying}
              color="primary"
            >
              <RefreshIcon fontSize="small" className={isRetrying ? 'spin' : ''} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      
      {/* Error details (when expanded) */}
      {showDetails && (
        <Box
          sx={{
            mt: 2,
            p: 1,
            borderRadius: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            width: '100%',
            maxWidth: '300px',
            maxHeight: '100px',
            overflow: 'auto',
            textAlign: 'left',
            zIndex: 1,
          }}
        >
          <Typography
            variant="caption"
            component="pre"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.7rem',
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              m: 0
            }}
          >
            {formattedErrorDetails}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageErrorHandler;
