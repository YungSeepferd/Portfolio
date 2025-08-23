import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, useTheme } from '@mui/material';
import { resolveMediaPath, getPlaceholderImage } from '../../../utils/media';

export interface AvatarProps extends Omit<MuiAvatarProps, 'variant'> {
  /**
   * The image source for the avatar
   */
  src?: string;
  
  /**
   * Alt text for the avatar image
   */
  alt?: string;
  
  /**
   * The size of the avatar
   */
  size?: 'small' | 'medium' | 'large' | number;
  
  /**
   * The variant of the avatar
   */
  variant?: 'circular' | 'rounded' | 'square';
  
  /**
   * Whether to use a placeholder if the image fails to load
   */
  usePlaceholder?: boolean;
}

/**
 * Enhanced Avatar component with consistent styling and support for responsive sizes
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'medium',
  variant = 'circular',
  usePlaceholder = true,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  
  // Resolve image path
  const resolvedSrc = src ? resolveMediaPath(src, 'image') : undefined;
  
  // Determine size in pixels
  const getSize = (): number => {
    if (typeof size === 'number') {
      return size;
    }
    
    // Convert theme spacing to numbers
    const spacing = (multiplier: number): number => {
      const spacingUnit = parseInt(theme.spacing(1).replace('px', ''));
      return spacingUnit * multiplier;
    };
    
    const sizeMap: Record<string, number> = {
      small: spacing(4),  // 32px at default spacing
      medium: spacing(5), // 40px at default spacing
      large: spacing(7),  // 56px at default spacing
    };
    
    return sizeMap[size] || sizeMap.medium;
  };
  
  // Handle image load error
  const handleError = (event: React.SyntheticEvent) => {
    if (usePlaceholder) {
      // Use placeholder image
      const placeholderSrc = getPlaceholderImage('avatar');
      const img = event.target as unknown as { src: string };
      img.src = placeholderSrc;
    }
  };
  
  const sizeValue = getSize();
  
  return (
    <MuiAvatar
      src={resolvedSrc}
      alt={alt}
      variant={variant}
      imgProps={{ onError: handleError }}
      sx={{
        width: sizeValue,
        height: sizeValue,
        ...sx,
      }}
      {...props}
    />
  );
};

export default Avatar;
