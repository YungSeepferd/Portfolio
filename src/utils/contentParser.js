import React from 'react';

/**
 * Parses project content from workData.js and extracts specific sections
 * based on Typography headers
 */
export const parseProjectContent = (content) => {
  // If content is not a valid React element, return empty sections
  if (!React.isValidElement(content)) {
    return {
      overview: null,
      problemStatement: null,
      research: null,
      solution: null,
      outcomes: null,
      fullContent: content
    };
  }

  // Initialize section containers
  const sections = {
    overview: null,
    problemStatement: null,
    research: null,
    solution: null,
    outcomes: null,
    fullContent: content
  };
  
  try {
    // Extract children of the content element
    const children = React.Children.toArray(content.props.children);
    
    // Find header indices
    const headerIndices = [];
    children.forEach((child, index) => {
      if (
        React.isValidElement(child) && 
        child.props.variant === "h3"
      ) {
        headerIndices.push({ 
          index, 
          title: child.props.children.toLowerCase()
        });
      }
    });
    
    // Extract content between headers
    headerIndices.forEach((header, idx) => {
      const nextHeaderIndex = idx < headerIndices.length - 1 
        ? headerIndices[idx + 1].index 
        : children.length;
      
      // Get content between this header and the next
      const sectionContent = children.slice(header.index, nextHeaderIndex);
      
      // Determine section type based on header title
      const title = header.title;
      if (title.includes('overview') || title.includes('project')) {
        sections.overview = sectionContent;
      } else if (title.includes('problem')) {
        sections.problemStatement = sectionContent;
      } else if (title.includes('research') || title.includes('process')) {
        sections.research = sectionContent;
      } else if (title.includes('solution') || title.includes('technical')) {
        sections.solution = sectionContent;
      } else if (title.includes('outcome') || title.includes('learning') || title.includes('impact')) {
        sections.outcomes = sectionContent;
      }
    });
    
    return sections;
  } catch (error) {
    console.error("Error parsing project content:", error);
    return sections;
  }
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
