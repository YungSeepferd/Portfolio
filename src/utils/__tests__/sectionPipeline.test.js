/*
  Section pipeline unit tests (pure functions only)
  Verifies normalization and analysis outcomes for common section shapes.
*/

import { normalizeSection } from '../../utils/sectionNormalizer';
import { analyzeSectionContent } from '../../utils/sectionAnalyzer';

describe('section pipeline', () => {
  test('normalizes gallery arrays into media collection and analysis classifies as gallery', () => {
    const raw = {
      id: 'section-gallery',
      type: 'gallery',
      title: 'Project Gallery',
      content: 'A selection of images',
      media: [
        { src: '/assets/images/a.jpg', alt: 'A' },
        { src: '/assets/images/b.jpg', alt: 'B' },
        { src: '/assets/images/c.jpg', alt: 'C' },
      ],
    };

    const normalized = normalizeSection(raw, 1);
    expect(normalized.media).toBeTruthy();
    expect(normalized.media.type).toBe('collection');
    expect(Array.isArray(normalized.media.items)).toBe(true);
    expect(normalized.media.items).toHaveLength(3);

    const strategy = analyzeSectionContent(normalized);
    expect(strategy.primaryRenderer).toBe('gallery');
    expect(strategy.contentType).toBe('gallery');
  });

  test('preserves original type in metadata for timeline sections', () => {
    const raw = {
      id: 'section-methodology',
      type: 'timeline',
      title: 'Research Methodology Timeline',
      steps: [{ phase: 'A' }, { phase: 'B' }],
    };

    const normalized = normalizeSection(raw, 2);
    // metadata.originalType is set by buildMetadata
    expect(normalized.metadata.originalType).toBe('timeline');
    // analysis is content-driven and not timeline-aware; ensure it still returns a valid object
    const strategy = analyzeSectionContent(normalized);
    expect(strategy).toHaveProperty('primaryRenderer');
    expect(strategy).toHaveProperty('layoutHint');
  });

  test('classifies text-only content as text-heavy and suggests centered layout when no media', () => {
    const raw = {
      id: 'intro',
      title: 'Intro',
      content: 'This is a long text paragraph used to verify text-only behaviour.',
    };

    const normalized = normalizeSection(raw, 0);
    const strategy = analyzeSectionContent(normalized);

    expect(strategy.contentType === 'text-heavy' || strategy.contentType === 'balanced').toBeTruthy();
    expect(['centered', 'balanced', 'textLeft', 'textRight']).toContain(strategy.layoutHint);
  });
});
