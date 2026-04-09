import React from 'react';
import { Box, IconButton, Tooltip, useTheme, Chip } from '@mui/material';
import { useOrbState, ORB_MODES } from './OrbContext';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

/**
 * OrbControls Component
 * 
 * Provides UI controls for the floating orb companion
 * Similar to SceneControls but for orb interactions
 */
const OrbControls = () => {
  const theme = useTheme();
  const { 
    orbMode, 
    setOrbMode, 
    isEasterEggActive, 
    triggerEasterEgg,
    clickCount,
    isOrbVisible 
  } = useOrbState();
  
  // Don't show controls if orb isn't visible
  if (!isOrbVisible) return null;
  
  // Handle mode change
  const handleModeChange = (mode) => {
    if (!isEasterEggActive) {
      setOrbMode(mode);
    }
  };
  
  // Handle info click
  const handleInfoClick = () => {
    alert(
      'Interactive Orb Companion\n\n' +
      '• Click the orb to create waves\n' +
      '• Click 10 times in 4 seconds for easter egg!\n' +
      '• Use controls to change orb mode\n' +
      '• Orb follows your scroll through About section'
    );
  };
  
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        alignItems: 'flex-end',
      }}
    >
      {/* Click counter (only show when clicking) */}
      {clickCount > 0 && !isEasterEggActive && (
        <Chip
          label={`${clickCount}/10 clicks`}
          size="small"
          color={clickCount >= 7 ? 'warning' : 'default'}
          sx={{
            animation: clickCount >= 7 ? 'pulse 0.5s ease-in-out infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
            },
          }}
        />
      )}
      
      {/* Easter egg active indicator */}
      {isEasterEggActive && (
        <Chip
          label="🌈 Rainbow Mode!"
          size="small"
          color="secondary"
          sx={{
            animation: 'rainbow 2s linear infinite',
            '@keyframes rainbow': {
              '0%': { filter: 'hue-rotate(0deg)' },
              '100%': { filter: 'hue-rotate(360deg)' },
            },
          }}
        />
      )}
      
      {/* Control buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(0.5),
          background: theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.6)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: theme.shape.borderRadiusScale.xxl,
          padding: theme.spacing(0.5),
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[8],
          '& .MuiIconButton-root': {
            color: theme.palette.text.secondary,
            borderRadius: theme.shape.borderRadiusScale.xl,
            transition: theme.transitions.create(['color', 'background-color', 'transform', 'box-shadow'], {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeInOut,
            }),
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.action.hover,
              transform: 'scale(1.1)',
              boxShadow: theme.shadows[4],
            },
            '&.active': {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
              boxShadow: theme.shadows[6],
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            },
            '&:disabled': {
              opacity: 0.5,
            }
          }
        }}
      >
        <Tooltip title="Normal Mode">
          <IconButton 
            onClick={() => handleModeChange(ORB_MODES.NORMAL)}
            className={orbMode === ORB_MODES.NORMAL ? 'active' : ''}
            disabled={isEasterEggActive}
            size="small"
          >
            <BubbleChartIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Active Mode">
          <IconButton 
            onClick={() => handleModeChange(ORB_MODES.ACTIVE)}
            className={orbMode === ORB_MODES.ACTIVE ? 'active' : ''}
            disabled={isEasterEggActive}
            size="small"
          >
            <AutoAwesomeIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Rainbow Mode (10 clicks)">
          <IconButton 
            onClick={triggerEasterEgg}
            className={orbMode === ORB_MODES.RAINBOW ? 'active' : ''}
            size="small"
          >
            <ColorLensIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Information">
          <IconButton onClick={handleInfoClick} size="small">
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default OrbControls;
