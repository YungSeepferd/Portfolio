import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { motion } from 'framer-motion';

// Create a styled motion component based on MUI Box
const MotionBox = styled(motion.div)``;

export interface ContainerProps {
  /**
   * Sets the maximum width of the container
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number;
  
  /**
   * If true, the container will have horizontal padding
   */
  disableGutters?: boolean;
  
  /**
   * If true, the container will be a flex container
   */
  flexContainer?: boolean;
  
  /**
   * Animation settings for the container
   */
  animation?: {
    initial?: any;
    animate?: any;
    transition?: any;
  };
  
  /**
   * Children elements to be rendered inside the container
   */
  children: React.ReactNode;
  
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: BoxProps['sx'];
  
  /**
   * Additional props to be passed to the Box component
   */
  [key: string]: any;
}

/**
 * Container component for consistent spacing and maximum width
 * Adds motion capabilities to the standard MUI Container
 */
export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'lg',
  disableGutters = false,
  flexContainer = false,
  animation,
  children,
  sx,
  ...rest
}) => {
  // Default animation settings
  const defaultAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  };

  const animationProps = animation || defaultAnimation;
  
  // Calculate padding based on disableGutters prop
  const gutters = disableGutters ? 0 : { xs: 2, sm: 3, md: 4 };
  
  return (
    <Box
      component={MotionBox}
      maxWidth={maxWidth}
      px={gutters}
      sx={{
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: flexContainer ? 'flex' : 'block',
        ...sx
      }}
      {...animationProps}
      {...rest}
    >
      {children}
    </Box>
  );
};
