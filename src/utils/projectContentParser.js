/**
 * Helper function to process project content and extract sections, outcomes, etc.
 */
export const processProjectContent = (project) => {
  if (!project) return { sections: [], outcomes: null, takeaways: [], fullContent: null, sectionCount: 0 };

  // Extract sections from the project data
  let sections = [];
  let outcomes = null;
  let takeaways = [];
  let fullContent = null;

  // Process sections - handle different data formats based on project structure
  if (project.sections && Array.isArray(project.sections)) {
    sections = project.sections.map((section, index) => {
      // If section is just a string, convert to proper section object
      if (typeof section === 'string') {
        return {
          id: `section-${index}`,
          title: index === 0 ? "Overview" : `Section ${index + 1}`,
          content: section,
          layout: index % 2 === 0 ? 'textLeft' : 'textRight'
        };
      }
      
      // Process each section to ensure it has proper fields
      return {
        id: section.id || `section-${section.title?.toLowerCase().replace(/\s+/g, '-') || index}`,
        title: section.title || `Section ${index + 1}`,
        content: section.content,
        media: section.media || section.image || null,
        layout: section.layout || (index % 2 === 0 ? 'textLeft' : 'textRight'),
      };
    });
  } else if (project.content) {
    // If project has a content field but no sections, create a default section
    sections = [{
      id: 'section-overview',
      title: 'Overview',
      content: project.content,
      media: project.heroMedia || project.media || null,
      layout: 'textLeft',
    }];
  } else if (typeof project.sections === 'string') {
    // Handle case where sections is a string instead of an array
    sections = [{
      id: 'section-overview',
      title: 'Overview',
      content: project.sections,
      layout: 'textLeft',
    }];
  }

  // Process project description if present and no sections exist
  if (project.description && sections.length === 0) {
    sections.push({
      id: 'section-description',
      title: 'Description',
      content: project.description,
      media: project.heroMedia || project.media || null,
      layout: 'textLeft',
    });
  }

  // Handle details separately if present (legacy field from older data format)
  if (project.details && sections.length === 0) {
    sections.push({
      id: 'section-details',
      title: 'Details',
      content: project.details,
      media: null,
      layout: 'textOnly',
    });
  }

  // Handle challenge, approach, and solution if present
  if (project.challenge) {
    sections.push({
      id: 'section-challenge',
      title: 'Challenge',
      content: project.challenge,
      media: project.challengeMedia || null,
      layout: 'textLeft',
    });
  }

  if (project.approach) {
    sections.push({
      id: 'section-approach',
      title: 'Approach',
      content: project.approach,
      media: project.approachMedia || null,
      layout: 'textRight',
    });
  }

  if (project.solution) {
    sections.push({
      id: 'section-solution',
      title: 'Solution',
      content: project.solution,
      media: project.solutionMedia || null,
      layout: 'textLeft',
    });
  }

  // Extract outcomes
  if (project.outcomes) {
    if (typeof project.outcomes === 'object') {
      outcomes = project.outcomes;
    } else if (Array.isArray(project.outcomes)) {
      outcomes = {
        title: "Project Outcomes",
        points: project.outcomes
      };
    }
  }

  // Extract key takeaways
  if (project.keyTakeaways || project.takeaways) {
    takeaways = project.keyTakeaways || project.takeaways;
  }

  // Check for process/methodology section
  if (project.process || project.methodology) {
    sections.push({
      id: 'section-process',
      title: project.process ? 'Process' : 'Methodology',
      content: project.process || project.methodology,
      media: project.processMedia || project.methodologyMedia || null,
      layout: 'textRight',
    });
  }

  // Handle results section if present
  if (project.results) {
    sections.push({
      id: 'section-results',
      title: 'Results',
      content: project.results,
      media: project.resultsMedia || null,
      layout: 'textLeft',
    });
  }

  // Determine if we have full content
  fullContent = project.fullContent || null;

  // Ensure we never return zero sections - if everything else failed, create a default section
  if (sections.length === 0) {
    sections.push({
      id: 'section-default',
      title: 'Overview',
      content: project.description || "No detailed content available for this project.",
      layout: 'textOnly',
    });
  }

  return {
    sections,
    outcomes,
    takeaways,
    fullContent,
    sectionCount: sections.length
  };
};

/**
 * Helper function to get fallback content for a section
 */
export const getFallbackContent = (section, project) => {
  if (section.content) return section.content;
  
  // Create fallback content based on section type or ID
  if (section.id) {
    const sectionId = section.id.toLowerCase();
    
    // Check for common section identifiers
    if (sectionId.includes('overview') || sectionId.includes('description')) {
      return project.description || project.overview || 'No overview available.';
    }
    
    if (sectionId.includes('challenge') || sectionId.includes('problem')) {
      return project.challenge || project.problem || 'No challenge description available.';
    }
    
    if (sectionId.includes('approach') || sectionId.includes('process')) {
      return project.approach || project.process || 'No approach description available.';
    }
    
    if (sectionId.includes('solution') || sectionId.includes('result')) {
      return project.solution || project.results || 'No solution description available.';
    }
  }
  
  // Default fallback
  return 'No content available for this section.';
};

/**
 * Map section types to image keys in project data
 */
export const sectionImageKeyMap = {
  overview: 'overviewImage',
  problem: 'problemImage',
  challenge: 'challengeImage',
  solution: 'solutionImage',
  process: 'processImage',
  methodology: 'methodologyImage',
  research: 'researchImage',
  design: 'designImage',
  results: 'resultsImage',
  challenges: 'challengesImage',
};
