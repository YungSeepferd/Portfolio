/**
 * sectionPropTypes.js
 *
 * Canonical PropTypes schema for project sections in the Work portfolio.
 * Use this schema to validate all project section data and ensure consistency.
 *
 * Each section object should have at least:
 *   - id: string (required)
 *   - type: string (required)
 *   - title: string (required)
 *   - content: node/string/object/array (optional, type-dependent)
 *   - media: object/array (optional, type-dependent)
 *   - layout: string (optional)
 *   - anchor: string (optional)
 *   - navigable: bool (optional)
 *   - outcomes, takeaways, actions: (optional, type-dependent)
 */
import PropTypes from 'prop-types';

/**
 * Section PropTypes Definition
 * 
 * Defines the shape of a project section based on the schema.
 * Used by ProjectSection and ProjectSections components.
 */
const sectionPropTypes = PropTypes.shape({
  // Required fields
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'default',
    'overview',
    'problem',
    'research',
    'methodology',
    'technical',
    'findings',
    'recommendations',
    'content',
    'concept',
    'impact',
    'benefits',
    'future',
    'gallery',
    'outcomes',
    'takeaways',
    'prototype',
    'custom',
    'persona',
    'testimonial',
    'timeline',
    'video',
    'onboarding',
    'researchHighlight',
    'motivation'  // Added this type
  ]).isRequired,
  title: PropTypes.string.isRequired,

  // Optional fields
  subtitle: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  media: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf(['image', 'video']),
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      aspect: PropTypes.string,
      poster: PropTypes.string
    }),
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        type: PropTypes.oneOf(['image', 'video']),
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        aspect: PropTypes.string,
        poster: PropTypes.string
      })
    ]))
  ]),
  layout: PropTypes.oneOf([
    'textLeft',
    'textRight',
    'textOnly',
    'mediaOnly',
    'gallery',
    'sideBySide',
    'outcomesTakeaways'
  ]),
  takeaways: PropTypes.arrayOf(PropTypes.string),
  outcomes: PropTypes.shape({
    title: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.string)
  }),
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    url: PropTypes.string,
    icon: PropTypes.node,
    variant: PropTypes.string,
    color: PropTypes.string,
    contentType: PropTypes.oneOf(['pdf', 'iframe', 'external']),
    openInPopup: PropTypes.bool
  })),
  anchor: PropTypes.string,
  navigable: PropTypes.bool,
  customComponent: PropTypes.node
});

export default sectionPropTypes;
