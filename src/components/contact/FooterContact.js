import React from 'react';
import { Box, Container, Typography, IconButton, Button, useTheme, Paper, Grid, Card, CardContent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';
import Salzburg from '../../assets/images/About Me/Salzburg.jpg';

const FooterContact = () => {
  const theme = useTheme();
  const mailtoLink = "mailto:goeke.vincent@gmail.com?subject=Contact%20from%20Portfolio";

  return (
    <Box 
      component="footer" 
      id="footer-contact" 
      sx={{ 
        width: '100%',
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
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid container spacing={4} alignItems="center">
              {/* Left Column: Contact Info */}
              <Grid item xs={12} md={6}>
                <Card 
                  elevation={6}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    backdropFilter: 'blur(10px)',
                    color: theme.palette.common.white,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    height: '100%',
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
                      }}
                    >
                      If you want to chat about UX, haptic design, or just say hello, I'd love to hear from you! Let's schedule a call or connect through any of these channels.
                    </Typography>
                    
                    {/* Contact Icons */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mb: 3 
                      }}
                    >
                      <IconButton 
                        href={mailtoLink}
                        sx={{ 
                          color: theme.palette.common.white,
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                      
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
              
              {/* Right Column: Image */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    height: '350px',
                    overflow: 'hidden',
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: `0 12px 24px ${theme.palette.shadow.dark}`,
                  }}
                >
                  <motion.img
                    src={Salzburg}
                    alt="Contact Vincent"
                    whileHover={{ scale: 1.05 }}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                    }}
                  />
                </Box>
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
          </Container>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default FooterContact;