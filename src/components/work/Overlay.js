import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Box, IconButton } from '@mui/material';

const Overlay = ({ onClose, children, initialAnimation, exitAnimation }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={initialAnimation}
      animate={{ opacity: 1, scale: 1 }}
      exit={exitAnimation}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <Box 
        variant="overlay"
      >
        <Box 
          variant="overlayBackground" 
          onClick={onClose}
          aria-label="Close overlay"
        />
        <motion.div>
          <Box 
            variant="overlayContainer"
            sx={{
              '& .close-button': {
                background: 'none',
                border: 'none',
                fontSize: '2.5rem',
                cursor: 'pointer',
                color: '#888',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#333',
                },
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mb: 2 
            }}>
              <IconButton
                className="close-button"
                onClick={onClose}
                aria-label="Close overlay"
              >
                <span aria-hidden="true">&times;</span>
              </IconButton>
            </Box>
            {children}
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

Overlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  initialAnimation: PropTypes.object,
  exitAnimation: PropTypes.object,
};

Overlay.defaultProps = {
  initialAnimation: { opacity: 0, scale: 0.8 },
  exitAnimation: { opacity: 0, scale: 0.8 },
};

export default Overlay;