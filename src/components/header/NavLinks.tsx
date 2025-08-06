import React from 'react';
import { Button, ListItem, Stack } from '@mui/material';
import { scroller } from 'react-scroll';

export interface NavItem {
  name: string;
  target: string;
  isCallToAction?: boolean;
}

export interface NavLinksProps {
  navItems: NavItem[];
  variant?: 'desktop' | 'mobile';
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ navItems, variant = 'desktop', onClick }) => {
  const handleScroll = (target: string): void => {
    scroller.scrollTo(target, {
      smooth: true,
      offset: -70,
      duration: 500,
    });
    if (onClick) onClick();
  };

  if (variant === 'mobile') {
    return (
      <>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            disablePadding
            sx={{ justifyContent: 'center', mb: 1 }}
          >
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
        ))}
      </>
    );
  }

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
