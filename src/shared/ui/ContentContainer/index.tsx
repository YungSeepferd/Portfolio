import { ElementType, ReactNode } from 'react';
import { Box, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

type MaxWidthType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

interface ContentContainerProps {
  children: ReactNode;
  component?: ElementType;
  maxWidth?: MaxWidthType;
  sx?: SxProps<Theme>;
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
}: ContentContainerProps) => {
  return (
    <Box
      component={component}
      sx={{
        width: '100%',
        maxWidth: theme => maxWidth ? theme.breakpoints.values[maxWidth as keyof typeof theme.breakpoints.values] || 'none' : 'none',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        ...(sx || {}),
      }}
    >
      {children}
    </Box>
  );
};

export default ContentContainer;
