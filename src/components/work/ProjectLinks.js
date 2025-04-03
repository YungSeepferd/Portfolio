import React from 'react';
import { Box, Button, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * ProjectLinks Component
 * 
 * Displays project links as prominent call-to-action buttons
 * between the project headline and content.
 */
const ProjectLinks = ({ links = [], projectTitle = "" }) => {
  const theme = useTheme();
  
  if (!links || links.length === 0) {
    return null;
  }
  
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        my: theme.spacing(3),
        pt: theme.spacing(1),
        pb: theme.spacing(3),
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2} 
        sx={{ 
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {links.map((link, index) => (
          <Button
            key={index}
            variant={index === 0 ? "contained" : "outlined"}
            color={
              link.label.includes("GitHub") ? "info" :
              link.label.includes("Paper") || link.label.includes("PDF") ? "secondary" :
              link.label.includes("Demo") || link.label.includes("View") ? "primary" : 
              "default"
            }
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            startIcon={link.icon}
            size="large"
            sx={{
              minWidth: '180px',
              fontWeight: 'medium',
              textTransform: 'none',
              boxShadow: index === 0 ? theme.shadows[2] : 'none',
              px: theme.spacing(3),
              '&:hover': {
                boxShadow: index === 0 ? theme.shadows[4] : theme.shadows[1],
              }
            }}
          >
            {link.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default ProjectLinks;