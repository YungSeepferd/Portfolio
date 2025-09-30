import React from 'react';
import { Box, Typography, IconButton, Button, useTheme, Paper, Grid, CardContent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';
import HybridFooterBackground from '../common/HybridFooterBackground';
import EnhancedFooterCard from './EnhancedFooterCard';

const FooterContact = ({ projectContext }) => {
  const theme = useTheme();
  const mailtoLink = projectContext 
    ? `mailto:goeke.vincent@gmail.com?subject=Regarding%20your%20${encodeURIComponent(projectContext)}%20project` 
    : "mailto:goeke.vincent@gmail.com?subject=Contact%20from%20Portfolio";

  // Generate project-specific message if a project context is provided
  const contactMessage = projectContext 
    ? `Interested in discussing more about the ${projectContext} project? I'd love to share insights about the process and outcomes!` 
    : "If you want to chat about UX, haptic design, or just say hello, I'd love to hear from you! Let's schedule a call or connect through any of these channels.";

  const horizontalPadding = getSpacingPreset('pageHorizontal');
  const headlinePreset = getTypographyPreset(theme, 'overlayTitle');
  const bodyPreset = getTypographyPreset(theme, 'bodyLong');
  const contactLinePreset = getTypographyPreset(theme, 'cardTitle');

  return (
    <Box 
      component="footer" 
      id="footer-contact" 
      sx={{ 
        width: '100vw',
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
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            overflow: 'hidden',
            position: 'relative',
            py: 8,
            minHeight: '500px',
          }}
        >
          {/* Hybrid Background: Animated Mesh + Interactive Dot Grid */}
          <HybridFooterBackground 
            meshProps={{
              orbCount: 6,
              baseSpeed: 0.4,
              mouseInfluence: 0.12
            }}
            dotProps={{
              dotSize: 12,
              gap: 36,
              proximity: 180
            }}
          />

          <Box
            sx={{
              width: '100%',
              px: horizontalPadding.px,
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Grid container spacing={4} justifyContent="center">
              {/* Enhanced Interactive Card with 3D Tilt Effects */}
              <Grid item xs={12}>
                <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
                  <EnhancedFooterCard>
                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                      <Typography 
                        variant={headlinePreset.variant}
                        component={headlinePreset.component}
                        gutterBottom 
                        sx={{ 
                          ...headlinePreset.sx,
                          color: theme.palette.common.white,
                          mb: { xs: 2, sm: 3 },
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        Let's Connect!
                      </Typography>
                      
                      <Typography 
                        variant={bodyPreset.variant}
                        component={bodyPreset.component}
                        sx={{ 
                          ...bodyPreset.sx,
                          color: theme.palette.common.white, 
                          mb: { xs: 2, sm: 3 },
                          opacity: 0.9,
                          maxWidth: '700px',
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        {contactMessage}
                      </Typography>
                      
                      <Typography 
                        variant={contactLinePreset.variant}
                        component={contactLinePreset.component}
                        sx={{
                          ...contactLinePreset.sx,
                          color: theme.palette.common.white,
                          mb: { xs: 1.5, sm: 2 },
                          fontWeight: 'medium',
                          wordBreak: 'break-word',
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
                            variant="glassmorphic"
                            sx={{
                              color: theme.palette.common.white,
                            }}
                          >
                            <EmailIcon />
                          </IconButton>
                        </a>
                        
                        <IconButton 
                          href="https://www.linkedin.com/in/vincent-goeke"
                          target="_blank"
                          variant="glassmorphic"
                          sx={{
                            color: theme.palette.common.white,
                          }}
                        >
                          <LinkedInIcon />
                        </IconButton>
                        
                        <IconButton 
                          href="https://github.com/YungSeepferd"
                          target="_blank"
                          variant="glassmorphic"
                          sx={{
                            color: theme.palette.common.white,
                          }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Box>
                      
                      <Button 
                        variant="glassmorphic" 
                        component="a" 
                        href={mailtoLink}
                        size="large"
                        sx={{ 
                          width: { xs: '100%', sm: 'auto' },
                          maxWidth: { xs: '280px', sm: 'none' },
                          mx: { xs: 'auto', sm: 0 },
                          display: 'flex',
                          py: 1.5,
                          px: 4,
                          color: theme.palette.common.white,
                        }}
                      >
                        Contact Me
                      </Button>
                    </CardContent>
                  </EnhancedFooterCard>
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
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default FooterContact;
