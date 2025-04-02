import React from 'react';

/**
 * Extracts sections from project details JSX
 * @param {JSX.Element} details - React element containing the project details
 * @param {Array} images - Array of images
 * @returns {Array} - Structured sections 
 */
export const extractProjectSections = (details, images = []) => {
  if (!details || !details.props || !details.props.children) {
    return [];
  }

  const sections = [];
  let currentSection = { title: null, content: [] };
  
  React.Children.forEach(details.props.children, (child) => {
    if (child && child.type && child.props && child.props.variant === 'h3') {
      if (currentSection.title) {
        sections.push({...currentSection});
      }
      currentSection = { title: child.props.children, content: [] };
    } else if (currentSection.title) {
      currentSection.content.push(child);
    }
  });
  
  if (currentSection.title) {
    sections.push(currentSection);
  }
  
  return sections.map((section, index) => ({
    id: `0${index + 1}`,
    title: section.title,
    content: section.content,
    image: images[index + 1] || images[0] || null
  }));
};

/**
 * Validates a project object to ensure it has all required fields
 * @param {Object} project - Project data object
 * @returns {boolean} - True if project is valid
 */
export const isValidProject = (project) => {
  const requiredFields = ['id', 'title', 'description', 'categories', 'images'];
  return requiredFields.every(field => !!project[field]);
};

/**
 * Format project tags for display
 * @param {Array} categories - Array of project categories/tags
 * @param {Array} skillTags - Array of all skill tags for validation
 * @param {Number} limit - Maximum number of tags to display
 * @param {Boolean} showAll - Show all tags
 * @returns {Object} - Object containing tags to display and number remaining
 */
export const formatProjectTags = (categories = [], skillTags = [], limit = 2, showAll = false) => {
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return { tags: [], remaining: 0 };
  }

  // Filter valid tags that match skillTags
  const validTags = categories.filter(tag => 
    skillTags.includes(tag)
  );

  // Return all valid tags if showAll is true
  if (showAll) {
    return {
      tags: validTags,
      remaining: 0
    };
  }

  // Otherwise return limited set with remaining count
  const displayTags = validTags.slice(0, limit);
  const remaining = validTags.length > limit ? validTags.length - limit : 0;

  return {
    tags: displayTags,
    remaining
  };
};
