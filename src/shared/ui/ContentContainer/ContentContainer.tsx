import { ComponentType } from 'react';
import { Box, BoxProps } from '@mui/material';

interface ContentContainerProps extends BoxProps {
  component?: ComponentType<any> | string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

/**
 * ContentContainer Component
 * 
 * A reusable container component that provides consistent spacing and max-width
 * constraints for content sections.
 */
const ContentContainer = ({
  children,
  component = 'div',
  maxWidth = 'lg',
  sx,
  ...props
}: ContentContainerProps) => {
  return (
    <Box
      component={component}
      sx={{
        width: '100%',
        maxWidth: theme => maxWidth ? theme.breakpoints.values[maxWidth] : 'none',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ContentContainer;
