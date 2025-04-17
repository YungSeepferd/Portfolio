import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { scrollToSection } from '../../utils/scrollUtils';

/**
 * ScrollIndicator Component
 * 
 * Renders a "Scroll to explore" text with animated down arrow
 * Positioned at the bottom center of the hero section
 */
const ScrollIndicator = () => {
  const theme = useTheme();
  
  // Handle click to scroll to work section
  const handleClick = () => {
    scrollToSection('work');
  };
  
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: theme.spacing(6),
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        cursor: 'pointer',
        zIndex: 10,
        pointerEvents: 'auto', // Explicitly enable pointer events for this component
      }}
      onClick={handleClick}
      role="button"
      aria-label="Scroll to explore content"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(1),
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            mb: 1, 
            color: theme.palette.text.secondary,
            opacity: 0.8,
            fontWeight: theme.typography.fontWeightRegular,
          }}
        >
          Scroll to explore
        </Typography>
        
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <ArrowDownwardIcon 
            color="primary" 
            fontSize="small"
          />
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default ScrollIndicator;
