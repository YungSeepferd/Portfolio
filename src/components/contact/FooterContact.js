import React from 'react';
import { Box, Typography, IconButton, Button, useTheme, Paper, Grid, Card, CardContent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';
// Removed Salzburg image import

const FooterContact = ({ projectContext }) => {
  const theme = useTheme();
  const mailtoLink = projectContext
  ? `mailto:goeke.vincent@gmail.com?subject=${encodeURIComponent(`Regarding your ${projectContext} project`)}`
  : `mailto:goeke.vincent@gmail.com?subject=${encodeURIComponent('Contact from Portfolio')}`;

  // Generate project-specific message if a project context is provided
  const contactMessage = projectContext 
    ? `Interested in discussing more about the ${projectContext} project? I'd love to share insights about the process and outcomes!` 
    : "If you want to chat about UX, audio design, haptic design or just say hello, I'd love to hear from you! Let's schedule a call or connect through any of these channels.";

  return (
    <Box 
      component="footer" 
      id="footer-contact" 
      sx={{ 
        width: '100vw', // Ensure full viewport width
        maxWidth: '100vw',
        padding: 0,
        marginBottom: 0,
        textAlign: 'left',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{ width: '100%' }}
      >
        <Paper 
          id="contact"
          elevation={3}
          square
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            overflow: 'hidden',
            position: 'relative',
            py: 8, // Use theme spacing
            minHeight: '500px', // Min height instead of fixed height
          }}
        >
          <Box
            sx={{
              width: '100%',
              px: { 
                xs: '20px',
                sm: '30px',
                md: '40px',
                lg: '50px',
              },
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Grid container spacing={4} justifyContent="center">
              {/* Content Box - Now full width */}
              <Grid item xs={12}>
                <Card 
                  elevation={6}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    backdropFilter: 'blur(10px)',
                    color: theme.palette.common.white,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    height: '100%',
                    maxWidth: '900px', // Add a max-width for better readability
                    mx: 'auto', // Center the card horizontally
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h3" 
                      gutterBottom 
                      sx={{ 
                        color: theme.palette.common.white,
                        fontWeight: 'bold',
                        mb: 3,
                      }}
                    >
                      Let's Connect!
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: theme.palette.common.white, 
                        mb: 3,
                        opacity: 0.9,
                        maxWidth: '700px', // Constrain text width for readability
                      }}
                    >
                      {contactMessage}
                    </Typography>
                    
                    <Typography 
                      variant="h5"
                      sx={{
                        color: theme.palette.common.white,
                        mb: 2,
                        fontWeight: 'medium',
                        wordBreak: 'break-word'
                      }}
                    >
                      goeke.vincent@gmail.com
                    </Typography>
                    
                    {/* Contact Icons */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mb: 3 
                      }}
                    >
                      <a href={mailtoLink} style={{ textDecoration: 'none' }}>
                        <IconButton 
                          sx={{ 
                            color: theme.palette.common.white,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </a>
                      
                      <IconButton 
                        href="https://www.linkedin.com/in/vincent-g-193124194/"
                        target="_blank"
                        sx={{ 
                          color: theme.palette.common.white,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                      
                      <IconButton 
                        href="https://github.com/YungSeepferd"
                        target="_blank"
                        sx={{ 
                          color: theme.palette.common.white,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      component="a" 
                      href={mailtoLink}
                      size="large"
                      sx={{ 
                        textTransform: 'none', 
                        px: 4, 
                        py: 1.5,
                        fontWeight: 'bold',
                      }}
                    >
                      Contact Me
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            {/* Footer Credits */}
            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'center', sm: 'flex-start' },
                gap: 2,
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.common.white, 
                  opacity: 0.7 
                }}
              >
                Impressum | Privacy Policy
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.common.white, 
                  opacity: 0.7 
                }}
              >
                © 2025 Vincent Göke. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default FooterContact;