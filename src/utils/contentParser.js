import React from 'react';
import Typography from '@mui/material/Typography';

/**
 * Parses project content into sections based on h3 headers
 * @param {string} content - Raw project content string
 * @returns {object} - Object containing parsed sections
 */
export const parseProjectContent = (content) => {
  const sections = {};
  let currentSection = null;
  let currentContent = [];

  // Check if content is a string
  if (typeof content !== 'string') {
    console.error("Content is not a string:", content);
    return sections; // Return empty sections if content is not a string
  }
  
  // Regular expression to match h3 headers
  const headerRegex = /<h3.*?>(.*?)<\/h3>/i;
  
  // Split the content by <p> tags
  const paragraphs = content.split(/<p>/i);
  
  paragraphs.forEach(paragraph => {
    // Check if the paragraph contains an h3 header
    const headerMatch = paragraph.match(headerRegex);
    
    if (headerMatch) {
      // Extract the header text
      const title = headerMatch[1];
      
      // Save the current section if it exists
      if (currentSection) {
        sections[currentSection] = currentContent;
      }
      
      // Start a new section
      currentSection = title.toLowerCase().replace(/ /g, '');
      currentContent = [<Typography variant="h3" key={currentSection}>{title}</Typography>];
      
      // Add any remaining content after the header
      const remainingContent = paragraph.replace(headerMatch[0], '').trim();
      if (remainingContent) {
        currentContent.push(<Typography variant="body1" key={currentContent.length}>{remainingContent}</Typography>);
      }
    } else {
      // If no header, add the paragraph to the current section
      const cleanParagraph = paragraph.replace(/<\/p>/i, '').trim();
      
      if (cleanParagraph) {
        // Check if the paragraph contains a list
        if (cleanParagraph.startsWith("<ul") || cleanParagraph.startsWith("<ol")) {
          // If it's a list, add it directly without wrapping in a Typography
          currentContent.push(<div dangerouslySetInnerHTML={{ __html: cleanParagraph }} key={currentContent.length} />);
        } else {
          // Otherwise, wrap the paragraph in a Typography component
          currentContent.push(<Typography variant="body1" key={currentContent.length} dangerouslySetInnerHTML={{ __html: cleanParagraph }} />);
        }
      }
    }
  });
  
  // Save the last section
  if (currentSection) {
    sections[currentSection] = currentContent;
  }
  
  return sections;
};

/**
 * Renders a specific section from parsed content
 */
export const renderContentSection = (section, fallback = null) => {
  if (!section || section.length === 0) {
    return fallback;
  }
  
  return (
    <>
      {section.map((element, index) => (
        <React.Fragment key={index}>
          {element}
        </React.Fragment>
      ))}
    </>
  );
};
