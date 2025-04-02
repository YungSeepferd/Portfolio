import React, { useState } from 'react';
import { Box, Typography, useTheme, Paper, IconButton } from '@mui/material';
import { FullscreenOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import { analyzeImage } from '../../utils/imageAnalyzer';

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
  const hasBorder = variant !== "noBorder";
  
  // Process image info to detect orientation
  const imageData = React.useMemo(() => {
    return image ? analyzeImage(image) : null;
  }, [image]);

  return (
    <Paper
      component={motion.div} 
      whileHover={{
        y: theme.customEffects?.cardHover?.y || -5,
        boxShadow: theme.customEffects?.cardHover?.boxShadow || theme.shadows[4],
      }}
      transition={{ type: "tween", duration: 0.2 }}
      variant="bigCard"
      onClick={onClick}
      sx={{
        ...sx,
        width: '100%',
        border: hasBorder ? `1px solid ${theme.palette.structure.borders}` : 'none',
        cursor: onClick ? 'pointer' : 'default',
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
          }}
        >
          {image && (
            <ContentAwareImage
              imageData={imageData}
              src={typeof image === 'string' ? image : image?.src}
              alt={title || "Project image"}
              expandOnHover={true}
              containerOrientation={imagePosition === "right" ? "portrait" : "landscape"}
            />
          )}
          
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
        
        <Box
          sx={{
            flex: 1,
            p: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: theme.palette.background.paper,
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
              <Typography variant={variant}>{children}</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default React.memo(WallCard);
