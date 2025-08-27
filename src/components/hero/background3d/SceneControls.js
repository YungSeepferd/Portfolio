import React from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { useSceneState } from './SceneContext';
import { SHAPE_TYPES } from './constants';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AdjustIcon from '@mui/icons-material/Adjust';
import CubeIcon from '@mui/icons-material/ViewInAr';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

/**
 * SceneControls Component
 * 
 * Provides UI controls for changing scenes and showing information
 * Positioned at the top right of the hero section
 */
const SceneControls = () => {
  const theme = useTheme();
  const { currentShapeType, switchShapeType, isTransitioning } = useSceneState();
  
  // Handle scene change button click
  const handleSceneChange = (sceneType) => {
    if (sceneType !== currentShapeType && !isTransitioning) {
      // Use switchShapeType to change scenes instead of directly setting state
      switchShapeType();
    }
  };
  
  // Handle info button click
  const handleInfoClick = () => {
    alert('Interactive 3D Background\n\nDrag to rotate the view.');
  };
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(0.5),
        background: theme.palette.mode === 'dark' 
          ? 'rgba(0, 0, 0, 0.6)' 
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: theme.shape.borderRadius * 3.5,
        padding: theme.spacing(0.5),
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[8],
        '& .MuiIconButton-root': {
          color: theme.palette.text.secondary,
          borderRadius: theme.shape.borderRadius * 2,
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
          }
        }
      }}
    >
      <Tooltip title="Sphere Scene">
        <IconButton 
          onClick={() => handleSceneChange(SHAPE_TYPES.SPHERE)}
          className={currentShapeType === SHAPE_TYPES.SPHERE ? 'active' : ''}
          size="small"
        >
          <AdjustIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Cube Scene">
        <IconButton 
          onClick={() => handleSceneChange(SHAPE_TYPES.BOX)}
          className={currentShapeType === SHAPE_TYPES.BOX ? 'active' : ''}
          size="small"
        >
          <CubeIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Torus Scene">
        <IconButton 
          onClick={() => handleSceneChange(SHAPE_TYPES.TORUS)}
          className={currentShapeType === SHAPE_TYPES.TORUS ? 'active' : ''}
          size="small"
        >
          <DonutLargeIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Information">
        <IconButton onClick={handleInfoClick} size="small">
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SceneControls;