# AMIAI Content Verification

Last updated: September 30, 2025

## Scope

Verify factual accuracy and phrasing in `src/components/work/data/projects/amiai.js` against source document:

- `src/assets/information/AMIAI/AMIAI_Presentation.pdf`

## File under review

- `src/components/work/data/projects/amiai.js`

## Claims to verify

- **Framing**
  - [ ] Title and description (lines 45–49)
  - [ ] Categories and technologies represent actual tools used

- **Narrative**
  - [ ] Project overview (lines 53–70)
  - [ ] Context & Motivation (lines 72–88)
  - [ ] Pixelation metaphor (lines 90–107)

- **Research & Process**
  - [ ] Research foundation bullets (lines 109–126)
  - [ ] Process phases list (lines 132–168)

- **Components & Media**
  - [ ] Campaign components bullets (lines 170–201)
  - [ ] Video assets play correctly in modal

- **Impact**
  - [ ] Outcomes/takeaways (lines 202–237): refine with concrete results if present in PDF

- **Links**
  - [ ] Presentation PDF link via `presentationPDF` import

## Language consistency (style)

- [ ] Respect project’s established tone and terminology
- [ ] Maintain consistency in capitalization and terms (e.g., AI-generated vs AI generated per source)

## Proposed edits (after verification)

- Keep schema and media as-is.
- Adjust copy in overview, motivation, metaphor, research, process, components, and impact sections only if required by the PDF.

## Acceptance checklist

- [ ] All items verified against PDF
- [ ] `amiai.js` updated if needed
- [ ] Build passes (`npm run build`)
- [ ] Modal renders correctly (optional E2E smoke)
