import React from 'react';
import { motion } from 'framer-motion';
import styles from './Overlay.module.css';

/**
 * Generic Overlay Component
 * Props:
 *   - onClose: Function to close the overlay when background or the close button is clicked.
 *   - children: Content to render inside the overlay.
 */
const Overlay = ({ onClose, children }) => {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.overlayBackground} onClick={onClose} />
      <motion.div className={styles.overlayContainer}>
        <div className={styles.overlayControls}>
          <button className={styles.overlayClose} onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Overlay;