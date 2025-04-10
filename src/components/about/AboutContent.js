import React, { useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ContentAwareImage from '../common/ContentAwareImage';
import AboutCard from './AboutCard';  // Updated to use AboutCard instead of WallCard

/**
 * AboutContent Component
 * 
 * Displays content for the About section with support for
 * expandable sections, images, and consistent styling.
 * 
 * Features:
 * - Expandable image sections
 * - Responsive layout
 * - Customizable styling based on theme
 * - Content formatting with typography components
 */
const AboutContent = ({ 
  title, 
  children, 
  image, 
  imagePosition = "left",
  expandable = false,
  imageData,
  imageOverlayColor,
  variant = "default",
  onClick,
  hasBackground = true,
  hasBorder = true,
  isTransparent = false,
  sx = {},
  ...props 
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  
  const handleExpandToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  return (
    <AboutCard 
      variant={variant}
      onClick={onClick}
      hasBackground={hasBackground}
      hasBorder={hasBorder}
      isTransparent={isTransparent}
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
                onClick={handleExpandToggle}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  },
                }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Box>
        )}
        
        {/* Content */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {title && (
            <Typography
              variant="h5"
              component="h3"
              sx={{ 
                mb: 2,
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              {title}
            </Typography>
          )}
          
          <Box>{children}</Box>
        </Box>
      </Box>
    </AboutCard>
  );
};

export default AboutContent;
