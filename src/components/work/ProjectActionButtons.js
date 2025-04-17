import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, useTheme } from '@mui/material';
import { useModalContext } from '../../context/ModalContext';

const ActionButton = ({ 
  label, 
  href, 
  icon, 
  variant = 'outlined',
  color = 'primary',
  size = 'small',
  onClick,
  sx = {},
  openInPopup = true,
  contentType = 'external',
  forceColor,
  ...props 
}) => {
  const theme = useTheme();
  const { openPdf, openIframe, openExternalContent } = useModalContext();

  const determineColor = () => {
    if (forceColor) return forceColor;
    if (!label) return color;
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel.includes('github')) return 'info';
    if (normalizedLabel.includes('paper') || normalizedLabel.includes('pdf')) return 'secondary';
    if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return 'success';
    return 'accent';
  };
  const buttonColor = determineColor();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (openInPopup) {
      e.preventDefault();
      if (contentType === 'pdf' && href) {
        const pdfPath = href.startsWith('/') ? href : `/${href}`;
        openPdf(pdfPath, label);
      } else if (contentType === 'iframe' && href) {
        openIframe(href, label);
      } else if (contentType === 'external' && href) {
        openExternalContent(href, label);
      }
    }
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
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius,
        boxShadow: variant === 'contained' ? theme.shadows[2] : 'none',
        '&:hover': {
          boxShadow: variant === 'contained' ? theme.shadows[4] : theme.shadows[1],
        },
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
  forceColor: PropTypes.string,
  id: PropTypes.string
};

const ProjectActionButtons = ({ actions = [], layout = 'row', maxButtons = 4, size = 'small', ...rest }) => {
  if (!actions.length) return null;
  return (
    <Stack direction={layout} spacing={1} flexWrap="wrap">
      {actions.slice(0, maxButtons).map((action, idx) => (
        <ActionButton key={action.label + idx} {...action} size={size} variant="projectAction" {...rest} />
      ))}
    </Stack>
  );
};

export default ProjectActionButtons;
