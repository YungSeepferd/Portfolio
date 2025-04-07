import { Box, Chip, Divider, Stack, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { getLinkIcon, getLinkColor, getButtonStyles } from '../../utils/buttonStyles';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// Styled components using theme values
const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1.5),
  "& .MuiChip-label": {
    color: theme.palette.text.primary,
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily,
    padding: 0,
  },
}));

/**
 * Create consistent themed button based on link type
 * @param {Object} link - Link data
 * @param {number} index - Button index
 * @returns {JSX.Element} - Styled button
 */
const LinkButton = ({ link, index }) => {
  // Use the theme from MUI hook here
  const theme = useTheme();
  
  // Ensure link has an icon
  const linkWithIcon = {
    ...link,
    icon: link.icon || getLinkIcon(link.label)
  };
  
  return (
    <Button
      variant="outlined"
      size="small"
      color={getLinkColor(link.label)}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      startIcon={linkWithIcon.icon}
      sx={(theme) => getButtonStyles(theme)}
    >
      {link.label}
    </Button>
  );
};

/**
 * TechBar Component
 * 
 * Displays a project's technologies and links in a standardized format
 * @param {string[]} technologies - List of technologies used in the project
 * @param {Object[]} links - List of link objects with label, url, and icon
 * @param {string} projectTitle - Title of the project, used for conditional link enhancement
 */
const TechBar = ({ technologies = [], links = [], projectTitle = "" }) => {
  // We actually do use theme in the styled component above
  
  // Skip rendering if there's nothing to show
  if (technologies.length === 0 && !projectTitle) return null;
  
  // Add PDF download links for specific projects
  const enhancedLinks = links ? [...links] : [];
  
  if (projectTitle === "Prototyping Emotions – Master Thesis") {
    enhancedLinks.push({
      label: "Download PDF",
      url: "/assets/documents/Prototyping_Emotions_Thesis.pdf",
      icon: <PictureAsPdfIcon fontSize="small" sx={{ ml: 0.5 }} />
    });
  } else if (projectTitle === "Phone-based Intervention in Self-driving Cars – Bachelor Thesis") {
    enhancedLinks.push({
      label: "Download PDF",
      url: "/assets/documents/Phone_Based_Intervention_Thesis.pdf",
      icon: <PictureAsPdfIcon fontSize="small" sx={{ ml: 0.5 }} />
    });
  }
  
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
          border: `1px solid ${theme.palette.primary.main}`,
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
                    bgcolor: theme.palette.divider,
                    height: "21px", 
                    display: { xs: "none", md: "block" } 
                  })}
                />
              )}
            </React.Fragment>
          ))}
        </Stack>
        
        {enhancedLinks.length > 0 && (
          <Stack 
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5} 
            alignItems="center"
            sx={(theme) => ({
              justifyContent: { xs: "center", sm: "flex-end" },
              mt: { xs: 1, sm: 0 }
            })}
          >
            {enhancedLinks.map((link, index) => (
              <LinkButton key={index} link={link} index={index} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default TechBar;
