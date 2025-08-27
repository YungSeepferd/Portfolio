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
    ? `mailto:goeke.vincent@gmail.com?subject=Regarding%20your%20${encodeURIComponent(projectContext)}%20project` 
    : "mailto:goeke.vincent@gmail.com?subject=Contact%20from%20Portfolio";

  // Generate project-specific message if a project context is provided
  const contactMessage = projectContext 
    ? `Interested in discussing more about the ${projectContext} project? I'd love to share insights about the process and outcomes!` 
    : "If you want to chat about UX, haptic design, or just say hello, I'd love to hear from you! Let's schedule a call or connect through any of these channels.";

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
                  <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                    <Typography 
                      variant="h3" 
                      gutterBottom 
                      sx={{ 
                        color: theme.palette.common.white,
                        fontWeight: 'bold',
                        mb: { xs: 2, sm: 3 },
                        fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                        textAlign: { xs: 'center', sm: 'left' }
                      }}
                    >
                      Let's Connect!
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: theme.palette.common.white, 
                        mb: { xs: 2, sm: 3 },
                        opacity: 0.9,
                        maxWidth: '700px',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        textAlign: { xs: 'center', sm: 'left' },
                        lineHeight: { xs: 1.5, sm: 1.6 }
                      }}
                    >
                      {contactMessage}
                    </Typography>
                    
                    <Typography 
                      variant="h5"
                      sx={{
                        color: theme.palette.common.white,
                        mb: { xs: 1.5, sm: 2 },
                        fontWeight: 'medium',
                        wordBreak: 'break-word',
                        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                        textAlign: { xs: 'center', sm: 'left' }
                      }}
                    >
                      goeke.vincent@gmail.com
                    </Typography>
                    
                    {/* Contact Icons */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        gap: { xs: 1, sm: 2 }, 
                        mb: 3,
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', sm: 'flex-start' }
                      }}
                    >
                      <a href={mailtoLink} style={{ textDecoration: 'none' }}>
                        <IconButton 
                          sx={{ 
                            color: theme.palette.common.white,
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: theme.shape.borderRadiusScale.xl,
                            boxShadow: theme.shadows[4],
                            transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
                              duration: theme.transitions.duration.shorter,
                              easing: theme.transitions.easing.easeInOut,
                            }),
                            '&:hover': { 
                              backgroundColor: 'rgba(255,255,255,0.25)',
                              transform: 'translateY(-2px)',
                              boxShadow: theme.shadows[8],
                            },
                            '&:active': {
                              transform: 'translateY(0)',
                            }
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
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          borderRadius: theme.shape.borderRadiusScale.xl,
                          boxShadow: theme.shadows[4],
                          transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
                            duration: theme.transitions.duration.shorter,
                            easing: theme.transitions.easing.easeInOut,
                          }),
                          '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.25)',
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[8],
                          },
                          '&:active': {
                            transform: 'translateY(0)',
                          }
                        }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                      
                      <IconButton 
                        href="https://github.com/YungSeepferd"
                        target="_blank"
                        sx={{ 
                          color: theme.palette.common.white,
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          borderRadius: theme.shape.borderRadiusScale.xl,
                          boxShadow: theme.shadows[4],
                          transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
                            duration: theme.transitions.duration.shorter,
                            easing: theme.transitions.easing.easeInOut,
                          }),
                          '&:hover': { 
                            backgroundColor: 'rgba(255,255,255,0.25)',
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[8],
                          },
                          '&:active': {
                            transform: 'translateY(0)',
                          }
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
                        px: { xs: 3, sm: 4 }, 
                        py: { xs: 1, sm: 1.5 },
                        fontWeight: 'bold',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        width: { xs: '100%', sm: 'auto' },
                        maxWidth: { xs: '280px', sm: 'none' }
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