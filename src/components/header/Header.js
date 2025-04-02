import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, useMediaQuery, IconButton, Drawer, List, ListItem, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', target: 'hero' },
    { name: 'Work', target: 'work' },
    { name: 'About', target: 'about' },
    { name: 'Contact', target: 'contact', isCallToAction: true }
  ];

  const navButton = (item, index) => (
    <ScrollLink
      key={item.name}
      to={item.target}
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
    >
      <Button
        sx={{
          mx: 1,
          textTransform: 'none',
          fontWeight: 500,
          color: item.isCallToAction ? theme.palette.secondary.main : theme.palette.primary.contrastText,
          position: 'relative',
          border: item.isCallToAction ? `2px solid ${theme.palette.secondary.main}` : 'none',
          borderRadius: item.isCallToAction ? '20px' : 'inherit',
          padding: '4px 16px', // Apply consistent padding to all buttons
          '&::after': !item.isCallToAction ? {
            content: '""',
            position: 'absolute',
            bottom: -2,
            left: 0,
            width: 0,
            height: 2,
            backgroundColor: theme.palette.accent.main,
            transition: 'width 0.3s ease',
          } : {},
          '&:hover': {
            backgroundColor: item.isCallToAction ? 'rgba(194, 247, 80, 0.15)' : 'transparent',
            color: theme.palette.accent.main,
            boxShadow: item.isCallToAction ? `0 0 8px ${theme.palette.secondary.main}` : 'none',
            '&::after': !item.isCallToAction ? {
              width: '100%',
            } : {},
          },
          '&.active': {
            color: theme.palette.accent.main,
            '&::after': !item.isCallToAction ? {
              width: '100%',
            } : {},
          }
        }}
      >
        {item.name}
      </Button>
    </ScrollLink>
  );

  const drawer = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
      onClick={handleDrawerToggle}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton 
          edge="end" 
          sx={{ color: theme.palette.background.default }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ScrollLink
              to={item.target}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ width: '100%' }}
            >
              <Button
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  py: 1.5,
                  px: 2, // Add horizontal padding for consistency
                  color: item.isCallToAction ? theme.palette.secondary.main : theme.palette.background.default,
                  border: item.isCallToAction ? `2px solid ${theme.palette.secondary.main}` : 'none',
                  borderRadius: item.isCallToAction ? '20px' : 'inherit',
                  marginTop: item.isCallToAction ? 2 : 0,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: item.isCallToAction ? 'rgba(194, 247, 80, 0.15)' : 'rgba(83, 99, 238, 0.08)',
                  },
                }}
              >
                {item.name}
              </Button>
            </ScrollLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <AppBar 
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderBottom: isScrolled ? `1px solid rgba(14, 26, 39, 0.1)` : 'none',
          transition: 'all 0.3s ease',
          borderRadius: 0,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            backgroundColor: theme.palette.primary.main,
            px: { xs: 2, md: theme.heroLeftMargin || 8 }, // Match Hero.js left padding
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem',
              color: theme.palette.primary.contrastText,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box 
              component="span"
              sx={{ 
                color: theme.palette.primary.contrastText,
                mr: 0.5 
              }}
            >
              VG
            </Box> 
            Portfolio
          </Box>
          
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ 
                color: theme.palette.primary.contrastText
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box 
              sx={{ 
                display: 'flex',
                color: theme.palette.primary.contrastText
              }}
            >
              {navItems.map((item, index) => navButton(item, index))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Box sx={{ height: '64px' }} />
      
      <AnimatePresence>
        {mobileOpen && (
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            transitionDuration={{ enter: 300, exit: 200 }}
            PaperProps={{
              sx: {
                width: '70%',
                maxWidth: '300px',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;