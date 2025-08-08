import { describe, it, expect } from 'vitest';
import { ProjectSchema } from '../schemas/project';
import { getProjects } from '../components/work/data';
import { normalizeProjects } from '../utils/normalizeProject';

describe('Projects Schema Validation', () => {
  it('all projects conform to the schema after normalization', () => {
    const raw = getProjects();
    const normalized = normalizeProjects(raw);

    // Parsing again should not throw
    normalized.forEach((p) => {
      expect(() => ProjectSchema.parse(p)).not.toThrow();
      // Required fundamentals
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(Array.isArray(p.sections)).toBe(true);
      // Media items must have src
      if (Array.isArray(p.media)) {
        p.media.forEach((m) => expect(m.src).toBeTruthy());
      }
    });
  });
});
