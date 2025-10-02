import React from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollUtils';

/**
 * MobileScrollHelper Component
 * 
 * Provides a prominent scroll helper for mobile devices to navigate away from the hero section
 * when the 3D canvas prevents normal scrolling gestures
 */
const MobileScrollHelper = () => {
  const theme = useTheme();
  
  const handleScrollDown = () => {
    // Scroll to Work first to avoid skipping the section on mobile
    scrollToSection('work');
  };
  
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        zIndex: theme.zIndex.fab,
        display: { xs: 'block', sm: 'none' }, // Mobile only
      }}
    >
      <Tooltip title="Scroll down" placement="left">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            onClick={handleScrollDown}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 56,
              height: 56,
              boxShadow: theme.shadows[6],
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: theme.shadows[12],
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
            aria-label="Scroll down to next section"
          >
            <motion.div
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              <KeyboardArrowDownIcon fontSize="large" />
            </motion.div>
          </IconButton>
        </motion.div>
      </Tooltip>
    </Box>
  );
};

export default MobileScrollHelper;
