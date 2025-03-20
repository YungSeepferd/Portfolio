import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Cards = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.card.background,
        boxShadow: `0 2px 8px ${theme.palette.card.shadow}`,
        borderRadius: 2,
        padding: 3,
      }}
    >
      <Typography
        sx={{
          color: theme.palette.text.primary,
        }}
      >
        {/* Add your content here */}
      </Typography>
    </Box>
  );
};

export default Cards;