import React from 'react';
import { Typography, Box } from '@mui/material';

/**
 * Utility functions for parsing project content
 */

// Define the missing parseProjectContent function or rename references to processProjectContent
export const processProjectContent = (project) => {
  if (!project) {
    return {
      sections: [],
      fullContent: null,
      outcomes: [],
      sectionCount: 0
    };
  }

  // Extract sections from project.details if available
  const content = project.details || null;
  
  // Parse the content into sections if available
  const sections = [];
  let outcomes = [];
  
  // If there's structured content, try to extract sections
  if (React.isValidElement(content)) {
    // Extract child elements that are sections
    const children = React.Children.toArray(content.props.children);
    let currentSection = null;
    
    children.forEach((child, index) => {
      // Check if the child is a heading (which would indicate a new section)
      if (React.isValidElement(child) && child.type === Typography && 
          (child.props.variant === 'h3' || child.props.component === 'h3')) {
        
        // If we already have a current section being built, push it to sections array
        if (currentSection) {
          sections.push(currentSection);
        }
        
        // Start a new section with the heading text
        currentSection = {
          title: child.props.children,
          content: [],
          number: (sections.length + 1).toString().padStart(2, '0')
        };
      } 
      // Check if the child is an "Outcomes" or similar section
      else if (React.isValidElement(child) && child.type === Typography && 
               child.props.variant === 'h3' && 
               child.props.children.toLowerCase().includes('outcome')) {
        // This is the outcomes section - store it separately
        outcomes = children.slice(index + 1);
        
        // If we have a current section, push it to the sections array
        if (currentSection) {
          sections.push(currentSection);
          currentSection = null;
        }
        return;
      }
      // Otherwise, add this element to the current section's content
      else if (currentSection) {
        currentSection.content.push(child);
      }
    });
    
    // Push the last section if there is one
    if (currentSection) {
      sections.push(currentSection);
    }
  }
  
  return {
    sections,
    fullContent: content,
    outcomes,
    sectionCount: sections.length
  };
};

// Helper function to determine image key from section title
export const sectionImageKeyMap = (title) => {
  const lowerCaseTitle = title?.toLowerCase() || '';
  
  if (lowerCaseTitle.includes('problem') || lowerCaseTitle.includes('challenge')) {
    return 'problem';
  } else if (lowerCaseTitle.includes('solution') || lowerCaseTitle.includes('approach')) {
    return 'solution';
  } else if (lowerCaseTitle.includes('overview')) {
    return 'overview';
  } else if (lowerCaseTitle.includes('prototype') || lowerCaseTitle.includes('showcase')) {
    return 'prototypeShowcase';
  }
  
  return null;
};

/**
 * Provides fallback content for sections
 * @param {string} sectionTitle - The title of the section
 * @param {object} project - The project object
 * @returns {JSX.Element|null} - Fallback content
 */
export const getFallbackContent = (sectionTitle, project) => {
  // ...existing implementation from ProjectModal.js...
};
