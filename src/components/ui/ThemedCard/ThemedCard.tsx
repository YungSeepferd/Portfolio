import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, SxProps, Theme, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  getElevation,
  createTransition,
  getColorWithAlpha,
} from '../../../utils/theme/theme-utils';

// Create a motion version of the Box component
const MotionDiv = motion.div;

/**
 * ThemedCard - A theme-consistent card component
 */
export interface ThemedCardProps {
  /**
   * Card title
   */
  title?: string;
  
  /**
   * Optional card subtitle
   */
  subtitle?: string;
  
  /**
   * Card content
   */
  children?: React.ReactNode;
  
  /**
   * Card actions
   */
  actions?: React.ReactNode;
  
  /**
   * Card variant
   */
  variant?: 'default' | 'featured' | 'outlined';
  
  /**
   * Card elevation level (1-5)
   */
  elevation?: number;
  
  /**
   * Additional MUI styling
   */
  sx?: SxProps<Theme>;
}

const ThemedCard: React.FC<ThemedCardProps> = ({
  title,
  subtitle,
  children,
  actions,
  variant = 'default',
  elevation = 2,
  sx = {},
}) => {
  // Use the theme hook to access the current theme
  const theme = useTheme();

  const getCardStyles = () => {
    // Base styles
    const baseStyles = {
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      boxShadow: getElevation(theme, elevation),
      transition: createTransition(theme, ['transform', 'box-shadow'], 'medium', 'standard'),
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
    };

    // Variant-specific styles
    switch (variant) {
      case 'featured':
        return {
          ...baseStyles,
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          boxShadow: getElevation(theme, elevation + 1),
          backgroundColor: getColorWithAlpha(theme, 'primary.main', 0.05),
        };
      case 'outlined':
        return {
          ...baseStyles,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
        };
      default:
        return baseStyles;
    }
  };

  // Animation configuration
  const animationVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <Box 
      component={MotionDiv}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={animationVariants}
      whileHover={{
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      sx={{
        height: '100%',
        display: 'flex',
      }}
    >
      <Card
        sx={{
          ...getCardStyles(),
          ...sx,
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {title && (
            <Typography
              variant="h5"
              component="h2"
              color="primary"
              sx={{
                mb: theme.spacing(subtitle ? 1 : 2),
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          )}

          {subtitle && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                mb: theme.spacing(2),
              }}
            >
              {subtitle}
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }}>{children}</Box>
        </CardContent>

        {actions && (
          <CardActions
            sx={{
              padding: theme.spacing(2),
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: getColorWithAlpha(theme, 'background.default', 0.4),
            }}
          >
            {actions}
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default ThemedCard;
