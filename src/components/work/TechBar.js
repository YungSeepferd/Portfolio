import React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * TechBar Component
 * 
 * Displays a horizontal list of technologies/tools used in a project
 */
const TechBar = ({ tools = [], onClick, variant = 'outlined', size = 'small', sx = {} }) => {
  // Use theme correctly
  const theme = useTheme();
  
  // If no tools, don't render anything
  if (!tools || tools.length === 0) return null;
  
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
        {tools.map((tool) => (
          <Chip
            key={tool}
            label={tool}
            size={size}
            variant={variant}
            clickable={!!onClick}
            onClick={onClick ? () => onClick(tool) : undefined}
            sx={{
              // Use theme in styles
              my: theme.spacing(0.5),
              fontSize: theme.typography.pxToRem(size === 'small' ? 12 : 14),
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TechBar;
