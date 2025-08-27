import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, useTheme } from '@mui/material';
import { useModalContext } from '../../context/ModalContext';
import { resolveMediaPath } from '../../utils/MediaPathResolver';

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
        fontWeight: 500,
        fontSize: size === 'large' ? '0.875rem' : '0.75rem',
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius,
        px: theme.spacing(2),
        py: theme.spacing(0.75),
        transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          boxShadow: variant === 'contained' ? theme.shadows[4] : theme.shadows[2],
        },
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
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

const standardizeAction = (action) => {
  const getLinkIcon = (label) => {
    if (!label) return undefined;
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel.includes('github')) return action.icon;
    if (normalizedLabel.includes('paper') || normalizedLabel.includes('article')) return action.icon;
    if (normalizedLabel.includes('pdf') || normalizedLabel.includes('presentation')) return action.icon;
    if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return action.icon;
    if (normalizedLabel.includes('view') || normalizedLabel.includes('visit')) return action.icon;
    return action.icon;
  };
  const getLinkColor = (label) => {
    if (!label) return 'primary';
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel.includes('github')) return 'info';
    if (normalizedLabel.includes('paper') || normalizedLabel.includes('pdf')) return 'secondary';
    if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return 'success';
    return 'primary';
  };
  let contentType = action.contentType || 'external';
  if (!action.contentType && action.url) {
    if (action.url.endsWith('.pdf')) contentType = 'pdf';
    else if (action.url.includes('figma.com') || action.url.includes('prototype')) contentType = 'iframe';
  }
  const resolvedUrl = resolveMediaPath(action.url || action.href || '#');
  return {
    ...action,
    label: action.label || 'View',
    href: resolvedUrl,
    icon: action.icon || getLinkIcon(action.label),
    color: action.color || getLinkColor(action.label),
    contentType,
    openInPopup: action.openInPopup !== false,
    variant: action.variant === 'projectAction' ? 'outlined' : (action.variant || 'outlined'),
  };
};

const ProjectActionButtons = ({ actions = [], layout = 'row', maxButtons = 4, size = 'small', ...rest }) => {
  if (!actions.length) return null;
  return (
    <Stack direction="row" spacing={1} flexWrap="nowrap" alignItems="center">
      {actions.slice(0, maxButtons).map((action, idx) => (
        <ActionButton
          key={action.label + idx}
          {...standardizeAction(action)}
          size={size}
          {...rest}
          sx={{
            whiteSpace: 'nowrap',
            minWidth: 'unset',
            px: 2,
            ...action.sx,
          }}
        />
      ))}
    </Stack>
  );
};

export default ProjectActionButtons;
