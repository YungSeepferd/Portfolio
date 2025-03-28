import React from 'react';
import { Box, Typography, useTheme, Paper } from '@mui/material';

const WallCard = ({ title, image, children, variant = "body2", sx, ...props }) => {
  const theme = useTheme();
  const displayImage = image // Use image if provided, else use placeholder
  
  // Determine if we should add a border based on the variant prop
  const hasBorder = variant !== "noBorder";
  
  return (
    <Paper 
      variant="bigCard" 
      sx={{ 
        ...sx, 
        width: '100%',
        border: hasBorder ? `1px solid ${theme.palette.structure.borders}` : 'none',
      }} 
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: theme.customSizes.bigCardHeight, // use minHeight so card expands with content
          height: 'auto',
        }}
      >
        <Box
          sx={{
            flex: { xs: 'none', md: `0 0 ${theme.customSizes.bigCardImageWidth}` },
            width: { xs: '100%', md: 'auto' },
            height: { xs: 200, md: '100%' },
            backgroundImage: `url(${displayImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            flex: 1,
            p: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {title && (
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          )}
          {/* Wrap children in Box to prevent nesting issues */}
          <Box component="div">
            {React.isValidElement(children) ? children : (
              <Typography variant={variant}>{children}</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default WallCard;
