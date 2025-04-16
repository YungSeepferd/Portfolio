import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import TechBar from './TechBar';
import ActionButtonGroup from '../common/ActionButtonGroup';
import { getBarStyles } from '../../utils/getBarStyles';

/**
 * ProjectActionsBar Component
 *
 * Shared bar for displaying technologies/tools and action buttons.
 * Used in both ProjectCardPreview (hover) and full project view.
 *
 * Props:
 * - technologies: array of tool/tech names
 * - links: array of action button configs
 * - barVariant: 'default' | 'overlay'
 * - sx: optional style overrides
 */
const ProjectActionsBar = ({ technologies = [], links = [], barVariant = 'default', sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = getBarStyles(barVariant, theme);

  if (!technologies.length && !links.length) return null;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: barVariant === 'overlay' ? { xs: 1, sm: 1.5 } : 2,
        pb: barVariant === 'overlay' ? { xs: 1.5, sm: 2 } : 2,
        background: barVariant === 'overlay'
          ? 'linear-gradient(to top, rgba(0,0,0,0.82) 80%, rgba(0,0,0,0.05) 100%)'
          : styles.barBg.backgroundColor,
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        ...sx,
      }}
    >
      {/* Technologies/tools on the left */}
      {technologies.length > 0 && (
        <TechBar
          technologies={technologies}
          variant="outlined"
          size="small"
          barVariant={barVariant}
          sx={{
            mr: !isMobile ? 2 : 0,
            mb: isMobile ? 1 : 0,
          }}
        />
      )}
      {/* Action buttons on the right */}
      {links.length > 0 && (
        <ActionButtonGroup
          actions={links}
          layout={isMobile ? 'grid' : 'row'}
          maxButtons={barVariant === 'overlay' ? 2 : 4}
          size="small"
          variant="outlined"
          barVariant={barVariant}
          forceColor="secondary"
          sx={{
            ...styles.button,
            ml: !isMobile ? 'auto' : 0,
            '& .MuiButton-root': barVariant === 'overlay' ? {
              minWidth: 28,
              height: 28,
              fontSize: '0.85rem',
              px: 1.2,
              py: 0.5,
              color: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.dark,
              background: 'transparent',
              backgroundColor: 'transparent',
              '&:hover': {
                background: 'transparent',
                backgroundColor: 'transparent',
                borderColor: theme.palette.secondary.dark,
              },
            } : {
              color: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.dark,
              background: 'transparent',
              backgroundColor: 'transparent',
              '&:hover': {
                background: 'transparent',
                backgroundColor: 'transparent',
                borderColor: theme.palette.secondary.dark,
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default ProjectActionsBar;
