/**
 * Button Style Utilities
 * 
 * This file centralizes styling for buttons used throughout the application
 * to ensure consistent appearance and behavior.
 */

import React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DesignIcon from '@mui/icons-material/DesignServices';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

/**
 * Get appropriate icon for a link based on its label
 * @param {string} label - The link label
 * @returns {React.ReactNode|null} - The icon component or null
 */
export const getLinkIcon = (label) => {
  if (!label) return null;
  
  const normalizedLabel = label.toLowerCase();
  
  if (normalizedLabel.includes('github')) {
    return <GitHubIcon fontSize="small" />;
  } else if (normalizedLabel.includes('paper') || normalizedLabel.includes('article')) {
    return <ArticleIcon fontSize="small" />;
  } else if (normalizedLabel.includes('pdf') || normalizedLabel.includes('presentation')) {
    return <PictureAsPdfIcon fontSize="small" />;
  } else if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) {
    return <DesignIcon fontSize="small" />;
  } else if (normalizedLabel.includes('view') || normalizedLabel.includes('visit')) {
    return <LaunchIcon fontSize="small" />;
  }
  
  return null;
};

/**
 * Get color for a button based on link type
 * @param {string} label - The link label
 * @returns {string} - The color name
 */
export const getLinkColor = (label) => {
  if (!label) return 'primary';
  
  const normalizedLabel = label.toLowerCase();
  
  if (normalizedLabel.includes('github')) {
    return 'info';
  } else if (normalizedLabel.includes('paper') || normalizedLabel.includes('pdf')) {
    return 'secondary';
  } else if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) {
    return 'success';
  }
  
  return 'primary';
};

/**
 * Get standardized button style properties
 * @param {Object} theme - The MUI theme object
 * @param {Object} options - Style options
 * @returns {Object} - Style object for sx prop
 */
export const getButtonStyles = (theme, options = {}) => {
  const { 
    isProminent = false, 
    size = 'small'
  } = options;
  
  return {
    minWidth: 'auto',
    fontWeight: 'medium',
    fontSize: size === 'large' ? '0.875rem' : '0.75rem',
    textTransform: 'none',
    borderRadius: theme.shape.borderRadius,
    px: size === 'large' ? theme.spacing(3) : theme.spacing(1.5),
    py: size === 'large' ? theme.spacing(1) : undefined,
    boxShadow: isProminent ? theme.shadows[2] : 'none',
    '&:hover': {
      boxShadow: isProminent ? theme.shadows[4] : theme.shadows[1],
    }
  };
};
