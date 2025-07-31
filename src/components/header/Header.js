import React, { useState, useEffect, useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { AppBar, Toolbar, Box, IconButton, List, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import { navItems, socialLinks } from '../../config/uiConfig';
import NavLinks from './NavLinks';

const Header = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isFirstMount = React.useRef(true);

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
    if (isFirstMount.current) {
      isFirstMount.current = false;
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMobileOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileOpen(false);
  };

  const transparentBgColor = mode === 'dark'
    ? theme.custom.overlays.header.dark
    : theme.custom.overlays.header.light;

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
            : transparentBgColor,
          transition: theme.transitions.create(
            ['background-color', 'box-shadow'],
            { duration: 0.3 }
          ),
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled 
            ? `1px solid ${theme.palette.divider}`
            : 'none',
          color: theme.palette.text.primary,
          width: '100vw', // Ensure full viewport width
          maxWidth: '100vw', // Prevent any maxWidth restriction
          left: 0,
        }}
      >
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            px: 0, // Remove all horizontal padding at the top level
            width: '100vw',
            maxWidth: '100vw',
            mx: 0,
          }}
        >
          <Toolbar sx={{
            minHeight: { xs: 56, sm: 64 }, // 56px for mobile, 64px for tablet/desktop
            px: 0,
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                    color: theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    paddingLeft: { xs: '15px', sm: '6px', md: '40px', lg: '20px' },
                    transition: 'padding 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  WORK IN PROGRESS
                </Box>
              </ScrollLink>
              {/* Social icons OUTSIDE ScrollLink to avoid nested <a> */}
              {socialLinks.map(link => link.icon === 'LinkedIn' && (
                <IconButton
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  size="small"
                  sx={{
                    ml: 1,
                    color: theme.palette.secondary.dark,
                    backgroundColor: theme.custom.overlays.socialIcon.base,
                    '&:hover': { backgroundColor: theme.custom.overlays.socialIcon.hover },
                    p: 0.5
                  }}
                  aria-label={link.ariaLabel}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <NavLinks navItems={navItems} variant="desktop" />
              {/* Restored theme toggle for desktop view */}
              <Box sx={{ ml: 2 }}>
                <ThemeToggle mode={mode} onToggle={toggleTheme} />
              </Box>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleMenuOpen}
              sx={{
                display: { md: 'none' },
                ml: 0,
                position: 'absolute',
                right: theme.custom.header.burgerMenuOffset.right,
                top: theme.custom.header.burgerMenuOffset.top,
                zIndex: 1201
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Popover Menu */}
      <Popover
        open={Boolean(anchorEl) && mobileOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0,
            borderRadius: 3,
            boxShadow: 4,
            minWidth: 180,
            maxWidth: '90vw',
            p: 2,
            background: theme => theme.palette.background.paper,
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 1.5,
            position: 'relative',
          }
        }}
        disableScrollLock
      >
        <Paper elevation={0} sx={{ background: 'none', boxShadow: 'none', p: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ fontWeight: 700, fontSize: '1.1rem', color: theme.palette.secondary.main, pl: 1, fontFamily: theme.typography.fontFamily }}>
              Menu
            </Box>
            <IconButton size="small" onClick={handleMenuClose} sx={{ ml: 1 }} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Theme toggle for mobile menu - using button variant */}
          <List>
            <ThemeToggle mode={mode} onToggle={toggleTheme} variant="button" />
            {navItems.map((item, idx) => (
              <Button
                key={item.target}
                variant={item.isCallToAction ? 'contained' : 'text'}
                color={item.isCallToAction ? 'secondary' : 'inherit'}
                fullWidth
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  mb: idx === navItems.length - 1 ? 2 : 0,
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  fontFamily: theme.typography.fontFamily,
                }}
                onClick={() => {
                  handleMenuClose();
                  document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {item.name}
              </Button>
            ))}
          </List>
        </Paper>
      </Popover>
    </motion.div>
  );
};

export default Header;