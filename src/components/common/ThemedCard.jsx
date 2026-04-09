/**
 * ThemedCard Component
 * 
 * A reusable card component that demonstrates proper theme usage with:
 * - Animation presets from theme
 * - Consistent spacing using theme values
 * - Elevation from theme utilities
 * - Color schemes from theme palette
 * - Responsive styling based on theme breakpoints
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { motion } from 'framer-motion';
import { getAnimation, getElevation, createTransition, getColorWithAlpha } from '../../utils/themeUtils';

/**
 * ThemedCard - A theme-consistent card component
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Optional card subtitle
 * @param {node} props.children - Card content
 * @param {node} props.actions - Card actions
 * @param {string} props.variant - Card variant ('default', 'featured', 'outlined')
 * @param {number} props.elevation - Card elevation level (1-5)
 * @param {Object} props.sx - Additional MUI styling
 */
const ThemedCard = ({ 
  title, 
  subtitle, 
  children, 
  actions, 
  variant = 'default', 
  elevation = 2,
  sx = {} 
}) => {
  const getCardStyles = (theme) => {
    // Base styles
    const baseStyles = {
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      boxShadow: getElevation(theme, elevation),
      transition: createTransition(
        theme, 
        ['transform', 'box-shadow'], 
        'medium', 
        'standard'
      ),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
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
  
  // Get animation settings from theme
  const cardAnimation = (theme) => getAnimation(theme, 'fadeIn');
  
  return (
    <Box
      component={motion.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={cardAnimation}
      whileHover={{ 
        scale: 1.02,
        boxShadow: (theme) => getElevation(theme, elevation + 1)
      }}
      transition={{ duration: 0.3 }}
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
      })}
    >
      <Card
        sx={(theme) => ({
          ...getCardStyles(theme),
          ...sx,
        })}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {title && (
            <Typography 
              variant="h5" 
              component="h2"
              color="primary"
              sx={(theme) => ({
                mb: theme.spacing(subtitle ? 1 : 2),
                fontWeight: 600,
              })}
            >
              {title}
            </Typography>
          )}
          
          {subtitle && (
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={(theme) => ({
                mb: theme.spacing(2),
              })}
            >
              {subtitle}
            </Typography>
          )}
          
          <Box sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        </CardContent>
        
        {actions && (
          <CardActions 
            sx={(theme) => ({
              padding: theme.spacing(2),
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: getColorWithAlpha(theme, 'background.default', 0.4),
            })}
          >
            {actions}
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

ThemedCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'featured', 'outlined']),
  elevation: PropTypes.number,
  sx: PropTypes.object,
};

export default ThemedCard;
