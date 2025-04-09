import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ActionButton from '../common/ActionButton';

/**
 * Displays project links as styled action buttons
 * Updated to use ActionButton for consistent overlay behavior
 */
const ProjectLinks = ({ links = [], title = '', compact = false }) => {
  const theme = useTheme();
  
  if (!links || links.length === 0) return null;
  
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: compact ? 'flex-start' : 'center',
        mt: compact ? 3 : 4,
        mb: compact ? 0 : 3,
      }}
    >
      {!compact && (
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            opacity: 0.9,
            color: theme.palette.text.secondary
          }}
        >
          Learn more about {title}
        </Typography>
      )}
      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: compact ? 'flex-start' : 'center',
        }}
      >
        {links.map((link, index) => (
          <ActionButton
            key={index}
            label={link.label}
            href={link.url}
            icon={link.icon}
            variant={index === 0 ? 'contained' : 'outlined'}
            size="medium"
            contentType={link.contentType || determineContentType(link.url, link.label)}
          />
        ))}
      </Box>
    </Box>
  );
};

/**
 * Determine content type from URL and label
 */
const determineContentType = (url, label) => {
  if (!url) return 'external';
  
  const normalizedUrl = url.toLowerCase();
  const normalizedLabel = label.toLowerCase();
  
  if (normalizedUrl.includes('.pdf') || 
      normalizedLabel.includes('pdf') || 
      normalizedLabel.includes('thesis')) {
    return 'pdf';
  }
  
  if (normalizedUrl.includes('figma.com') || 
      normalizedUrl.includes('miro.com') || 
      normalizedLabel.includes('prototype')) {
    return 'iframe';
  }
  
  return 'external';
};

export default ProjectLinks;