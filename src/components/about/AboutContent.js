import React, { useState } from 'react';
import { Box, Typography, useTheme, Paper, IconButton } from '@mui/material';
import { FullscreenOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import { analyzeImage } from '../../utils/imageAnalyzer';

/**
 * WallCard Component
 * 
 * A versatile card component used in About section with multiple variants:
 * - Default: Standard bordered card with shadow
 * - noBorder: Card without border but with background color and shadow
 * - transparent: Completely borderless and transparent background
 * 
 * Features:
 * - Optional expandable image
 * - Responsive layout that changes based on screen size
 * - Customizable image position (left/right)
 * - Motion animations on hover
 */
const WallCard = ({
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
  
  // Determine styling based on variant
  const isTransparent = variant === "transparent";
  const hasBorder = variant !== "noBorder" && !isTransparent;
  const hasBackground = !isTransparent;
  
  // Process image info to detect orientation
  const imageData = React.useMemo(() => {
    return image ? analyzeImage(image) : null;
  }, [image]);
  
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

  return (
    <CardComponent
      {...motionProps}
      variant={isTransparent ? undefined : "bigCard"}
      onClick={onClick}
      sx={{
        ...sx,
        width: '100%',
        border: hasBorder ? `1px solid ${theme.palette.structure.borders}` : 'none',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: hasBackground ? theme.palette.background.paper : 'transparent',
        boxShadow: isTransparent ? 'none' : undefined,
      }}
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: imagePosition === 'right' ? 'row-reverse' : 'row',
          },
          minHeight: expanded ? '80vh' : theme.customSizes.bigCardHeight,
          height: 'auto',
          transition: theme.transitions.create('min-height'),
        }}
      >
        {/* Image Container */}
        {image && (
          <Box
            sx={{
              position: 'relative',
              flex: {
                xs: 'none',
                md: expanded ? '0 0 60%' : `0 0 ${theme.customSizes.bigCardImageWidth}`,
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
              alt={title || "Project image"}
              expandOnHover={true}
              containerOrientation={imagePosition === "right" ? "portrait" : "landscape"}
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
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            >
              {title}
            </Typography>
          )}
          <Box component="div">
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

export default React.memo(WallCard);
