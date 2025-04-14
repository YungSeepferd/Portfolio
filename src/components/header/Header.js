import React, { useState, useEffect, useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

// Define navigation items
const navItems = [
  { name: 'Home', target: 'hero' },
  { name: 'About', target: 'about' },
  { name: 'Work', target: 'work' },
  { name: 'Contact', target: 'contact', isCallToAction: true }
];

const Header = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use a ref to track if this is the first render
  const isFirstMount = React.useRef(true);
  
  // Use fallback color if accent palette is not defined in the theme
  const accentColor = theme.palette.accent?.main || theme.palette.primary.main;
  
  // Get standardized animation from theme - use useMemo to prevent recreation
  const headerAnimation = useMemo(() => ({
    initial: isFirstMount.current ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 },
    animate: { y: 0, opacity: 1 },
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      delay: 0.2
    }
  }), []);

  useEffect(() => {
    // Update the ref after the first render
    if (isFirstMount.current) {
      isFirstMount.current = false;
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial scroll position check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Use theme-based colors for transparent header
  const transparentBgColor = mode === 'dark' 
    ? 'rgba(10, 22, 40, 0.7)'  // Dark mode transparent background
    : 'rgba(248, 250, 252, 0.7)'; // Light mode transparent background

  return (
    <motion.div
      initial={headerAnimation.initial}
      animate={headerAnimation.animate}
      transition={headerAnimation.transition}
      key="header-animation"
    >
      <AppBar 
        position="fixed" 
        elevation={isScrolled ? 4 : 0}
        sx={{
          backgroundColor: isScrolled 
            ? theme.palette.background.paper
            : transparentBgColor, // Use theme-based transparent background
          transition: theme.transitions.create(
            ['background-color', 'box-shadow'],
            { duration: 0.3 }
          ),
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled 
            ? `1px solid ${theme.palette.divider}`
            : 'none',
          color: theme.palette.text.primary,
          width: '100%',
        }}
      >
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            px: { 
              xs: '20px',
              sm: '30px',
              md: '40px',
              lg: '50px',
            },
            width: '100%',
            mx: 0,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
            {/* Logo/Brand */}
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <Box 
                component="div" 
                sx={{ 
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.5px',
                  color: theme.palette.primary.main,
                  paddingLeft: { xs: '0', sm: '20px', md: '40px', lg: '60px' },
                }}
              >
                  Vincent Göke 
              </Box>
            </ScrollLink>

            {/* Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              paddingRight: { md: '40px', lg: '60px' }
            }}>
              {navItems.map((item) => (
                <ScrollLink
                  key={item.target}
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant={item.isCallToAction ? "contained" : "text"}
                    color={item.isCallToAction ? "secondary" : "inherit"}
                    sx={{
                      ml: 2,
                      px: item.isCallToAction ? 3 : 2,
                      py: item.isCallToAction ? 0.5 : 'auto',
                      borderRadius: item.isCallToAction ? '50px' : 'default',
                      position: 'relative',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&::after': !item.isCallToAction ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: 2,
                        backgroundColor: accentColor, // Use fallback here
                        transition: 'width 0.3s ease',
                      } : {},
                      '&:hover': {
                        backgroundColor: item.isCallToAction 
                          ? theme.palette.secondary.dark
                          : 'transparent',
                        color: item.isCallToAction 
                          ? theme.palette.secondary.contrastText
                          : accentColor, // Use fallback here
                        '&::after': !item.isCallToAction ? {
                          width: '100%',
                        } : {},
                      },
                      '&.active': {
                        color: accentColor, // Use fallback here
                        '&::after': !item.isCallToAction ? {
                          width: '100%',
                        } : {},
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                </ScrollLink>
              ))}
              {/* Theme Toggle */}
              <ThemeToggle mode={mode} onToggle={toggleTheme} />
            </Box>

            {/* Mobile Navigation */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            <Box 
              component="div" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.5rem',
                color: theme.palette.primary.main
              }}
            >
              VG
            </Box>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem 
                key={item.name} 
                disablePadding
                sx={{ 
                  justifyContent: 'center',
                  mb: 1 
                }}
              >
                <ScrollLink
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={handleDrawerToggle}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  <Button
                    variant={item.isCallToAction ? "contained" : "text"}
                    color={item.isCallToAction ? "secondary" : "inherit"}
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: item.isCallToAction ? '50px' : 'default',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: item.isCallToAction 
                          ? theme.palette.secondary.dark
                          : 'rgba(194, 247, 80, 0.08)',
                        color: item.isCallToAction 
                          ? theme.palette.secondary.contrastText
                          : accentColor, // Use fallback here
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                </ScrollLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default Header;