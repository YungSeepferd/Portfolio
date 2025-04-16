import React from 'react';
import { Box, Typography, Chip, Stack, useTheme } from '@mui/material';

/**
 * TitleOverlay Component
 * 
 * Displays title, description, and categories as an overlay on the hero image
 * with a dark gradient background for readability.
 */
const TitleOverlay = ({ title, description, categories = [] }) => {
  const theme = useTheme();
  
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
        padding: { xs: 3, sm: 4, md: 5 },
        boxSizing: 'border-box',
      }}
    >
      {/* Project Title */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 1,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
        }}
      >
        {title}
      </Typography>
      
      {/* Project Description */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          maxWidth: '800px',
          fontWeight: 400,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
        }}
      >
        {description}
      </Typography>
      
      {/* Categories */}
      {categories.length > 0 && (
        <Stack 
          direction="row" 
          spacing={1} 
          flexWrap="wrap"
          useFlexGap
          sx={{ gap: 1 }}
        >
          {categories.map((category, index) => (
            <Chip
              key={`category-${index}`}
              label={category}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: theme.palette.common.white,
                borderRadius: '4px',
                fontWeight: 500,
                textShadow: '0px 1px 1px rgba(0,0,0,0.2)',
                my: 0.5,
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TitleOverlay;
