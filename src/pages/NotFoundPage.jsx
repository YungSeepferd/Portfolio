import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        color="primary"
        sx={{ mt: 2 }}
      >
        Return Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
