import { Box, Chip, Divider, Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
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
 * TechBar Component
 * 
 * Displays a project's technologies and links in a standardized format
 * @param {string[]} technologies - List of technologies used in the project
 * @param {Object[]} links - List of link objects with label, url, and icon
 * @param {string} projectTitle - Title of the project, used for conditional link enhancement
 */
const TechBar = ({ technologies = [], links = [], projectTitle = "" }) => {
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
              <Button
                key={index}
                variant="outlined"
                size="small"
                color={
                  link.label.includes("GitHub") ? "info" :
                  link.label.includes("Paper") || link.label.includes("PDF") ? "secondary" :
                  "primary"
                }
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                startIcon={link.icon}
                sx={(theme) => ({
                  minWidth: 'auto',
                  fontWeight: 'medium',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  borderRadius: theme.shape.borderRadius,
                  '&:hover': {
                    boxShadow: theme.shadows[1],
                  }
                })}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default TechBar;
