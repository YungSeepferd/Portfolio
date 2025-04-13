import React from 'react';
import { Box, Typography, useTheme, Stack, Divider } from '@mui/material';
import { motion } from 'framer-motion';
// Updated import for SkillTag
import { SkillTag } from '../common/Tags';
import ActionButton from '../common/ActionButton';

/**
 * ProjectHeader Component
 * 
 * Displays the main header information for a project, including title,
 * description, categories, tech stack, and relevant links.
 */
const ProjectHeader = ({ 
  title, 
  description, 
  categories = [], 
  techStack = [], 
  links = [], 
  theme: projectTheme = {} 
}) => {
  const theme = useTheme();
  const headerColor = projectTheme.textColor || theme.palette.text.primary;
  const accentColor = projectTheme.accentColor || theme.palette.primary.main;

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } 
    }
  };

  return (
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      sx={{ 
        textAlign: 'center', 
        mb: { xs: 6, md: 8 },
        pt: { xs: 4, md: 6 }, 
        color: headerColor,
      }}
    >
      {/* Categories */}
      {categories && categories.length > 0 && (
        <Typography 
          variant="overline" 
          display="block" 
          gutterBottom
          sx={{ 
            color: accentColor,
            fontWeight: 600,
            letterSpacing: '1px',
            mb: 1,
          }}
        >
          {categories.join(' / ')}
        </Typography>
      )}

      {/* Title */}
      <Typography 
        variant="h1" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
          color: headerColor, 
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography 
        variant="h5" 
        component="p" 
        sx={{ 
          maxWidth: '800px', 
          mx: 'auto', 
          mb: 4,
          color: theme.palette.text.secondary, 
          fontWeight: 400,
        }}
      >
        {description}
      </Typography>

      {/* Tech Stack */}
      {techStack && techStack.length > 0 && (
        <Box 
          component={motion.div} 
          variants={contentVariants}
          sx={{ mb: 4 }}
        >
          <Typography variant="overline" display="block" sx={{ mb: 1, color: theme.palette.text.disabled }}>
            Technologies Used
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {techStack.map((tech) => (
              <SkillTag key={tech} label={tech} size="medium" />
            ))}
          </Stack>
        </Box>
      )}
      
      {/* Links */}
      {links && links.length > 0 && (
        <Box 
          component={motion.div} 
          variants={contentVariants}
          sx={{ mb: 4 }}
        >
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            {links.map((link, index) => (
              <ActionButton
                key={index}
                label={link.label}
                href={link.url}
                icon={link.icon}
                variant={link.variant || 'outlined'}
                color={link.color}
                size="medium"
                openInPopup={link.openInPopup !== false} 
                contentType={link.contentType || 'external'} 
                target={link.openInPopup === false ? "_blank" : undefined}
                rel={link.openInPopup === false ? "noopener noreferrer" : undefined}
              />
            ))}
          </Stack>
        </Box>
      )}
      
      <Divider sx={{ mt: 6, mb: 0, maxWidth: '200px', mx: 'auto' }} />

    </Box>
  );
};

export default ProjectHeader;
