import React, { useContext } from 'react';
import { 
  Modal as MuiModal, 
  Box, 
  IconButton,
  useTheme,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { ModalContext } from '../../../context/modal-context';

// Create a styled motion component
const MotionBox = styled(motion.div)``;

export interface ModalProps {
  /**
   * Content of the modal
   */
  children?: React.ReactNode;
  
  /**
   * If true, the modal is open
   */
  open?: boolean;
  
  /**
   * Callback fired when the modal is requested to be closed
   */
  onClose?: () => void;
  
  /**
   * Title of the modal
   */
  title?: string;
  
  /**
   * If true, display a close button
   */
  showCloseButton?: boolean;
  
  /**
   * Animation settings for the modal
   */
  animation?: {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
  };
  
  /**
   * Maximum width of the modal
   */
  maxWidth?: string | number;
  
  /**
   * Maximum height of the modal
   */
  maxHeight?: string | number;
  
  /**
   * Width of the modal
   */
  width?: string | number;
  
  /**
   * Height of the modal
   */
  height?: string | number;
  
  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * Enhanced Modal component with animation capabilities
 */
export const Modal: React.FC<ModalProps> = ({
  children,
  open = false,
  onClose,
  title,
  showCloseButton = true,
  animation,
  maxWidth = 600,
  maxHeight = '90vh',
  width = 'auto',
  height = 'auto',
  ...rest
}) => {
  const theme = useTheme();
  const { closeModal } = useContext(ModalContext);
  
  // Handle close action
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      closeModal();
    }
  };
  
  // Default animation settings
  const defaultAnimation = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3 }
  };
  
  const animationProps = animation || defaultAnimation;
  
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby={title ? 'modal-title' : undefined}
      {...rest}
    >
      <Box
        component={MotionBox}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width,
          height,
          maxWidth,
          maxHeight,
          bgcolor: theme.palette.background.paper,
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}
        {...animationProps}
      >
        {showCloseButton && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        
        {title && (
          <Box 
            component="h2"
            id="modal-title"
            sx={{ 
              mt: 0, 
              mb: 2,
              pr: 4, // Make space for close button
              fontSize: '1.5rem',
              fontWeight: 500
            }}
          >
            {title}
          </Box>
        )}
        
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
};
