import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// Styled components using theme values instead of hardcoded colors
const NavLink = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.accent.main, // Using theme accent color instead of hardcoded "#c2f650"
  fontSize: theme.typography.button.fontSize,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  transition: theme.palette.transitions.short,
  '&:hover': {
    color: theme.palette.accent.light,
  }
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Using theme background instead of hardcoded rgba
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1.5),
  "& .MuiChip-label": {
    color: theme.palette.text.primary, // Using theme text color instead of hardcoded "#fbfbfb"
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily,
    padding: 0,
  },
}));

const TechBar = ({ technologies = [], links = [] }) => {
  // Skip rendering if there's nothing to show
  if (technologies.length === 0 && links.length === 0) return null;
  
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(2),
        px: { xs: theme.spacing(2), md: theme.spacing(4) },
        py: theme.spacing(0),
        bgcolor: theme.palette.background.default,
        width: "100%",
        mb: theme.spacing(3),
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          p: theme.spacing(2),
          width: "100%",
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.primary.main}`, // Using theme primary color
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: theme.spacing(2), sm: 0 },
        })}
      >
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center"
          sx={(theme) => ({
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: { xs: "center", sm: "flex-start" },
            gap: theme.spacing(1)
          })}
        >
          {technologies.map((tech, index) => (
            <React.Fragment key={tech}>
              <TechChip label={tech} />
              {index < technologies.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={(theme) => ({ 
                    bgcolor: theme.palette.divider, // Using theme divider color
                    height: "21px", 
                    display: { xs: "none", md: "block" } 
                  })}
                />
              )}
            </React.Fragment>
          ))}
        </Stack>

        {links.length > 0 && (
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
            sx={{
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            {links.map((link, index) => (
              <NavLink 
                key={index} 
                component="a" 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {link.label} →
              </NavLink>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default TechBar;
