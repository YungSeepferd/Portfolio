import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';

interface FooterContactProps {
  projectContext?: string;
}

const FooterContact: React.FC<FooterContactProps> = ({ projectContext }) => {
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
            py: 8,
            minHeight: '500px',
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
              <Grid item xs={12}>
                <Card
                  elevation={6}
                  sx={{
                    backgroundColor: theme.custom.overlays.contactCard.background,
                    backdropFilter: 'blur(10px)',
                    color: theme.palette.common.white,
                    border: theme.custom.overlays.contactCard.border,
                    height: '100%',
                    maxWidth: '900px',
                    mx: 'auto',
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
                        maxWidth: '700px',
                      }}
                    >
                      {contactMessage}
                    </Typography>

                    <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<EmailIcon />}
                        href={mailtoLink}
                        sx={{
                          fontWeight: 'bold',
                          textTransform: 'none',
                          fontSize: '1rem',
                        }}
                      >
                        Email Me
                      </Button>

                      <IconButton
                        component="a"
                        href="https://www.linkedin.com/in/vincent-goeke/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: theme.palette.common.white,
                          '&:hover': {
                            color: theme.palette.secondary.main,
                          },
                        }}
                      >
                        <LinkedInIcon fontSize="large" />
                      </IconButton>

                      <IconButton
                        component="a"
                        href="https://github.com/YungSeepferd"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: theme.palette.common.white,
                          '&:hover': {
                            color: theme.palette.secondary.main,
                          },
                        }}
                      >
                        <GitHubIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default FooterContact;
