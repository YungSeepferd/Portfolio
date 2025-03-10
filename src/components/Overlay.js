import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Overlay.module.css';

const Overlay = ({ onClose, children }) => {
  useEffect(() => {
    // Optionally play a sound or perform other actions when the overlay appears.
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0, scale: 0.8, x: '-100vw' }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: '100vw' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div 
        className={styles.overlayBackground} 
        onClick={onClose}
        aria-label="Close overlay"
      />
      <motion.div className={styles.overlayContainer}>
        <div className={styles.overlayControls}>
          <button 
            className={styles.overlayClose} 
            onClick={onClose}
            aria-label="Close overlay"
          >
            &times;
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Overlay;