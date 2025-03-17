import React from 'react';
import { Box, Container, Typography, IconButton, Button, useTheme, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const FooterContact = () => {
  const theme = useTheme();
  const mailtoLink = "mailto:goeke.vincent@gmail.com?subject=Contact%20from%20Portfolio";

  return (
    <Paper 
      id="contact"
      elevation={3}
      square
      sx={{
        mt: theme.spacing(4),
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ height: '300px', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="lg">
          <Box
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              py: theme.spacing(2),
              px: theme.spacing(2)
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
            >
              Let's Connect!
            </Typography>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{ color: 'white', textAlign: 'center', maxWidth: 500 }}
            >
              If you want to chat about anything, let's schedule a call!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: theme.spacing(2) }}>
              <IconButton color="inherit" aria-label="Email" href={mailtoLink}>
                <EmailIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" href="https://linkedin.com/in/your-profile">
                <LinkedInIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton color="inherit" aria-label="GitHub" href="https://github.com/your-github">
                <GitHubIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
            <Button 
              variant="contained" 
              color="secondary" 
              component="a" 
              href={mailtoLink}
              sx={{ textTransform: 'none', px: 3, py: 1 }}
            >
              Contact Me
            </Button>
            <Typography variant="body2" sx={{ mt: theme.spacing(2), color: 'white', opacity: 0.8 }}>
              © 2025 Vincent Göke. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

export default FooterContact;