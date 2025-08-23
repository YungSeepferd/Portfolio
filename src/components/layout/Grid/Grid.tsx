import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Create a styled motion component based on MUI Grid
const MotionGrid = styled(motion.div)``;

export interface GridProps extends Omit<MuiGridProps, 'ref'> {
  /**
   * Animation settings for the grid
   */
  animation?: {
    initial?: any;
    animate?: any;
    transition?: any;
    variants?: any;
  };
}

/**
 * Enhanced Grid component with animation capabilities
 * Extends MUI Grid with motion animation features
 */
export const Grid: React.FC<GridProps> = ({
  container = false,
  item = false,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing = 0,
  justifyContent,
  alignItems,
  direction,
  wrap,
  animation,
  children,
  sx,
  ...rest
}) => {
  // Default animation settings
  const defaultAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  const animationProps = animation || defaultAnimation;

  return (
    <MuiGrid
      component={MotionGrid}
      container={container}
      item={item}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction={direction}
      wrap={wrap}
      sx={sx}
      {...animationProps}
      {...rest}
    >
      {children}
    </MuiGrid>
  );
};
