import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useModalContext } from '../../../context/modal-context';

/**
 * ActionButton - A consistent button component for project actions
 */
export interface ActionButtonProps extends Omit<ButtonProps, 'color'> {
  /**
   * Button text
   */
  label: string;
  
  /**
   * URL to navigate to
   */
  href?: string;
  
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  
  /**
   * Button variant
   */
  variant?: 'contained' | 'outlined' | 'text';
  
  /**
   * Button color - supports extended palette
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'accent' | string;
  
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Whether to open in a popup
   */
  openInPopup?: boolean;
  
  /**
   * Type of content
   */
  contentType?: 'pdf' | 'iframe' | 'external';
  
  /**
   * Force a specific color for the button
   */
  forceColor?: string;
}

/**
 * ActionButton component for project actions with consistent styling and behavior
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  href,
  icon,
  variant = 'contained',
  color = 'primary',
  size = 'small',
  onClick,
  sx = {},
  openInPopup = true,
  contentType = 'external',
  forceColor,
  ...props
}) => {
  const { openPdf, openIframe, openExternalContent } = useModalContext();

  // Determine color based on label content, unless forceColor is set
  const determineColor = () => {
    if (forceColor) return forceColor;
    if (!label) return color;

    const normalizedLabel = label.toLowerCase();

    if (normalizedLabel.includes('github')) return 'info';
    if (normalizedLabel.includes('paper') || normalizedLabel.includes('pdf')) return 'secondary';
    if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return 'success';

    // Default to accent for all other cases
    return 'accent';
  };

  const buttonColor = determineColor() as any; // Type cast for MUI ButtonProps compatibility

  // Handle click based on content type
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If user provided a custom onClick, use that
    if (onClick) {
      onClick(e);
      return;
    }

    // Prevent default link behavior if we're opening in a popup
    if (openInPopup && href) {
      e.preventDefault();

      // Handle different content types
      if (contentType === 'pdf') {
        // Ensure we're using the correct path format for PDFs
        const pdfPath = href.startsWith('/') ? href : `/${href}`;
        openPdf(pdfPath, label);
      } else if (contentType === 'iframe') {
        openIframe(href, label);
      } else if (contentType === 'external') {
        // Use the new external content modal for external links
        openExternalContent(href, label);
      }
    }
    // If not opening in popup, the default link behavior will happen
  };

  return (
    <Button
      id={`action-button-${label ? label.toLowerCase().replace(/\s+/g, '-') : 'unnamed'}`}
      variant={variant}
      size={size}
      color={buttonColor}
      href={href}
      onClick={handleClick}
      startIcon={icon}
      sx={{
        minWidth: 'auto',
        fontWeight: 'medium',
        fontSize: size === 'large' ? '0.875rem' : '0.75rem',
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
