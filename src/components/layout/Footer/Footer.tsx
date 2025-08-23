import React from 'react';
import { Box, Container, Typography, Link, IconButton, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

/**
 * Footer component properties
 */
export interface FooterProps {
  /**
   * Optional copyright text
   */
  copyrightText?: string;
  
  /**
   * Optional copyright year
   */
  copyrightYear?: number;
  
  /**
   * Footer variant
   */
  variant?: 'simple' | 'full';
  
  /**
   * Social links configuration
   */
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Footer component with responsive design and animation
 */
const Footer: React.FC<FooterProps> = ({
  copyrightText = 'All rights reserved',
  copyrightYear = new Date().getFullYear(),
  variant = 'full',
  socialLinks = {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    email: 'mailto:your.email@example.com',
  },
}) => {
  const theme = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  // Simple footer variant with just copyright
  if (variant === 'simple') {
    return (
      <Box
        component={motion.footer}
        initial="hidden"
        animate="visible"
        variants={footerVariants}
        sx={{
          py: 2,
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {copyrightYear} {copyrightText}
          </Typography>
        </Container>
      </Box>
    );
  }

  // Full footer variant with links and social icons
  return (
    <Box
      component={motion.footer}
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {copyrightYear} {copyrightText}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            {/* Navigation Links */}
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="/about" color="inherit" underline="hover">
              About
            </Link>
            <Link href="/projects" color="inherit" underline="hover">
              Projects
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Stack>

          {/* Social Media Links */}
          <Stack direction="row" spacing={1}>
            {socialLinks.github && (
              <IconButton
                aria-label="GitHub"
                color="inherit"
                component={Link}
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </IconButton>
            )}
            {socialLinks.linkedin && (
              <IconButton
                aria-label="LinkedIn"
                color="inherit"
                component={Link}
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
            )}
            {socialLinks.email && (
              <IconButton
                aria-label="Email"
                color="inherit"
                component={Link}
                href={socialLinks.email}
              >
                <EmailIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
