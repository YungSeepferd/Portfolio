import React from 'react';
import { Box, IconButton, Slider, Tooltip } from '@mui/material';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRounded from '@mui/icons-material/VolumeOffRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import { useTheme } from '@mui/material/styles';
import { useUIStore } from '../../store';

const VolumeControl: React.FC = () => {
  const theme = useTheme();
  const soundEnabled = useUIStore((s) => s.soundEnabled);
  const soundVolume = useUIStore((s) => s.soundVolume);
  const setSoundEnabled = useUIStore((s) => s.setSoundEnabled);
  const setSoundVolume = useUIStore((s) => s.setSoundVolume);

  const handleToggle = () => setSoundEnabled(!soundEnabled);

  const handleChange = (_: unknown, value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value;
    setSoundVolume(v / 100);
    if (!soundEnabled && v > 0) setSoundEnabled(true);
  };

  let icon: React.ReactNode;
  if (!soundEnabled || soundVolume === 0) {
    icon = <VolumeOffRounded fontSize="small" />;
  } else if (soundVolume < 0.5) {
    icon = <VolumeDownRounded fontSize="small" />;
  } else {
    icon = <VolumeUpRounded fontSize="small" />;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: { xs: 1, md: 2 } }}>
      <Tooltip title={soundEnabled ? 'Mute' : 'Unmute'}>
        <IconButton
          size="small"
          onClick={handleToggle}
          aria-label={soundEnabled ? 'Mute background audio' : 'Unmute background audio'}
          sx={{
            color: theme.palette.secondary.dark,
            backgroundColor: theme.custom.overlays.socialIcon.base,
            '&:hover': { backgroundColor: theme.custom.overlays.socialIcon.hover },
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Slider
        value={Math.round((soundEnabled ? soundVolume : 0) * 100)}
        onChange={handleChange}
        aria-label="Background audio volume"
        size="small"
        sx={{
          width: { xs: 90, sm: 120 },
          color: theme.palette.secondary.main,
          '& .MuiSlider-thumb': {
            width: 12,
            height: 12,
            boxShadow: 'none',
          },
        }}
      />
    </Box>
  );
};

export default VolumeControl;
