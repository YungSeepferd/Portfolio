/**
 * Utility for parsing project content from JSX
 * This helps break down complex JSX content into categorized sections
 */
import React from 'react';
import { Typography, Box } from '@mui/material';

/**
 * Extracts section headings and content from JSX project details
 * @param {JSX.Element} details - The JSX content from project details
 * @returns {Object} - Object with parsed section content and counts
 */
export const parseProjectContent = (details) => {
  if (!details || !details.props || !details.props.children) {
    return {
      fullContent: null,
      sections: [],
      sectionCount: 0
    };
  }
  
  // Initialize result object
  const result = {
    overview: null,
    problemStatement: null,
    research: null,
    solution: null,
    prototype: null,
    outcomes: null,
    fullContent: null,
    sections: [], // New property to store all sections
    sectionCount: 0 // Count of sections
  };
  
  // Cache the full content
  result.fullContent = details;
  
  // Flatten and process the children
  const children = React.Children.toArray(details.props.children);
  
  // Track sections for dynamic rendering
  let currentSectionTitle = '';
  let currentSectionContent = [];
  let sectionIndex = 0;
  
  // Process each child element
  children.forEach((child, index) => {
    // Check if this is a section heading (h3)
    const isHeading = child?.props?.variant === 'h3';
    
    if (isHeading) {
      // If we already have a section in progress, save it before starting new one
      if (currentSectionTitle) {
        result.sections.push({
          index: sectionIndex,
          title: currentSectionTitle,
          content: currentSectionContent,
          number: (sectionIndex + 1).toString().padStart(2, '0') // Format as "01", "02", etc.
        });
        sectionIndex++;
      }
      
      // Start a new section
      currentSectionTitle = child.props.children;
      currentSectionContent = [];
    } else {
      // Add to current section content if we have a section title
      if (currentSectionTitle) {
        currentSectionContent.push(child);
      }
    }
    
    // Check for specific section types by heading content
    if (isHeading) {
      const heading = child.props.children.toLowerCase();
      
      if (heading.includes('overview') || heading.includes('introduction')) {
        result.overview = result.overview || [];
        result.overview.push(child);
      } else if (heading.includes('problem')) {
        result.problemStatement = result.problemStatement || [];
        result.problemStatement.push(child);
      } else if (heading.includes('research') || heading.includes('methodology') || heading.includes('approach')) {
        result.research = result.research || [];
        result.research.push(child);
      } else if (heading.includes('solution') || heading.includes('implementation') || heading.includes('technical') || heading.includes('concept')) {
        result.solution = result.solution || [];
        result.solution.push(child);
      } else if (heading.includes('prototype') || heading.includes('design') || heading.includes('component')) {
        result.prototype = result.prototype || [];
        result.prototype.push(child);
      } else if (heading.includes('outcome') || heading.includes('result') || heading.includes('finding') || heading.includes('impact') || heading.includes('evaluation')) {
        result.outcomes = result.outcomes || [];
        result.outcomes.push(child);
      }
    } else {
      // Add content to the appropriate section
      if (result.overview && result.overview.length > 0) {
        result.overview.push(child);
      } else if (result.problemStatement && result.problemStatement.length > 0) {
        result.problemStatement.push(child);
      } else if (result.research && result.research.length > 0) {
        result.research.push(child);
      } else if (result.solution && result.solution.length > 0) {
        result.solution.push(child);
      } else if (result.prototype && result.prototype.length > 0) {
        result.prototype.push(child);
      } else if (result.outcomes && result.outcomes.length > 0) {
        result.outcomes.push(child);
      }
    }
  });
  
  // Don't forget to add the last section
  if (currentSectionTitle) {
    result.sections.push({
      index: sectionIndex,
      title: currentSectionTitle,
      content: currentSectionContent,
      number: (sectionIndex + 1).toString().padStart(2, '0')
    });
    sectionIndex++;
  }
  
  // Update section count
  result.sectionCount = result.sections.length;
  
  return result;
};

/**
 * Formats a section heading with numbered prefix (e.g., "01 Overview")
 * @param {String} title - The section title text
 * @param {Number} index - The section index (0-based)
 * @returns {String} - Formatted section title with number prefix
 */
export const formatSectionHeading = (title, index) => {
  const sectionNumber = (index + 1).toString().padStart(2, '0');
  return `${sectionNumber} ${title}`;
};

/**
 * Creates a numbered section component with consistent styling
 * @param {String} title - Section title
 * @param {Number} index - Section index for numbering
 * @param {String} color - Optional color for the number (defaults to project color)
 * @returns {JSX.Element} - Formatted section heading
 */
export const createNumberedSection = (title, index, color = null) => {
  const sectionNumber = (index + 1).toString().padStart(2, '0');
  
  return (
    <Typography variant="h3" component="h3" sx={{ position: 'relative', pl: 0 }}>
      <Typography 
        component="span" 
        sx={{ 
          color: color || 'inherit',
          fontWeight: 700,
          mr: 1,
          display: 'inline-block'
        }}
      >
        {sectionNumber}
      </Typography>
      {title}
    </Typography>
  );
};

/**
 * Renders content section with proper handling of JSX and string content
 * @param {JSX.Element|Array|String|null} content - The content to render
 * @returns {JSX.Element|null} - Rendered content or null if empty
 */
export const renderContentSection = (content) => {
  if (!content) return null;
  
  // If content is an array, render each element
  if (Array.isArray(content)) {
    return (
      <Box>
        {content.map((item, idx) => (
          <React.Fragment key={idx}>
            {item}
          </React.Fragment>
        ))}
      </Box>
    );
  }
  
  // If content is a string, wrap it in Typography
  if (typeof content === 'string') {
    return (
      <Typography variant="body1" paragraph>
        {content}
      </Typography>
    );
  }
  
  // Otherwise, assume it's JSX and return as is
  return content;
};

// Create a proper named export object
const contentParserUtils = {
  parseProjectContent,
  formatSectionHeading,
  createNumberedSection,
  renderContentSection
};

export default contentParserUtils;
