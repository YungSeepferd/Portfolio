import React, { forwardRef } from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)(({ theme, nonScrollable }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  overflow: nonScrollable ? 'visible' : 'auto',
  height: nonScrollable ? 'auto' : '450px',
  maxHeight: nonScrollable ? 'none' : '80vh',
}));

const TabContent = forwardRef(({ data, sx = {}, nonScrollable = false, largePicture = false }, ref) => {
  const theme = useTheme();

  if (!data) return null;

  return (
    <StyledPaper 
      nonScrollable={nonScrollable} 
      elevation={3} 
      ref={ref}
      sx={{
        ...sx,
        backgroundImage: 'none',
      }}
    >
      <Grid container spacing={4}>
        {/* Image column - larger when largePicture is true */}
        <Grid 
          item 
          xs={12} 
          md={largePicture ? 6 : 4}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          {data.pictures && data.pictures.length > 0 && (
            <Box
              sx={{
                width: '100%',
                height: largePicture ? '450px' : '300px',
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden',
                mb: 2,
                boxShadow: theme.shadows[8],
              }}
            >
              <Box
                component="img"
                src={data.pictures[0]}
                alt={`${data.title} visualization`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          )}
          {data.subtitle && (
            <Typography 
              variant="h6" 
              align="center" 
              color="primary.main" 
              sx={{ fontWeight: 'medium', mt: 1 }}
            >
              {data.subtitle}
            </Typography>
          )}
        </Grid>
        
        {/* Content column - smaller when largePicture is true */}
        <Grid 
          item 
          xs={12} 
          md={largePicture ? 6 : 8}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {data.content}
          </Box>
        </Grid>
      </Grid>
    </StyledPaper>
  );
});

export default TabContent;