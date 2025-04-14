import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

/**
 * ContentWrapper Component
 * 
 * A standardized wrapper for content sections that correctly applies
 * typography settings following MUI best practices.
 */
const ContentWrapper = ({ 
  children, 
  title, 
  subtitle,
  maxWidth = 'lg',
  spacing = 4,
  titleVariant = 'h2',
  subtitleVariant = 'body1',
  ...props 
}) => {
  const theme = useTheme();
  
  return (
    <Container maxWidth={maxWidth} {...props}>
      {title && (
        <Typography 
          variant={titleVariant} 
          component="h2" 
          gutterBottom
          sx={{ 
            mb: subtitle ? 1 : 3,
            // Theme typography values are properly inherited
            // No need to set fontWeight if using variant
          }}
        >
          {title}
        </Typography>
      )}
      
      {subtitle && (
        <Typography 
          variant={subtitleVariant} 
          color="text.secondary" 
          sx={{ mb: 3 }}
        >
          {subtitle}
        </Typography>
      )}
      
      {/* Example of properly using strong element with theme-defined font weight */}
      <Box sx={{ mb: spacing }}>
        {children}
      </Box>
    </Container>
  );
};

export default ContentWrapper;
