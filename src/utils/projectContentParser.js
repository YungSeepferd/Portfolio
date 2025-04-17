/**
 * Processes normalized project content. No legacy/guessing logic.
 * Returns sections, outcomes, takeaways, and sectionCount.
 */
export const processProjectContent = (project) => {
  if (!project) return { sections: [], outcomes: null, takeaways: [], fullContent: null, sectionCount: 0 };

  // Assume normalized schema: all content is in project.sections
  const sections = Array.isArray(project.sections) ? project.sections.map((section, index) => ({
    // Ensure required fields exist, fallback to defaults if missing
    id: section.id || `section-${index}`,
    title: section.title || `Section ${index + 1}`,
    content: section.content,
    media: section.media || null,
    layout: section.layout || 'textLeft',
    type: section.type || 'default',
    anchor: section.anchor,
    navigable: section.navigable,
    takeaways: section.takeaways,
    outcomes: section.outcomes,
    actions: section.actions,
    customComponent: section.customComponent,
    subtitle: section.subtitle,
  })) : [];

  // Outcomes and takeaways can be at project or section level
  const outcomes = project.outcomes || null;
  const takeaways = project.takeaways || [];
  const fullContent = project.fullContent || null;

  return {
    sections,
    outcomes,
    takeaways,
    fullContent,
    sectionCount: sections.length
  };
};
