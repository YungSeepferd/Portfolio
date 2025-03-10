import React from 'react';
import { motion } from 'framer-motion';
import './Tooltip.css';

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <motion.div 
        className="tooltip-content"
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default Tooltip;