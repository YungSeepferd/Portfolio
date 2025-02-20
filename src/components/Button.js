import React from 'react';
import styles from './Button.module.css';

/**
 * Button Component
 * Props:
 *   - onClick: click handler
 *   - children: button label or content
 *   - type: button type (default: 'button')
 *   - className: additional classes if needed
 */
const Button = ({ onClick, children, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;