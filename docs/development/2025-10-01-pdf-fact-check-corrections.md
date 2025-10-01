# PDF-Based Fact-Check & Corrections

_Date: October 1, 2025, 00:17 CET_

## Overview

Comprehensive fact-check of all portfolio project content against extracted PDF source materials. This document identifies and corrects factual discrepancies found in project data files.

---

## Extraction Pipeline

### Tools Created
- `scripts/pdf-extraction/sanitize_filenames.py` - Filename normalization
- `scripts/pdf-extraction/extract_text_or_ocr.py` - Text extraction with OCR fallback
- `scripts/pdf-extraction/pdf_to_md_jsonl.py` - Convert to Markdown/JSONL
- `scripts/pdf-extraction/batch_extract_all.sh` - Batch processing

### PDFs Processed
✅ All PDFs in `src/assets/information/` extracted to:
- `.txt` - Plain text (page-separated)
- `.md` - Markdown format
- `.jsonl` - JSON Lines (page-by-page)

---

## Critical Corrections Required

### 1. Green Wallet - Event Date ❌

**Current (INCORRECT)**:
```javascript
// greenWallet.js line 102
"Green Wallet emerged from the Tourism Technology Festival 2022 Hackathon in Salzburg..."
```

**Source Evidence** (`02.pdf`):
```
11.11.2023 in Salzburg, Austria
Official Hackathon Start
Today, 11.11.2023
SSID: TTF2023
```

**Correction Required**:
- Change "Tourism Technology Festival **2022**" to "Tourism Technology Festival **2023**"
- Update all references from 2022 to 2023

**Impact**: High - Factual error in project timeline

---

## Verified Facts

### 2. Resonant Relaxation ✅

**Verified**:
- ✅ EuroHaptics 2024 (confirmed in `EuroHaptics_2024_Final_WIP_1077.pdf`)
- ✅ Collaboration with Innovobot Labs
- ✅ Technologies: React.js, RNBO.js, GPT-4 API, Tone.js, Bootstrap
- ✅ Demo link: https://react-midi.netlify.app/
- ✅ GitHub: https://github.com/NesR0M/Resonant-Relaxation-Project/tree/main

**Source**: Multiple PDFs in `Procedually generated haptics/`

---

### 3. Master Thesis ✅

**Verified**:
- ✅ Title: "Prototyping Emotions"
- ✅ Focus: Methodology for emotionally resonant haptic feedback
- ✅ Target: Novice interaction designers
- ✅ Technologies: Figma, Miro, Hapticlabs DevKit, Hapticlabs Studio
- ✅ Workshop-based approach

**Source**: `Vincent_Master_Thesis0225.pdf`, `Prototyping_Emotions_Thesis_Defense_Presentation_0225.pdf`

---

### 4. Bachelor Thesis ✅

**Verified**:
- ✅ Title: "Passenger Reroute"
- ✅ Focus: Rear-seat passenger interaction with autonomous vehicles
- ✅ SAE levels 4 and 5 mentioned
- ✅ Technologies: Figma, Adobe After Effects, Adobe Illustrator, User Testing
- ✅ Dual-system theory (fast/slow thinking) approach

**Source**: `PassengerReroute_Thesis.pdf`, `PassengerReroute_Presentation.pdf`

---

### 5. ADHDeer ✅

**Verified**:
- ✅ FH Salzburg Design Thinking project
- ✅ Target users: Young adults and children with ADHD
- ✅ Team members: Anica Hummel and Lucia Migacová
- ✅ Technologies: Figma, Miro, Adobe Illustrator, User Testing
- ✅ Core features: Forum, Diary, Mood Calendar, Articles, Emergency Support

**Source**: `ADHDeerPresentation.pdf`

---

### 6. AMIAI ✅

**Verified**:
- ✅ Critical visual campaign
- ✅ Focus: AI-generated content credibility
- ✅ Technologies: Adobe Photoshop, Adobe Illustrator, After Effects
- ✅ Pixelation metaphor as key design element

**Source**: `AMIAI_Presentation.pdf`

---

## Additional Findings

### Green Wallet - Additional Details from PDFs

From `Script.pdf`:
- Team: "students of FH Salzburg"
- Challenge: "promoting cashless payment and local sustainable tourism"
- Mastercard sponsorship confirmed
- Multi-stakeholder benefits clearly outlined

From `02.pdf`:
- **Exact date: November 11, 2023**
- WiFi SSID: TTF2023 (Tourism Technology Festival 2023)
- Event location: Salzburg, Austria
- Hackathon format confirmed

### Recommendations

1. **Update Green Wallet immediately** - Critical date error
2. **Cross-reference all dates** - Ensure no other timeline discrepancies
3. **Add specific dates where available** - Enhance credibility
4. **Preserve PDF extractions** - Keep `.txt` files for future reference

---

## Files Requiring Updates

### Priority 1: Critical Corrections

1. **`src/components/work/data/projects/greenWallet.js`**
   - Line 102: Change "2022" to "2023"
   - Line 120: Update "Tourism Technology Festival 2022" to "2023"
   - Verify all date references

### Priority 2: Enhancements (Optional)

1. Consider adding specific dates where PDFs provide them
2. Add more precise event details from extracted PDFs
3. Cross-reference team member names and affiliations

---

## Extraction Statistics

| Project | PDFs Found | Text Extracted | Verified |
|---------|-----------|----------------|----------|
| Green Wallet | 3 | ✅ | ❌ Date error |
| Resonant Relaxation | 6 | ✅ | ✅ |
| Master Thesis | 2 | ✅ | ✅ |
| Bachelor Thesis | 2 | ✅ | ✅ |
| ADHDeer | 1 | ✅ | ✅ |
| AMIAI | 1 | ✅ | ✅ |

**Total PDFs Processed**: 15+  
**Critical Errors Found**: 1 (Green Wallet date)  
**Verification Status**: 5/6 projects fully verified

---

## Next Steps

1. ✅ Extract all PDFs to text/markdown/JSONL
2. ✅ Identify factual discrepancies
3. ⏳ **Correct Green Wallet date (2022 → 2023)**
4. ⏳ Update fact-check documentation
5. ⏳ Run build verification
6. ⏳ Document all changes

---

## Source Files

All extracted text available in:
```
src/assets/information/
├── Greenwallet/*.txt
├── Procedually generated haptics/*.txt
├── Master thesis/*.txt
├── Bachelor thesis/*.txt
├── ADHDeer/*.txt
└── AMIAI/*.txt
```

---

_Fact-check completed using PDF extraction pipeline_  
_Tools: PyMuPDF, pymupdf4llm, ocrmypdf_  
_Critical error found: Green Wallet date (2022 should be 2023)_
