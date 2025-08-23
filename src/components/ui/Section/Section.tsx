import React from 'react';
import { Box, BoxProps, styled, useTheme } from '@mui/material';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useThemeMode } from '../../../context/theme-context';
import { useAccessibility } from '../../../context/accessibility-context';

// Create a styled motion component based on MUI Box
const MotionSection = styled(motion.section)`
  transition: background-color 0.3s ease;
`;

export interface SectionProps extends Omit<HTMLMotionProps<'section'>, keyof BoxProps> {
  /**
   * Unique identifier for the section
   */
  id?: string;
  
  /**
   * Background color of the section
   */
  backgroundColor?: string;
  
  /**
   * Full height section (100vh)
   */
  fullHeight?: boolean;
  
  /**
   * Full width section (100vw)
   */
  fullWidth?: boolean;
  
  /**
   * Padding for the section (mui spacing)
   */
  padding?: number | string;
  
  /**
   * Margin for the section (mui spacing)
   */
  margin?: number | string;
  
  /**
   * Animation settings for the section
   */
  animation?: {
    initial?: any;
    animate?: any;
    transition?: any;
    variants?: any;
  };
  
  /**
   * Children elements to be rendered inside the section
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
 * Section component for consistent page sections
 * Enhanced with motion capabilities and styling options
 */
export const Section: React.FC<SectionProps> = ({
  id,
  backgroundColor,
  fullHeight = false,
  fullWidth = false,
  padding = 3,
  margin = 0,
  animation,
  children,
  sx,
  ...rest
}) => {
  const theme = useTheme();
  const { isDarkMode } = useThemeMode();
  const { reducedMotion } = useAccessibility();

  // Default animation settings, respecting reduced motion preferences
  const defaultAnimation = reducedMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const animationProps = animation || defaultAnimation;
  
  return (
    <Box
      component={MotionSection}
      id={id}
      role="region"
      aria-label={id || 'content section'}
      sx={{
        backgroundColor: backgroundColor || theme.palette.background.default,
        height: fullHeight ? '100vh' : 'auto',
        width: fullWidth ? '100vw' : '100%',
        padding,
        margin,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.shape.borderRadius,
        boxShadow: isDarkMode ? 'none' : theme.shadows[1],
        ...sx
      }}
      {...animationProps}
      {...rest}
    >
      {children}
    </Box>
  );
};
