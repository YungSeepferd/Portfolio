# Work Section Content Pipeline

Last updated: September 30, 2025

## Purpose

Provide a stable, data-driven path for rendering project content in the Work section. The pipeline standardizes raw project data, infers layout strategies, and feeds consistent structures to renderers.

## Overview

Flow: Raw project data → Normalizer → Analyzer → Renderer

- Normalizer: `src/utils/sectionNormalizer.js`
  - Standardizes heterogeneous section inputs into a consistent schema.
- Analyzer: `src/utils/sectionAnalyzer.js`
  - Derives layout strategy based on content characteristics (text-heavy, media-heavy, balanced).
- Content analysis helpers: `src/utils/contentAnalysis.js`
  - Utilities used by analyzer (e.g., heuristics on media/text balance).
- Dev validator (optional): `src/utils/projectGalleryValidator.js`
  - Dev-only checks for gallery media hints and common mistakes.

Downstream consumers:
- Parser: `src/utils/projectContentParser.js` (prepares sections for modal)
- Modal renderer: `src/components/work/ProjectFullContent.js`

## Section schema (normalized)

Common shape the renderer expects after normalization:

```js
{
  id: string,                  // unique
  type: 'default'|'gallery'|'video'|'custom',
  title?: string,
  content?: ReactNode,         // rich text fragments
  media?:                     
    // Single media
    { type: 'image'|'video', src: string, alt?: string, aspect?: 'portrait'|'landscape' } |
    // Gallery
    Array<{ src: string, alt?: string }>,
  layout?: 'textLeft'|'textRight'|'textOnly'|'gallery',
  anchor?: string,             // for in-modal navigation
  navigable?: boolean          // show in section nav
}
```

Notes:
- For galleries, use an array of `{ src, alt }` objects. Do not include `type` per item.
- For single media, include `type` and optional `aspect` hint when available.

## Normalizer responsibilities

- Fill defaults for missing optional fields (e.g., `navigable: false` → true when `title` present).
- Coerce gallery items to `{ src, alt }` shape.
- Ensure `id` and `anchor` are URL/DOM-safe.

## Analyzer responsibilities

- Inspect text length and media presence to select `layout`.
- Example strategies:
  - Text-only when no media.
  - Gallery when `media` is an array.
  - Side-by-side when both text and single media exist.
- May adjust spacing tokens or variant flags consumed by the renderer.

## Renderer expectations

- Use normalized `layout` to decide component composition.
- Respect `anchor` for in-modal navigation (`ProjectSectionNav`, `ProjectNavigation`).
- Map `technologies` via `TechBar`/`TechnologyTags` where relevant.

## Adding a new section type

1. Update `sectionNormalizer.js`
   - Recognize the new `type` and coerce data into the schema.
2. Update `sectionAnalyzer.js`
   - Add a strategy for the new type (or bypass if strictly custom-rendered).
3. Update modal renderer
   - Teach `ProjectFullContent.js` how to render the new type.
4. (Optional) Update validator
   - Extend `projectGalleryValidator.js` for new media hints.
5. Update docs
   - Document the new type here and link to examples.

## Dev-only gallery validation

- Use `projectGalleryValidator.js` during development to catch common issues (e.g., wrong gallery item shape).
- Wrap calls under `if (process.env.NODE_ENV !== 'production')` if invoking manually.

## Best practices

- Keep project files data-focused. Prefer updating data files in `src/components/work/data/projects/` over JSX tweaks.
- Always normalize before rendering to keep UI code simple.
- Maintain accessibility: provide `alt` text for all images.

## References

- `src/utils/sectionNormalizer.js`
- `src/utils/sectionAnalyzer.js`
- `src/utils/contentAnalysis.js`
- `src/utils/projectGalleryValidator.js`
- `src/components/work/ProjectFullContent.js`
- `src/utils/projectContentParser.js`
