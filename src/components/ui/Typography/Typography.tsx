import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

export interface TypographyProps extends Omit<MuiTypographyProps, 'color'> {
  /**
   * The content to display
   */
  children: React.ReactNode;
  
  /**
   * The variant of the typography
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
  
  /**
   * The color of the text
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | string;
  
  /**
   * Whether the text should have bold styling
   */
  bold?: boolean;
  
  /**
   * Whether the text should have italic styling
   */
  italic?: boolean;
  
  /**
   * Whether the text should have underline styling
   */
  underline?: boolean;
  
  /**
   * Whether the text should have strikethrough styling
   */
  strikethrough?: boolean;
  
  /**
   * The alignment of the text
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  
  /**
   * Custom spacing after the typography element
   */
  spacing?: number | string;
  
  /**
   * Whether to use a standardized animation for text transitions
   */
  animate?: boolean;
  
  /**
   * Whether to truncate text with an ellipsis
   */
  truncate?: boolean;
  
  /**
   * Maximum number of lines to display (requires truncate=true)
   */
  maxLines?: number;
  
  /**
   * Whether the typography should use a mono-spaced font
   */
  monospace?: boolean;
}

/**
 * Typography component with enhanced features and consistent styling
 */
const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'inherit',
  bold = false,
  italic = false,
  underline = false,
  strikethrough = false,
  align = 'inherit',
  spacing,
  animate = false,
  truncate = false,
  maxLines,
  monospace = false,
  sx = {},
  ...props
}) => {
  // Build extended styles based on props
  const extendedStyles: Record<string, any> = {};
  
  if (bold) {
    extendedStyles.fontWeight = 'bold';
  }
  
  if (italic) {
    extendedStyles.fontStyle = 'italic';
  }
  
  if (underline) {
    extendedStyles.textDecoration = 'underline';
  }
  
  if (strikethrough) {
    extendedStyles.textDecoration = underline ? 'line-through underline' : 'line-through';
  }
  
  if (spacing) {
    extendedStyles.marginBottom = spacing;
  }
  
  if (animate) {
    extendedStyles.transition = 'all 0.3s ease';
  }
  
  if (truncate) {
    extendedStyles.overflow = 'hidden';
    extendedStyles.textOverflow = 'ellipsis';
    extendedStyles.display = maxLines && maxLines > 1 ? '-webkit-box' : 'block';
    
    if (maxLines && maxLines > 1) {
      extendedStyles.WebkitLineClamp = maxLines;
      extendedStyles.WebkitBoxOrient = 'vertical';
    } else {
      extendedStyles.whiteSpace = 'nowrap';
    }
  }
  
  if (monospace) {
    extendedStyles.fontFamily = '"IBM Plex Mono", monospace';
  }
  
  return (
    <MuiTypography
      variant={variant}
      align={align}
      sx={{
        color,
        ...extendedStyles,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
