import React from 'react';
import PropTypes from 'prop-types';
import { Button, useTheme } from '@mui/material';
import { useModalContext } from '../../context/ModalContext';

/**
 * ActionButton - A consistent button component for project actions
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Button text
 * @param {string} props.href - URL to navigate to
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.variant - Button variant (contained, outlined)
 * @param {string} props.color - Button color
 * @param {string} props.size - Button size
 * @param {Object} props.sx - Additional styles
 * @param {boolean} props.openInPopup - Whether to open in a popup
 * @param {string} props.contentType - Type of content ('pdf', 'iframe', 'external')
 * @param {string} props.forceColor - Force a specific color for the button
 */
const ActionButton = ({ 
  label, 
  href, 
  icon, 
  variant = 'contained', // changed from 'projectAction' to 'contained'
  color = 'primary',
  size = 'small',
  onClick,
  sx = {},
  openInPopup = true,
  contentType = 'external',
  forceColor, // new prop
  ...props 
}) => {
  const theme = useTheme();
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
  
  const buttonColor = determineColor();
  
  // Handle click based on content type
  const handleClick = (e) => {
    // If user provided a custom onClick, use that
    if (onClick) {
      onClick(e);
      return;
    }

    // Prevent default link behavior if we're opening in a popup
    if (openInPopup) {
      e.preventDefault();
      
      // Handle different content types
      if (contentType === 'pdf' && href) {
        // Ensure we're using the correct path format for PDFs
        const pdfPath = href.startsWith('/') ? href : `/${href}`;
        openPdf(pdfPath, label);
      } else if (contentType === 'iframe' && href) {
        openIframe(href, label);
      } else if (contentType === 'external' && href) {
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
        ...sx
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  sx: PropTypes.object,
  openInPopup: PropTypes.bool,
  contentType: PropTypes.oneOf(['pdf', 'iframe', 'external']),
  forceColor: PropTypes.string, // new prop
  id: PropTypes.string
};

export default ActionButton;
