import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as ScrollLink } from 'react-scroll';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Header.css';

const mailtoLink = "mailto:goeke.vincent@gmail.com?subject=Contact%20from%20Portfolio";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: 'Home', to: 'hero' },
    { label: 'My Work', to: 'work' },
    { label: 'About Me', to: 'about' },
    { label: 'Contact', to: 'contact' },
  ];

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
        Vincent Göke
      </Typography>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemText
              primary={
                <ScrollLink
                  to={item.to}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  className="nav-link"
                >
                  {item.label}
                </ScrollLink>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="inherit" className="header">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ color: 'primary.main' }}>
              Vincent Göke
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', ml: 2 }}>
              <IconButton color="inherit" aria-label="Email" href={mailtoLink}>
                <EmailIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" href="https://www.linkedin.com/in/vincent-g-193124194/">
                <LinkedInIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton color="inherit" aria-label="GitHub" href="https://github.com/YungSeepferd">
                <GitHubIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navLinks.map((item) => (
              <Button key={item.label} color="inherit">
                <ScrollLink
                  to={item.to}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  className="nav-link"
                >
                  {item.label}
                </ScrollLink>
              </Button>
            ))}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
      {/* Spacer to push the content below the fixed AppBar */}
      <Toolbar />
    </>
  );
}

export default Header;