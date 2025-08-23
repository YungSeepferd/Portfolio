import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IconProps extends Omit<SvgIconProps, 'color'> {
  /**
   * The name of the icon
   */
  name?: string;
  
  /**
   * The icon component to render
   */
  icon?: React.ReactNode;
  
  /**
   * The size of the icon
   */
  size?: 'small' | 'medium' | 'large' | number;
  
  /**
   * The color of the icon
   */
  color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error' | string;
}

/**
 * Icon component that standardizes icon rendering throughout the application
 */
const Icon: React.FC<IconProps> = ({
  name,
  icon,
  size = 'medium',
  color = 'inherit',
  sx = {},
  ...props
}) => {
  // Determine size in pixels
  const getSize = (): number => {
    if (typeof size === 'number') {
      return size;
    }
    
    const sizeMap: Record<string, number> = {
      small: 16,
      medium: 24,
      large: 32,
    };
    
    return sizeMap[size] || sizeMap.medium;
  };
  
  // If an icon component is provided, render it
  if (icon) {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, {
        ...props,
        sx: {
          ...sx,
          fontSize: getSize(),
          color: color,
        },
      });
    }
    return <>{icon}</>;
  }
  
  // If no icon is provided, render a simple placeholder
  return (
    <SvgIcon
      {...props}
      sx={{
        fontSize: getSize(),
        color: color,
        ...sx,
      }}
    >
      {/* Default icon if nothing is provided */}
      <rect x="3" y="3" width="18" height="18" fill="currentColor" opacity="0.3" />
      <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z" />
    </SvgIcon>
  );
};

export default Icon;
