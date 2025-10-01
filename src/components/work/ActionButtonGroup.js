import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import modalMobileTokens from '../../theme/components/modalMobile';

/**
 * ActionButtonGroup Component
 * Implements split button pattern with primary action + dropdown for additional actions.
 * Reduces visible button count while maintaining access to all actions.
 * 
 * @param {Array} actions - Array of action objects with { label, icon, onClick, href, contentType }
 * @param {number} maxVisible - Maximum number of visible buttons (default: responsive)
 * @param {string} size - Button size (small/medium/large)
 * @param {string} density - Button density (compact/comfortable)
 */
const ActionButtonGroup = ({
  actions = [],
  maxVisible,
  size = 'small',
  density = 'compact',
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [anchorEl, setAnchorEl] = useState(null);

  if (!actions.length) return null;

  // Determine responsive max visible buttons
  const responsiveMaxVisible = maxVisible || (
    isMobile
      ? modalMobileTokens.actionButtons.maxVisible.xs
      : isTablet
        ? modalMobileTokens.actionButtons.maxVisible.sm
        : modalMobileTokens.actionButtons.maxVisible.md
  );

  // Split actions into visible and menu items
  const primaryAction = actions[0];
  const visibleSecondaryActions = actions.slice(1, responsiveMaxVisible);
  const menuActions = actions.slice(responsiveMaxVisible);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (action.onClick) {
      action.onClick();
    }
    handleMenuClose();
  };

  // Button styling from modalMobileTokens
  const buttonHeight = modalMobileTokens.actionButtons.height;
  const buttonFontSize = modalMobileTokens.actionButtons.fontSize;
  const iconSize = modalMobileTokens.actionButtons.iconSize;

  const isCompact = density === 'compact' || size === 'small';
  const paddingX = isCompact
    ? { xs: theme.spacing(1), sm: theme.spacing(1.5), md: theme.spacing(2) }
    : { xs: theme.spacing(1.25), sm: theme.spacing(1.75), md: theme.spacing(2.25) };
  const paddingY = isCompact
    ? { xs: theme.spacing(0.5), sm: theme.spacing(0.625), md: theme.spacing(0.75) }
    : { xs: theme.spacing(0.625), sm: theme.spacing(0.75), md: theme.spacing(0.875) };

  const buttonBaseStyles = {
    height: buttonHeight,
    minHeight: modalMobileTokens.actionButtons.minHeight,
    fontSize: buttonFontSize,
    textTransform: 'none',
    px: paddingX,
    py: paddingY,
    '& .MuiButton-startIcon': {
      marginRight: { xs: theme.spacing(0.5), sm: theme.spacing(0.75), md: theme.spacing(1) },
      '& > *:nth-of-type(1)': {
        fontSize: iconSize,
      },
    },
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={modalMobileTokens.actionButtons.gap}
      useFlexGap
      sx={{
        width: '100%',
        alignItems: { xs: 'stretch', sm: 'center' },
        ...sx,
      }}
    >
      {/* Primary Action with Optional Dropdown */}
      <ButtonGroup
        variant="contained"
        size={size}
        sx={{
          boxShadow: theme.shadows[2],
          '& .MuiButton-root': {
            borderRadius: 0,
          },
        }}
      >
        <Button
          startIcon={primaryAction.icon}
          onClick={primaryAction.onClick}
          href={primaryAction.href}
          target={primaryAction.href ? '_blank' : undefined}
          rel={primaryAction.href ? 'noopener noreferrer' : undefined}
          sx={{
            ...buttonBaseStyles,
            flex: 1,
            minWidth: { xs: 'auto', sm: 120, md: 140 },
          }}
        >
          {primaryAction.label}
        </Button>
        {menuActions.length > 0 && (
          <Button
            size={size}
            onClick={handleMenuOpen}
            aria-label="More actions"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            sx={{
              px: { xs: 0.5, sm: 0.75, md: 1 },
              minWidth: 'auto',
              height: buttonHeight,
            }}
          >
            <ArrowDropDownIcon />
          </Button>
        )}
      </ButtonGroup>

      {/* Visible Secondary Actions */}
      {visibleSecondaryActions.map((action) => (
        <Button
          key={action.label}
          variant="outlined"
          size={size}
          startIcon={action.icon}
          onClick={action.onClick}
          href={action.href}
          target={action.href ? '_blank' : undefined}
          rel={action.href ? 'noopener noreferrer' : undefined}
          sx={{
            ...buttonBaseStyles,
            minWidth: { xs: 'auto', sm: 100, md: 120 },
            borderRadius: 0,
          }}
        >
          {action.label}
        </Button>
      ))}

      {/* Dropdown Menu for Additional Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        elevation={modalMobileTokens.actionButtons.menuElevation || 8}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            minWidth: modalMobileTokens.actionButtons.menuMinWidth || 200,
            mt: 0.5,
          },
        }}
      >
        {menuActions.map((action) => (
          <MenuItem
            key={action.label}
            onClick={() => handleMenuItemClick(action)}
            component={action.href ? 'a' : 'li'}
            href={action.href}
            target={action.href ? '_blank' : undefined}
            rel={action.href ? 'noopener noreferrer' : undefined}
            sx={{
              py: 1.5,
              px: 2,
            }}
          >
            {action.icon && (
              <ListItemIcon sx={{ minWidth: 36 }}>
                {action.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={action.label}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

ActionButtonGroup.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      href: PropTypes.string,
      contentType: PropTypes.string,
    })
  ).isRequired,
  maxVisible: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  density: PropTypes.oneOf(['compact', 'comfortable']),
  sx: PropTypes.object,
};

export default ActionButtonGroup;
