import React from 'react';
import {
  CircularProgress,
  LinearProgress,
  Box,
  Typography,
  CircularProgressProps,
  LinearProgressProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Styled motion div
const MotionBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type ProgressVariant = 'circular' | 'linear';

export interface ProgressProps {
  /**
   * The variant of the progress indicator
   */
  variant?: ProgressVariant;
  
  /**
   * The value of the progress indicator (0-100)
   */
  value?: number;
  
  /**
   * If true, the progress will be indeterminate
   */
  isIndeterminate?: boolean;
  
  /**
   * If true, show the progress value as text
   */
  showValue?: boolean;
  
  /**
   * The size of the circular progress
   */
  size?: number | string;
  
  /**
   * The thickness of the circular progress
   */
  thickness?: number;
  
  /**
   * The color of the progress indicator
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  
  /**
   * Custom label to display with the progress
   */
  label?: string;
  
  /**
   * Animation settings for the progress container
   */
  animation?: {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
  };
  
  /**
   * Props passed to the CircularProgress component
   */
  circularProgressProps?: Partial<CircularProgressProps>;
  
  /**
   * Props passed to the LinearProgress component
   */
  linearProgressProps?: Partial<LinearProgressProps>;
}

/**
 * Enhanced Progress component with animation capabilities
 * Supports both circular and linear progress indicators
 */
export const Progress: React.FC<ProgressProps> = ({
  variant = 'circular',
  value = 0,
  isIndeterminate = false,
  showValue = false,
  size = 40,
  thickness = 3.6,
  color = 'primary',
  label,
  animation,
  circularProgressProps,
  linearProgressProps
}) => {

  
  // Default animation settings
  const defaultAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };
  
  const animationProps = animation || defaultAnimation;
  
  return (
    <MotionBox {...animationProps}>
      {variant === 'circular' ? (
        <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress 
            variant={isIndeterminate ? 'indeterminate' : 'determinate'}
            value={value}
            size={size}
            thickness={thickness}
            color={color}
            {...circularProgressProps}
          />
          
          {showValue && !isIndeterminate && (
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(value)}%`}</Typography>
            </Box>
          )}
          
          {label && (
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {label}
            </Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <LinearProgress
            variant={isIndeterminate ? 'indeterminate' : 'determinate'}
            value={value}
            color={color}
            {...linearProgressProps}
          />
          
          {(showValue || label) && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1
            }}>
              {label && (
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
              )}
              
              {showValue && !isIndeterminate && (
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round(value)}%`}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </MotionBox>
  );
};
