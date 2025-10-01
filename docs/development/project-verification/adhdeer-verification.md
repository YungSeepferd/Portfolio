# ADHDeer Content Verification

Last updated: September 30, 2025

## Scope

Verify factual accuracy and phrasing in `src/components/work/data/projects/adhdeer.js` against source documents:

- `src/assets/information/ADHDeer/ADHDeerPresentation.pdf`
- `src/assets/information/ADHDeer/ADHDeer - Work Documentation.docx`

## File under review

- `src/components/work/data/projects/adhdeer.js`

Line references below are from the current repository state.

## Claims to verify

- **Framing**
  - [ ] Title and description (lines 61–67): audience, goals, and tone
  - [ ] Categories and technologies list represent actual tools used

- **Motivation & Problem**
  - [ ] Motivation context and named team members (lines 102–118)
  - [ ] Problem statements (lines 121–139): wording and emphasis

- **Research Methods**
  - [ ] Interviews/personal insights, digital ethnography, co-ideation (lines 142–159)
  - [ ] Any numbers (participants, sessions) if present in sources

- **Core Dimensions & Features**
  - [ ] Three core dimensions (lines 176–181)
  - [ ] Feature bullets in ideation/prototype sections (lines 184–219)

- **Outcomes**
  - [ ] Outcomes wording (lines 280–291): ensure it reflects user testing evidence; add concrete stats if available

- **Links**
  - [ ] Presentation PDF link (lines 68–73) — keep `presentationPDF` import
  - [ ] Figma prototype link (lines 75–79) — confirm access and validity

## Language consistency (style)

- [ ] Hyphenation: user-centered, self-esteem, in-depth (update if source uses specific phrasing)
- [ ] ADHD terminology and respectful language
- [ ] Consistent capitalization (ADHD, Figma, etc.)

## Proposed edits (to apply after verification)

- Keep schema and media as-is.
- Adjust text paragraphs in these sections only if required by sources:
  - `overview`, `motivation`, `problem`, `research`, `ideation`, `prototype`, `outcomes`.
- Do not change `links`, `media`, or section `id/anchor/layout`.

## Acceptance checklist

- [ ] All checked items verified against PDFs/DOCX
- [ ] `adhdeer.js` updated where necessary
- [ ] Build passes (`npm run build`)
- [ ] Modal renders correctly (optional E2E smoke)

## Notes

- Media currently works. Do not change `presentationPDF` binding.
- If sources provide concrete metrics (n, quotes), prefer precise numbers over generic claims.
