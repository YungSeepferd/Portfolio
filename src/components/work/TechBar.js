import { Box, Chip, Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import ActionButton from '../common/ActionButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useModalContext } from '../../context/ModalContext';

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
 * Determines appropriate color for links based on label content
 * @param {string} label - Button label text
 * @returns {string} - MUI color name
 */
const getLinkColor = (label) => {
  if (!label) return 'primary';
  
  const normalizedLabel = label.toLowerCase();
  
  if (normalizedLabel.includes('github')) return 'info';
  if (normalizedLabel.includes('paper') || normalizedLabel.includes('pdf')) return 'secondary';
  if (normalizedLabel.includes('demo') || normalizedLabel.includes('try')) return 'success';
  
  return 'primary';
};

/**
 * Create consistent action buttons using our shared ActionButton component
 */
const LinkButton = ({ link, index }) => {
  // Ensure link has contentType
  const enhancedLink = {
    ...link,
    contentType: link.contentType || determineContentType(link.url, link.label)
  };
  
  return (
    <ActionButton
      key={index}
      label={enhancedLink.label}
      href={enhancedLink.url}
      icon={enhancedLink.icon}
      variant="outlined"
      size="small"
      color={enhancedLink.color || getLinkColor(enhancedLink.label)}
      contentType={enhancedLink.contentType}
    />
  );
};

/**
 * Determine content type from URL and label
 */
const determineContentType = (url, label) => {
  if (!url) return 'external';
  
  const normalizedUrl = url.toLowerCase();
  const normalizedLabel = label.toLowerCase();
  
  if (normalizedUrl.includes('.pdf') || 
      normalizedLabel.includes('pdf') || 
      normalizedLabel.includes('thesis')) {
    return 'pdf';
  }
  
  if (normalizedUrl.includes('figma.com') || 
      normalizedUrl.includes('miro.com') || 
      normalizedLabel.includes('prototype')) {
    return 'iframe';
  }
  
  return 'external';
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
      icon: <PictureAsPdfIcon fontSize="small" sx={{ ml: 0.5 }} />,
      contentType: 'pdf'
    });
  } else if (projectTitle === "Phone-based Intervention in Self-driving Cars – Bachelor Thesis") {
    enhancedLinks.push({
      label: "Download PDF",
      url: "/assets/documents/Phone_Based_Intervention_Thesis.pdf",
      icon: <PictureAsPdfIcon fontSize="small" sx={{ ml: 0.5 }} />,
      contentType: 'pdf'
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
