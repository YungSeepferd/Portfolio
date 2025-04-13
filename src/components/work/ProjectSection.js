import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { SmartImage, VideoPlayer } from '../common/Media';
import mediaUtils from '../../utils/mediaUtils';

/**
 * ProjectSection Component
 *
 * Renders a single section of a project, handling text and media layout.
 */
const ProjectSection = ({
  section, // Accept the whole section object
  sectionNumber,
  accentColor,
}) => {
  const theme = useTheme();

  // Destructure needed properties from the section object
  const { title, content, media: sectionMedia, layout = 'default' } = section || {};

  // Determine media type and source
  const mediaSrc = typeof sectionMedia === 'string' ? sectionMedia : sectionMedia?.src;
  const isMediaVideo = sectionMedia && mediaUtils.isVideo(sectionMedia);

  // Determine layout direction based on the 'layout' prop or default
  const direction = layout === 'media-left' ? 'row-reverse' : 'row'; // Default to media on right

  // Guard against missing section data
  if (!section) {
    return null; // Or render a placeholder/error
  }

  return (
    <Box sx={{ mb: { xs: 6, md: 8 } }}>
      {/* Section Number/Indicator */}
      <Typography
        variant="overline"
        display="block"
        sx={{
          color: accentColor || theme.palette.primary.main,
          fontWeight: 600,
          mb: 1,
          letterSpacing: '0.5px',
        }}
      >
        Section {sectionNumber}
      </Typography>

      {/* Section Title */}
      {title && (
        <Typography
          variant="h3"
          component="h3"
          sx={{
            mb: 3,
            color: theme.palette.text.primary,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Grid for Content and Media */}
      <Grid container spacing={{ xs: 3, md: 5 }} direction={direction} alignItems="center">
        {/* Text Content */}
        <Grid item xs={12} md={mediaSrc ? 6 : 12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Render content - assumes content is JSX or string */}
            {typeof content === 'string' ? (
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {content}
              </Typography>
            ) : (
              content // Render directly if it's already JSX/React elements
            )}
          </motion.div>
        </Grid>

        {/* Media Content */}
        {mediaSrc && (
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box sx={{
                width: '100%',
                aspectRatio: '16/9', // Default aspect ratio, adjust as needed
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden',
                boxShadow: theme.shadows[3],
              }}>
                {isMediaVideo ? (
                  <VideoPlayer src={mediaSrc} containerHeight="100%" />
                ) : (
                  <SmartImage src={mediaSrc} alt={title || 'Project section media'} containerHeight="100%" />
                )}
              </Box>
            </motion.div>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

ProjectSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    media: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    layout: PropTypes.string, // e.g., 'default', 'media-left'
    id: PropTypes.string, // If used for keys/scrolling
  }).isRequired,
  sectionNumber: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
};

export default ProjectSection;
