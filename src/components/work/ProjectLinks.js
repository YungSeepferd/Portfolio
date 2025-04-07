import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ActionButton from '../common/ActionButton';
import { useModalContext } from '../../context/ModalContext';

/**
 * Displays project links as styled action buttons
 * Updated to handle pop-up PDFs and iframes
 */
const ProjectLinks = ({ links = [], title = '', compact = false }) => {
  const theme = useTheme();
  const { openPdf, openIframe } = useModalContext();
  
  if (!links || links.length === 0) return null;
  
  // Handle click for different content types
  const handleLinkClick = (link, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (link.contentType === 'pdf') {
      openPdf(link.url, link.label);
    } else if (link.contentType === 'iframe') {
      openIframe(link.url, link.label);
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };
  
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
            contentType={link.contentType || 'external'}
            onClick={(e) => handleLinkClick(link, e)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProjectLinks;