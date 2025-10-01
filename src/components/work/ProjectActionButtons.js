import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useModalContext } from '../../context/ModalContext';
import { resolveMediaPath } from '../../utils/MediaPathResolver';
import { getTypographyPreset } from '../../theme/presets';
import modalMobileTokens from '../../theme/components/modalMobile';
import ActionButtonGroup from './ActionButtonGroup';

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
  density = 'compact',
  ...props 
}) => {
  const theme = useTheme();
  const buttonPresetKey = size === 'large' ? 'button' : size === 'small' ? 'buttonCompact' : 'button';
  const buttonPreset = getTypographyPreset(theme, buttonPresetKey);
  const { openPdf, openIframe, openExternalContent } = useModalContext();

  const normalizedLabel = label ? label.toLowerCase() : '';

  const determineColor = () => {
    if (forceColor) return forceColor;
    if (contentType === 'pdf') return 'secondary';
    if (normalizedLabel.includes('github')) return 'info';
    if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return 'success';
    if (contentType === 'iframe') return 'info';
    return color;
  };
  const buttonColor = determineColor();
  const outlineColor = (theme.palette[buttonColor] && theme.palette[buttonColor].main) || theme.palette.primary.main;

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

  const isCompact = density === 'compact' || size === 'small';
  
  // Use responsive tokens from modalMobileTokens
  const buttonHeight = modalMobileTokens.actionButtons.height;
  const buttonFontSize = modalMobileTokens.actionButtons.fontSize;
  const iconSizeValue = modalMobileTokens.actionButtons.iconSize;
  
  const paddingX = isCompact 
    ? { xs: theme.spacing(1), sm: theme.spacing(1.5), md: theme.spacing(2) } 
    : { xs: theme.spacing(1.25), sm: theme.spacing(1.75), md: theme.spacing(2.25) };
  const paddingY = isCompact 
    ? { xs: theme.spacing(0.5), sm: theme.spacing(0.625), md: theme.spacing(0.75) } 
    : { xs: theme.spacing(0.625), sm: theme.spacing(0.75), md: theme.spacing(0.875) };

  return (
    <Button
      id={`action-button-${label ? label.toLowerCase().replace(/\s+/g, '-') : 'unnamed'}`}
      variant="glassmorphic"
      size={size}
      color={buttonColor}
      href={href}
      onClick={handleClick}
      startIcon={icon}
      sx={{
        minWidth: { xs: 'auto', sm: 100, md: 120 },
        height: buttonHeight,
        minHeight: modalMobileTokens.actionButtons.minHeight,
        ...buttonPreset.sx,
        fontSize: buttonFontSize,
        textTransform: 'none',
        px: paddingX,
        py: paddingY,
        '& .MuiButton-startIcon': {
          marginRight: { xs: theme.spacing(0.5), sm: theme.spacing(0.75), md: theme.spacing(1) },
          '& > *:nth-of-type(1)': {
            fontSize: iconSizeValue,
          },
        },
        // Glassmorphic overrides
        background: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(5, 38, 45, 0.20)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: theme.palette.mode === 'dark'
          ? `1px solid rgba(255, 255, 255, 0.3)`
          : `1px solid rgba(5, 38, 45, 0.3)`,
        color: theme.palette.common.white,
        borderRadius: 0,
        boxShadow: theme.shadows[2],
        transition: theme.transitions.create(['background-color', 'box-shadow', 'transform'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(5, 38, 45, 0.30)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: theme.palette.mode === 'dark'
            ? `1px solid rgba(255, 255, 255, 0.4)`
            : `1px solid rgba(5, 38, 45, 0.4)`,
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        },
        '&:active': {
          transform: 'translateY(0)',
          background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.20)'
            : 'rgba(5, 38, 45, 0.25)',
        },
        '&:focus': {
          outline: `2px solid ${outlineColor}`,
          outlineOffset: 2,
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
  id: PropTypes.string,
  density: PropTypes.oneOf(['compact', 'comfortable']),
};

const standardizeAction = (action) => {
  let contentType = action.contentType || 'external';
  if (!action.contentType && action.url) {
    if (action.url.endsWith('.pdf')) contentType = 'pdf';
    else if (action.url.includes('figma.com') || action.url.includes('prototype')) contentType = 'iframe';
  }
  const resolvedUrl = resolveMediaPath(action.url || action.href || '#');

  const getLinkIcon = (label) => {
    if (action.icon) return action.icon;
    const normalizedLabel = label ? label.toLowerCase() : '';
    if (normalizedLabel.includes('github')) return <GitHubIcon fontSize="small" />;
    if (contentType === 'pdf') return <PictureAsPdfIcon fontSize="small" />;
    return <LaunchIcon fontSize="small" />;
  };

  const getLinkColor = (label) => {
    if (!label) return 'primary';
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel.includes('github')) return 'info';
    if (contentType === 'pdf' || normalizedLabel.includes('pdf') || normalizedLabel.includes('presentation')) return 'secondary';
    if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return 'success';
    return 'primary';
  };

  return {
    ...action,
    label: action.label || 'View',
    href: resolvedUrl,
    icon: getLinkIcon(action.label),
    color: action.color || getLinkColor(action.label),
    contentType,
    openInPopup: action.openInPopup !== false,
    variant: action.variant === 'projectAction' ? 'outlined' : (action.variant || 'outlined'),
  };
};

const ProjectActionButtons = ({
  actions = [],
  layout = 'row',
  maxButtons = 4,
  size = 'small',
  density = 'compact',
  useSplitButton = false, // Feature flag for new ActionButtonGroup
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  if (!actions.length) return null;
  
  // Standardize all actions
  const standardizedActions = actions.map(action => standardizeAction(action));
  
  // Use new ActionButtonGroup if enabled
  if (useSplitButton) {
    return (
      <ActionButtonGroup
        actions={standardizedActions}
        maxVisible={maxButtons}
        size={size}
        density={density}
        {...rest}
      />
    );
  }
  
  // Legacy implementation (original behavior)
  // Responsive max buttons based on screen size
  const responsiveMaxButtons = isMobile 
    ? modalMobileTokens.actionButtons.maxVisible.xs 
    : isTablet 
      ? modalMobileTokens.actionButtons.maxVisible.sm 
      : maxButtons;
  
  const shouldWrap = layout === 'column' ? false : actions.length > 3 || density === 'compact';
  const stackSpacing = layout === 'column'
    ? modalMobileTokens.actionButtons.gap
    : { xs: 0.5, sm: density === 'compact' ? 0.75 : 1, md: 1 };

  return (
    <Stack
      direction={layout === 'column' ? 'column' : 'row'}
      spacing={stackSpacing}
      flexWrap={layout === 'column' ? 'nowrap' : { xs: 'wrap', sm: shouldWrap ? 'wrap' : 'nowrap' }}
      alignItems={layout === 'column' ? 'flex-start' : 'center'}
      justifyContent={layout === 'column' ? 'flex-start' : 'center'}
      sx={{ width: '100%', rowGap: layout === 'column' ? 0.5 : undefined }}
    >
      {standardizedActions.slice(0, responsiveMaxButtons).map((action, idx) => (
        <ActionButton
          key={action.label + idx}
          {...action}
          size={size}
          density={density}
          {...rest}
          sx={{
            whiteSpace: 'nowrap',
            minWidth: 'unset',
            ...action.sx,
          }}
        />
      ))}
    </Stack>
  );
};

ProjectActionButtons.propTypes = {
  actions: PropTypes.array,
  layout: PropTypes.oneOf(['row', 'column']),
  maxButtons: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  density: PropTypes.oneOf(['compact', 'comfortable']),
  useSplitButton: PropTypes.bool,
};

export default ProjectActionButtons;
