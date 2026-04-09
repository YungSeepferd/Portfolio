import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';

/**
 * MobileActionAccordion Component
 * 
 * Progressive disclosure pattern for mobile - shows action buttons in an accordion
 * Reduces information overload by hiding actions until user expands
 * 
 * @param {Array} actions - Array of action objects
 * @param {string} label - Accordion label (default: "Project Actions")
 * @param {boolean} defaultExpanded - Whether accordion starts expanded
 */
const MobileActionAccordion = ({
  actions = [],
  label = 'Project Actions',
  defaultExpanded = false,
  sx = {},
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!actions.length) return null;

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      disableGutters
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        '&:before': {
          display: 'none',
        },
        '& .MuiAccordionSummary-root': {
          minHeight: 48,
          px: 0,
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(5, 38, 45, 0.05)',
          borderRadius: 0,
          border: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.shorter,
          }),
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(5, 38, 45, 0.08)',
          },
        },
        '& .MuiAccordionDetails-root': {
          px: 0,
          pt: 2,
          pb: 0,
        },
        ...sx,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="project-actions-content"
        id="project-actions-header"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <LaunchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography variant="body2" fontWeight={500}>
            {label} ({actions.length})
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1.5}>
          {actions.map((action, index) => (
            <Button
              key={action.label || index}
              variant="glassmorphic"
              size="small"
              fullWidth
              startIcon={action.icon}
              onClick={action.onClick}
              href={action.href}
              target={action.href ? '_blank' : undefined}
              rel={action.href ? 'noopener noreferrer' : undefined}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                minHeight: 44,
                px: 2,
                py: 1,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
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
                transition: theme.transitions.create(['background-color', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(5, 38, 45, 0.30)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transform: 'translateX(4px)',
                },
                '&:active': {
                  transform: 'translateX(2px)',
                },
              }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

MobileActionAccordion.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      href: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string,
  defaultExpanded: PropTypes.bool,
  sx: PropTypes.object,
};

export default MobileActionAccordion;
