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
    // Create a more descriptive message for each scene type
    const sceneDescriptions = {
      [SHAPE_TYPES.SPHERE]:
        'Sphere Scene: Interactive floating spheres that follow your mouse cursor.',
      [SHAPE_TYPES.BOX]:
        'Cube Scene: Grid of cubes that create ripple effects as you move your mouse.',
      [SHAPE_TYPES.TORUS]:
        'Drawing Scene: Trail that respond to your mouse movement speed and direction.',
    };

    const currentSceneDescription = sceneDescriptions[currentShapeType] || '';

    alert(
      `Interactive 3D Background\n\n${currentSceneDescription}\n\nTry different scenes using the buttons, or drag to rotate the view.`
    );
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
        gap: 1,
        background: 'rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '28px',
        padding: '4px',
        '& .MuiIconButton-root': {
          color: theme.palette.text.secondary,
          '&.active': {
            color: theme.palette.primary.main,
            background: 'rgba(255,255,255,0.1)',
          },
        },
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
