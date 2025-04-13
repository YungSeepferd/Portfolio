import React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * TechBar Component
 * 
 * Displays a horizontal list of technologies/tools used in a project
 */
const TechBar = ({ technologies = [], onClick, variant = 'outlined', size = 'small', sx = {} }) => {
  // Use theme correctly
  const theme = useTheme();
  
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
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TechBar;
