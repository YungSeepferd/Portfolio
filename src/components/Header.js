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
    { name: 'Contact', target: 'contact' }
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
          color: theme.palette.background.default,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -2,
            left: 0,
            width: 0,
            height: 2,
            backgroundColor: theme.palette.primary.main,
            transition: 'width 0.3s ease',
          },
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            '&::after': {
              width: '100%',
            },
          },
          '&.active': {
            color: theme.palette.primary.main,
            '&::after': {
              width: '100%',
            },
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
                  color: theme.palette.background.default,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'rgba(83, 99, 238, 0.08)',
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
        position="sticky" 
        elevation={isScrolled ? 4 : 0}
        sx={{
          backgroundColor: '#f2f2f2',
          borderBottom: isScrolled ? `1px solid rgba(14, 26, 39, 0.1)` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem',
              color: theme.palette.background.default,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box 
              component="span"
              sx={{ 
                color: theme.palette.primary.main,
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
                color: theme.palette.background.default 
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item, index) => navButton(item, index))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
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