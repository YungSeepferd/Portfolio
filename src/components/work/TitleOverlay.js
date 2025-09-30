import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import CategoryTagList from '../common/CategoryTagList';
import { getTypographyPreset } from '../../theme/presets';

/**
 * TitleOverlay Component
 * 
 * Displays title, description, and categories as an overlay on the hero image
 * with a dark gradient background for readability.
 */
const TitleOverlay = ({ title, description, categories = [] }) => {
  const theme = useTheme();
  const overlayTitlePreset = getTypographyPreset(theme, 'overlayTitle');
  const overlaySubtitlePreset = getTypographyPreset(theme, 'overlaySubtitle');

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        color: theme.palette.common.white,
        padding: {
          xs: theme.spacing(3),
          sm: theme.spacing(4),
          md: theme.spacing(5),
        },
        boxSizing: 'border-box',
      }}
    >
      {/* Project Title */}
      <Typography
        variant={overlayTitlePreset.variant}
        component={overlayTitlePreset.component}
        sx={{
          ...overlayTitlePreset.sx,
          mb: 1,
          textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
        }}
      >
        {title}
      </Typography>
      
      {/* Project Description */}
      <Typography
        variant={overlaySubtitlePreset.variant}
        component={overlaySubtitlePreset.component}
        sx={{
          ...overlaySubtitlePreset.sx,
          mb: 2,
          maxWidth: '800px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
        }}
      >
        {description}
      </Typography>
      
      {/* Categories */}
      {categories.length > 0 && (
        <CategoryTagList tags={categories} textColor={theme.palette.common.white} sx={{ mt: 1 }} />
      )}
    </Box>
  );
};

export default TitleOverlay;
