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
    <Container
      maxWidth={maxWidth}
      sx={{
        px: {
          xs: theme.spacing(3), // Increased from 2 to 3 (24px)
          sm: theme.spacing(5), // Increased from 4 to 5 (40px)
          md: theme.spacing(6),
          lg: theme.spacing(8),
        },
      }}
      {...props}
    >
      {title && (
        <Typography
          variant={titleVariant}
          component="h2"
          gutterBottom
          sx={{
            mb: subtitle ? 1 : 3,
          }}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography variant={subtitleVariant} color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
      )}

      <Box sx={{ mb: spacing }}>{children}</Box>
    </Container>
  );
};

export default ContentWrapper;
