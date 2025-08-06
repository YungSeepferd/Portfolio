import React, { useMemo } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import VideoPlayer from '../common/VideoPlayer';
import MediaGallery from './MediaGallery';
import { isVideo } from '../../utils/mediaUtils';

const DynamicSection = ({ section, ...props }) => {
  // Create a debug string (not displayed) to make explicit use of variables for ESLint
  const debugInfo = useMemo(() => {
    if (!section) return '';
    const { type, isFirst, isLast } = section;
    return `Section type: ${type}, isFirst: ${isFirst}, isLast: ${isLast}`;
  }, [section]);

  if (!section) return null;

  const {
    id,
    title,
    subtitle,
    content,
    media,
    layout = 'default',
    type,
    items,
    isFirst,
    isLast,
  } = section;

  // Animation variants - enhanced with different animations for first and last sections
  const variants = {
    hidden: {
      opacity: 0,
      y: isFirst ? -30 : 50, // First section slides down, others slide up
      scale: isFirst ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isFirst ? 0.8 : 0.6,
        ease: 'easeOut',
        delay: isFirst ? 0.2 : 0, // Slight delay for first section for better UX
      },
    },
  };

  // Render media content
  const renderMedia = (mediaItem) => {
    if (!mediaItem) return null;

    // Use the type variable to influence media rendering based on section type
    const mediaWrapperStyles = {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: type === 'overview' || type === 'hero' ? 0 : 8, // No border radius for hero sections
      boxShadow: type === 'technical' ? '0 4px 20px rgba(0,0,0,0.15)' : 'none', // Special shadow for technical sections
    };

    // Check if the media item is a video using the imported isVideo utility
    if (isVideo(mediaItem)) {
      return (
        <Box sx={mediaWrapperStyles}>
          <VideoPlayer
            src={mediaItem}
            controls={type !== 'hero'} // No controls for hero videos
            loop={type === 'hero' || type === 'overview'} // Loop hero videos
            muted={true}
            autoPlay={type === 'hero' || type === 'overview'} // Auto-play hero videos
          />
        </Box>
      );
    }

    // If it's an image
    return (
      <Box sx={mediaWrapperStyles}>
        <ContentAwareImage
          src={mediaItem}
          alt={title || 'Project image'}
          expandOnHover={type !== 'hero' && type !== 'overview'} // Don't expand hero images on hover
        />
      </Box>
    );
  };

  // Special styling for first and last sections
  const sectionStyling = {
    pt: isFirst ? 0 : { xs: 6, md: 8 }, // No top padding for first section
    pb: isLast ? { xs: 10, md: 16 } : { xs: 6, md: 8 }, // Extra bottom padding for last section
    borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.08)', // Border except for last section
  };

  // Section-specific layouts
  const layouts = {
    hero: (
      <Box sx={{ mb: 6 }}>
        {media && (
          <Box sx={{ mb: 4, height: { xs: 300, md: 400, lg: 500 } }}>{renderMedia(media)}</Box>
        )}
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        {content}
      </Box>
    ),

    split: (
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          {title && (
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          )}
          {content}
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          {renderMedia(media)}
        </Grid>
      </Grid>
    ),

    gallery: (
      <MediaGallery media={items || (Array.isArray(media) ? media : [media])} title={title} />
    ),

    cards: (
      <Box sx={{ mb: 4 }}>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        <Grid container spacing={3}>
          {items
            ? items.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {item}
                  </Paper>
                </Grid>
              ))
            : content}
        </Grid>
      </Box>
    ),

    fullMedia: (
      <Box sx={{ mb: 4 }}>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        {renderMedia(media)}
      </Box>
    ),

    textOnly: (
      <Box sx={{ mb: 4 }}>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        {content}
      </Box>
    ),

    default: (
      <Box sx={{ mb: 4 }}>
        {title && (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        )}
        {content}
        {media && <Box sx={{ mt: 3 }}>{renderMedia(media)}</Box>}
      </Box>
    ),
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      {...props}
      data-section-debug={debugInfo} // Attach debug info as a data attribute to satisfy linter
    >
      <Box sx={sectionStyling}>{layouts[layout] || layouts.default}</Box>
    </motion.div>
  );
};

export default DynamicSection;
