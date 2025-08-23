import React from 'react';
import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  AlertTitle,
  IconButton,
  styled
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';

// Create a styled motion component based on MUI Alert
const MotionAlert = styled(motion.div)`
  width: 100%;
`;

export interface AlertProps extends Omit<MuiAlertProps, 'ref'> {
  /**
   * The title of the alert
   */
  title?: string;
  
  /**
   * If true, shows a close icon button
   */
  showCloseButton?: boolean;
  
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
  
  /**
   * Animation properties for the alert
   */
  animation?: {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
  };
}

/**
 * Enhanced Alert component with animation capabilities
 */
export const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  variant = 'standard',
  title,
  children,
  showCloseButton = false,
  onClose,
  animation,
  sx,
  ...rest
}) => {
  // Default animation settings
  const defaultAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };

  const animationProps = animation || defaultAnimation;
  
  return (
    <MotionAlert
      {...animationProps}
      sx={{ width: '100%' }}
    >
      <MuiAlert
        severity={severity}
        variant={variant}
        action={
          showCloseButton && onClose ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null
        }
        sx={{ 
          width: '100%',
          ...sx
        }}
        {...rest}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </MuiAlert>
    </MotionAlert>
  );
};
