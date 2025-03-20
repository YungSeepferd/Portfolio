import React from 'react';
import { Box, Container, Typography, IconButton, Button, useTheme, Paper, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';
import './FooterContact.css';
import theme from '../theme';

const FooterContact = () => {
  const theme = useTheme();
  const mailtoLink = "mailto:goeke.vincent@gmail.com?subject=Contact%20from%20Portfolio";

  return (
    <footer id="footer-contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Paper 
          id="contact"
          elevation={3}
          square
          sx={{
            mt: '0px', // updated from '-10px' to move the section downward
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            overflow: 'hidden',
            py: theme.spacing(4),
            height: '50vh' // Adjust this value to change the section's height
          }}
        >
          <Container maxWidth="lg" sx={{ pt: '100px' }}>
            <Grid container spacing={2} alignItems="center" sx={{ height: '100%' }}>
              {/* Left Column: Main Call-to-Action */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    justifyContent: 'center', 
                    height: '100%'
                  }}
                >
                  <Typography 
                    variant="h3" 
                    gutterBottom 
                    sx={{ 
                      color: theme.palette.common.white, // replaced 'white' with theme value
                      fontWeight: 'bold', 
                      letterSpacing: 1, 
                      fontSize: theme.typography.h3.fontSize 
                    }}
                  >
                    Let's Connect!
                  </Typography>
                  <Typography 
                    variant="body1" 
                    gutterBottom 
                    sx={{ 
                      color: theme.palette.common.white, 
                      maxWidth: 500, 
                      mb: theme.spacing(2), 
                      textAlign: 'left', 
                      fontSize: theme.typography.body1.fontSize 
                    }}
                  >
                    If you want to chat and collaborate, let's schedule a call!
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: theme.spacing(2) }}>
                    <IconButton color="inherit" aria-label="Email" href={mailtoLink}>
                      <EmailIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                    <IconButton color="inherit" aria-label="LinkedIn" href="https://www.linkedin.com/in/vincent-g-193124194/">
                      <LinkedInIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                    <IconButton color="inherit" aria-label="GitHub" href="https://github.com/YungSeepferd">
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
                </Box>
              </Grid>
              {/* Right Column: Placeholder Image */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <motion.img
                    src="https://via.placeholder.com/500x400?text=Your+Photo+Here"
                    alt="Contact placeholder"
                    whileHover={{ scale: 1.05 }}
                    style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
              {/* Second Row: Footer Info */}
              <Grid item xs={12}>
                <Box
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: theme.spacing(2)
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ color: theme.palette.common.white, opacity: 0.8, fontSize: theme.typography.body2.fontSize }}
                  >
                    Impressum | Privacy Policy
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ color: theme.palette.common.white, opacity: 0.8, fontSize: theme.typography.body2.fontSize }}
                  >
                    © 2025 Vincent Göke. All rights reserved.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </motion.div>
    </footer>
  );
};

export default FooterContact;