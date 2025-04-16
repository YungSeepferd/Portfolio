import React from 'react';
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import TechBar from './TechBar';
import ActionButtonGroup from '../common/ActionButtonGroup';
import { getBarStyles } from '../../utils/getBarStyles';

/**
 * ActionsBar Component
 * 
 * Displays technologies on the left and action buttons on the right in a single bar.
 * Uses standardized project data.
 */
const ActionsBar = ({ technologies = [], links = [], barVariant = 'default' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Don't render if nothing to show
  if (!technologies.length && !links.length) {
    return null;
  }
  
  // Render mobile layout (stacked) or desktop layout (side-by-side)
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 0,
        ...getBarStyles(barVariant, theme).barBg,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          width: '100%',
          gap: 2,
        }}
      >
        {/* Technologies on the left */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {technologies && technologies.length > 0 ? (
            <TechBar
              technologies={technologies}
              variant="outlined"
              size="small"
              barVariant={barVariant}
            />
          ) : null}
        </Box>
        
        {/* Action Buttons on the right */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
            alignItems: 'center',
          }}
        >
          <ActionButtonGroup
            actions={links}
            layout={isMobile ? 'grid' : 'row'}
            maxButtons={4}
            size="small"
            barVariant={barVariant}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ActionsBar;
