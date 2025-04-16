import React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getBarStyles } from '../../utils/getBarStyles';

/**
 * TechBar Component
 * 
 * Displays a horizontal list of technologies/tools used in a project
 */
const TechBar = ({ technologies = [], onClick, variant = 'outlined', size = 'small', sx = {}, barVariant = 'default' }) => {
  // Use theme correctly
  const theme = useTheme();
  const styles = getBarStyles(barVariant, theme);
  
  // If no technologies, don't render anything
  if (!technologies || technologies.length === 0) return null;
  
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Stack 
        direction="row" 
        spacing={1} 
        flexWrap="wrap"
        sx={{
          // Use theme in styles
          mt: theme.spacing(1),
          gap: theme.spacing(0.5),
        }}
      >
        {technologies.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size={size}
            variant={variant}
            clickable={!!onClick}
            onClick={onClick ? () => onClick(tech) : undefined}
            sx={{
              // Use theme in styles
              my: theme.spacing(0.5),
              fontSize: theme.typography.pxToRem(size === 'small' ? 12 : 14),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              border: `1.5px solid ${theme.palette.primary.main}`,
              fontWeight: theme.typography.fontWeightMedium,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
                backgroundColor: theme.palette.primary.main,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 8px rgba(0,0,0,0.4)'
                  : '0 4px 8px rgba(0,0,0,0.1)',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TechBar;
