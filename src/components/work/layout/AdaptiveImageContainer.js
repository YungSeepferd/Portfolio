/**
 * AdaptiveImageContainer Component
 * 
 * Intelligent image container that adapts to content dimensions and context
 */
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../../common/ContentAwareImage';
import VideoPlayer from '../../common/VideoPlayer';
import { analyzeImageContent } from '../../../utils/contentAnalysis';

const AdaptiveImageContainer = ({
  mediaData,
  title,
  containerProps = {},
  imageProps = {},
  enableAnimation = true,
  priority = 'normal' // 'hero', 'primary', 'secondary', 'normal'
}) => {
  const theme = useTheme();
  
  if (!mediaData) return null;

  const analysis = analyzeImageContent(mediaData);
  const { aspectRatio, layout, gridColumns } = analysis;

  // Priority-based sizing adjustments
  const priorityConfig = {
    hero: { minHeight: { xs: 300, md: 500 }, maxHeight: { md: 700 } },
    primary: { minHeight: { xs: 240, md: 400 }, maxHeight: { md: 600 } },
    secondary: { minHeight: { xs: 200, md: 320 }, maxHeight: { md: 500 } },
    normal: { minHeight: { xs: 180, md: 280 }, maxHeight: { md: 450 } }
  };

  const sizeConfig = priorityConfig[priority] || priorityConfig.normal;

  // Base container styles
  const containerStyles = {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
    ...sizeConfig,
    ...containerProps.sx
  };

  // Handle single image/video
  if (!Array.isArray(mediaData)) {
    const media = mediaData;
    
    // Adaptive aspect ratio based on content analysis
    if (aspectRatio !== 'auto') {
      containerStyles.aspectRatio = aspectRatio;
    }

    const content = media.type === 'video' ? (
      <VideoPlayer
        src={media.src}
        containerHeight="100%"
        containerWidth="100%"
        controls={true}
        muted={true}
        {...imageProps}
      />
    ) : (
      <ContentAwareImage
        src={media.src}
        alt={media.alt || title || 'Project media'}
        containerHeight="100%"
        containerWidth="100%"
        aspect={media.aspect || 'landscape'}
        sx={{ borderRadius: theme.shape.borderRadius }}
        {...imageProps}
      />
    );

    const Container = enableAnimation ? motion.div : Box;
    const motionProps = enableAnimation ? {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.5, delay: 0.1 }
    } : {};

    return (
      <Container
        {...(enableAnimation ? motionProps : {})}
        {...containerProps}
      >
        <Box sx={containerStyles}>
          {content}
        </Box>
      </Container>
    );
  }

  // Handle multiple images with intelligent grid layout
  const images = mediaData.slice(0, 6); // Limit to 6 images for performance
  
  if (layout === 'gallery-small' && gridColumns <= 3) {
    // Small gallery: side-by-side layout
    return (
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1, md: 2 },
          flexWrap: 'wrap',
          ...containerProps.sx
        }}
        {...containerProps}
      >
        {images.map((img, idx) => (
          <Box
            key={idx}
            sx={{
              flex: gridColumns === 1 ? '1 1 100%' : 
                    gridColumns === 2 ? '1 1 calc(50% - 8px)' : 
                    '1 1 calc(33.333% - 12px)',
              minWidth: { xs: '100%', sm: gridColumns === 1 ? '100%' : 'auto' },
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              boxShadow: theme.shadows[2],
              aspectRatio: '16/9',
              ...sizeConfig
            }}
          >
            <ContentAwareImage
              src={img.src || img}
              alt={img.alt || `${title} image ${idx + 1}`}
              containerHeight="100%"
              containerWidth="100%"
              aspect={img.aspect || 'landscape'}
              {...imageProps}
            />
          </Box>
        ))}
      </Box>
    );
  }

  // Large gallery: masonry-style layout
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: { xs: 2, md: 3 },
        ...containerProps.sx
      }}
      {...containerProps}
    >
      {images.map((img, idx) => {
        // Vary heights for masonry effect
        const heightVariants = ['280px', '320px', '240px', '360px', '300px', '280px'];
        const height = heightVariants[idx % heightVariants.length];
        
        return (
          <Box
            key={idx}
            component={enableAnimation ? motion.div : 'div'}
            {...(enableAnimation ? {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: idx * 0.1 }
            } : {})}
            sx={{
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              boxShadow: theme.shadows[2],
              height: { xs: '240px', md: height },
              // First image gets special treatment
              ...(idx === 0 && images.length > 3 && {
                gridColumn: { md: 'span 2' },
                height: { xs: '280px', md: '360px' }
              })
            }}
          >
            <ContentAwareImage
              src={img.src || img}
              alt={img.alt || `${title} image ${idx + 1}`}
              containerHeight="100%"
              containerWidth="100%"
              aspect={img.aspect || 'landscape'}
              {...imageProps}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default AdaptiveImageContainer;
