import React from 'react';
import { Button, ListItem, Stack } from '@mui/material';
import { scroller } from 'react-scroll';

/**
 * NavLinks component for rendering navigation items
 * @param {Array} navItems - Navigation items array
 * @param {string} variant - 'desktop' | 'mobile'
 * @param {function} [onClick] - Optional click handler (for mobile drawer)
 */
const NavLinks = ({ navItems, variant = 'desktop', onClick }) => {
  // Handler to scroll to section
  const handleScroll = (target) => {
    scroller.scrollTo(target, {
      smooth: true,
      offset: -70,
      duration: 500,
    });
    if (onClick) onClick();
  };

  if (variant === 'mobile') {
    return navItems.map((item) => (
      <ListItem key={item.name} disablePadding sx={{ justifyContent: 'center', mb: 1 }}>
        <Button
          variant={item.isCallToAction ? 'contained' : 'text'}
          color={item.isCallToAction ? 'secondary' : 'inherit'}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: item.isCallToAction ? '50px' : 'default',
            textTransform: 'none',
          }}
          onClick={() => handleScroll(item.target)}
        >
          {item.name}
        </Button>
      </ListItem>
    ));
  }

  // Desktop: use Stack for spacing and alignment
  return (
    <Stack direction="row" alignItems="center" gap={2} pr={{ md: 3, lg: 5 }}>
      {navItems.map((item, idx) => (
        <Button
          key={item.target}
          variant={item.isCallToAction ? 'contained' : 'text'}
          color={item.isCallToAction ? 'secondary' : 'inherit'}
          sx={{
            ml: idx === 0 ? 0 : 2,
            px: item.isCallToAction ? 3 : 2,
            py: item.isCallToAction ? 0.5 : 'auto',
            borderRadius: item.isCallToAction ? '50px' : 'default',
            position: 'relative',
            textTransform: 'none',
            fontWeight: 500,
          }}
          onClick={() => handleScroll(item.target)}
        >
          {item.name}
        </Button>
      ))}
    </Stack>
  );
};

export default NavLinks;
