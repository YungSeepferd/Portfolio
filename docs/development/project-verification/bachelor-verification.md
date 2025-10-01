# Bachelor Thesis Content Verification

Last updated: September 30, 2025

## Scope

Verify `src/components/work/data/projects/bachelorThesis.js` against:

- `src/assets/information/Bachelor thesis/PassengerReroute_Presentation.pdf`
- `src/assets/information/Bachelor thesis/PassengerReroute_Thesis.pdf`

## File under review

- `src/components/work/data/projects/bachelorThesis.js`

## Claims to verify

- **Design & participants**
  - [ ] Between-group design with 30 participants (lines 115–118)
  - [ ] Pilot n=11 (line 187)
  - [ ] Group conditions and time limits (Fast 3‑min, Slow 15‑min) (lines 133–144, 195–197)

- **Metrics & results**
  - [ ] Trust increase: 4.63 → 5.82 (lines 251–257)
  - [ ] SUS score: 75.38/100 (good–excellent) (lines 255–257)
  - [ ] Time difference: Fast 51s vs Slow 68s (lines 260–263)
  - [ ] Selection patterns statement (lines 265–267)
  - [ ] Density preferences (Level 1 vs Level 3) (lines 271–272)

- **Method details**
  - [ ] UI density levels definitions (lines 201–207)
  - [ ] Data collection: STS, SUS, recordings, semi‑structured interviews (lines 211–212)

- **Links**
  - [ ] Presentation and Thesis PDF links render properly in modal (lines 51–64)

## Language consistency (style)

- [ ] Hyphenation (rear-seat, non-critical, non-driving, between-group, semi‑structured)
- [ ] Consistency in terms (decision‑making, human–machine)

## Proposed edits (post‑verification)

- No schema changes. Adjust copy only if the PDFs differ on numbers or phrasing.

## Acceptance checklist

- [ ] Items verified against presentation + thesis
- [ ] `bachelorThesis.js` updated where necessary
- [ ] Build passes
- [ ] Modal renders correctly (optional E2E)
