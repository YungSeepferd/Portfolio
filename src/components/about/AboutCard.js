import React, { useState } from 'react';
import { Box, Typography, useTheme, Paper, IconButton } from '@mui/material';
import { FullscreenOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import { analyzeImage } from '../../utils/mediaUtils';

/**
 * AboutCard Component
 * 
 * A versatile card component used in About section with multiple variants:
 * - Default: Standard bordered card with shadow
 * - noBorder: Card without border but with background color and shadow
 * - transparent: Completely borderless and transparent background
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title] - Optional card title
 * @param {string|Object} [props.image] - Optional image source or image object
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.variant="body2"] - Card variant affecting styling
 * @param {Object} [props.sx] - Additional MUI styles
 * @param {boolean} [props.expandable=false] - Whether image can be expanded
 * @param {string} [props.imageOverlayColor] - Optional color overlay for image
 * @param {string} [props.imagePosition="left"] - Position of the image
 * @param {Function} [props.onClick] - Click handler for the card
 */
const AboutCard = ({
  title,
  image,
  children,
  variant = "body2",
  sx,
  expandable = false,
  imageOverlayColor,
  imagePosition = "left",
  onClick,
  ...props
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Determine styling based on variant
  const isTransparent = variant === "transparent";
  const hasBorder = variant !== "noBorder" && !isTransparent;
  const hasBackground = !isTransparent;
  
  // Use theme.palette.divider directly
  const borderColor = theme.palette.divider || 'rgba(0, 0, 0, 0.12)';
  
  // Process image info to detect orientation
  const imageData = React.useMemo(() => {
    // Skip processing if there's no image or if we already know there's an error
    if (!image || imageError) return null;
    try {
      return analyzeImage(image);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setImageError(true);
      return null;
    }
  }, [image, imageError]);
  
  // Determine component to use based on variant
  const CardComponent = isTransparent ? Box : Paper;
  
  // Only apply motion effects for non-transparent cards
  const motionProps = isTransparent ? {} : {
    component: motion.div,
    whileHover: {
      y: theme.customEffects?.cardHover?.y || -5,
      boxShadow: theme.customEffects?.cardHover?.boxShadow || theme.shadows[4],
    },
    transition: { type: "tween", duration: 0.2 }
  };

  // Handle image error
  const handleImageError = () => {
    console.error('Failed to load image:', image);
    setImageError(true);
  };

  return (
    <CardComponent
      {...motionProps}
      variant={isTransparent ? undefined : "outlined"}
      elevation={0}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={title ? `About card: ${title}` : "About card"}
      id={`about-card-root${title ? '-' + title.toLowerCase().replace(/\s+/g, '-') : ''}`}
      sx={{
        ...sx,
        width: '100%',
        border: hasBorder ? `1px solid ${borderColor}` : 'none',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: hasBackground ? theme.palette.background.paper : 'transparent',
        boxShadow: isTransparent ? 'none' : undefined,
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
        } : undefined,
      }}
      {...props}
    >
      <Box
        id={`about-card-layout${title ? '-' + title.toLowerCase().replace(/\s+/g, '-') : ''}`}
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: imagePosition === 'right' ? 'row-reverse' : 'row',
          },
          minHeight: expanded ? '80vh' : theme.customSizes?.bigCardHeight,
          height: 'auto',
          transition: theme.transitions.create('min-height'),
        }}
      >
        {/* Image Container */}
        {image && !imageError && (
          <Box
            id={`about-card-image-container${title ? '-' + title.toLowerCase().replace(/\s+/g, '-') : ''}`}
            sx={{
              position: 'relative',
              flex: {
                xs: 'none',
                md: expanded ? '0 0 60%' : `0 0 ${theme.customSizes?.bigCardImageWidth || '40%'}`,
              },
              width: { xs: '100%', md: 'auto' },
              height: { xs: expanded ? 300 : 200, md: '100%' },
              overflow: 'hidden',
              transition: theme.transitions.create(['flex', 'height']),
              borderRadius: theme.shape.borderRadius,
            }}
          >
            <ContentAwareImage
              imageData={imageData}
              src={typeof image === 'string' ? image : image?.src}
              alt={title || "About image"}
              expandOnHover={true}
              onError={handleImageError}
              containerOrientation={imagePosition === "right" ? "portrait" : "landscape"}
              sx={{ borderRadius: theme.shape.borderRadius }}
            />
            
            {imageOverlayColor && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: imageOverlayColor,
                  opacity: 0.2,
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
            )}
            
            {expandable && (
              <IconButton
                aria-label={expanded ? "Collapse image" : "Expand image"}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  zIndex: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  },
                }}
              >
                <FullscreenOutlined />
              </IconButton>
            )}
          </Box>
        )}
        
        {/* Content Container */}
        <Box
          id={`about-card-content-container${title ? '-' + title.toLowerCase().replace(/\s+/g, '-') : ''}`}
          sx={{
            flex: 1,
            p: isTransparent ? theme.spacing(3, 0) : theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
          {title && (
            <Typography
              variant="h4"
              gutterBottom
              id={`about-card-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            >
              {title}
            </Typography>
          )}
          <Box component="div" role="region" aria-labelledby={title ? `about-card-title-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}>
            {React.isValidElement(children) ? children : (
              <Typography variant={variant === "transparent" ? "body1" : variant}>
                {children}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </CardComponent>
  );
};

export default React.memo(AboutCard);
