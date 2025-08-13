import React, { useState } from 'react';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import IframeModal from '../common/iframe-modal';
import { motion } from 'framer-motion';

/**
 * PrototypeShowcase Component
 *
 * Displays an embedded prototype with expandable preview and external link
 * options. Optimized for Figma and other prototype URLs.
 *
 * @param {string} title - Section title
 * @param {string} url - Prototype URL to embed
 * @param {boolean} isMobile - Whether the current view is mobile
 * @param {boolean} isTablet - Whether the current view is tablet
 * @param {Object} sx - Additional styles to apply
 */
const PrototypeShowcase = ({
  title = 'Interactive Prototype',
  url,
  isMobile = false,
  isTablet = false,
  sx = {},
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  // Return null if no URL is provided
  if (!url) return null;

  // Motion variants for animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Convert normal URL to embed URL for Figma if needed
  const getEmbedUrl = (originalUrl) => {
    if (!originalUrl) return '';

    // Handle Figma URLs
    if (originalUrl.includes('figma.com') && !originalUrl.includes('embed')) {
      // Convert standard Figma URL to embed URL
      return originalUrl.replace('file/', 'embed/') + '?embed_host=share&hide-ui=1';
    }

    return originalUrl;
  };

  // Get the proper embed URL
  const embedUrl = getEmbedUrl(url);

  // Determine height based on screen size and expanded state
  const getIframeHeight = () => {
    if (expanded) {
      return { xs: '70vh', sm: '75vh', md: '80vh' };
    }
    return isMobile ? 350 : isTablet ? 450 : 550;
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        width: '100%',
        mt: 4,
        mb: 2,
        ...sx,
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h2"
        gutterBottom
        sx={{
          mb: 2,
          fontWeight: 600,
          color: theme.palette.primary.main,
        }}
      >
        {title}
      </Typography>

      <Paper
        elevation={2}
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          height: getIframeHeight(),
          transition: theme.transitions.create('height', {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <IframeModal url={embedUrl} title={title} />
      </Paper>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setExpanded(!expanded)}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            order: { xs: 2, sm: 1 },
          }}
        >
          {expanded ? 'Collapse Prototype' : 'Expand Prototype'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          endIcon={<LaunchIcon />}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            order: { xs: 1, sm: 2 },
          }}
        >
          View Full Prototype
        </Button>
      </Box>
    </Box>
  );
};

export default PrototypeShowcase;
