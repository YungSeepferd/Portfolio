# PDF Extraction Pipeline

Tools to extract text from PDFs and convert to MCP-friendly formats (TXT, Markdown, JSONL).

## Purpose

Transform portfolio PDFs into clean, searchable text formats for:
- Fact-checking project content against source materials
- MCP/RAG ingestion
- Easier content verification and updates

## Setup

### 1. Install System Dependencies (macOS)

```bash
# Install via Homebrew
brew install qpdf ghostscript tesseract ocrmypdf
```

### 2. Install Python Dependencies

```bash
# From repository root
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install pymupdf PyPDF2 ocrmypdf pymupdf4llm
```

Or use the setup script:

```bash
bash scripts/pdf-extraction/setup.sh
```

## Usage

### Quick Start: Extract All PDFs

```bash
# From repository root
source venv/bin/activate
bash scripts/pdf-extraction/batch_extract_all.sh src/assets/information
```

This will:
1. Sanitize filenames (remove spaces, special chars)
2. Extract text from all PDFs
3. Generate .txt, .md, and .jsonl files

### Individual Scripts

#### 1. Sanitize Filenames
```bash
python scripts/pdf-extraction/sanitize_filenames.py src/assets/information
```

#### 2. Extract Text (with OCR fallback)
```bash
python scripts/pdf-extraction/extract_text_or_ocr.py path/to/file.pdf
```

#### 3. Convert to Markdown & JSONL
```bash
python scripts/pdf-extraction/pdf_to_md_jsonl.py path/to/file.pdf
```

#### 4. Normalize PDF (optional)
```bash
bash scripts/pdf-extraction/normalize_pdf.sh input.pdf output.pdf
```

## Output Formats

### .txt (Plain Text)
- Page-separated plain text
- Best for simple text search
- Format: `PAGE 1\n====\nContent...`

### .md (Markdown)
- Structured markdown with headings
- Preserves document hierarchy
- Best for human reading

### .jsonl (JSON Lines)
- One JSON object per page
- Format: `{"doc_id": "file.pdf", "page": 1, "text": "..."}`
- Best for MCP/RAG ingestion

## Fact-Checking Workflow

1. **Extract all PDFs**:
   ```bash
   bash scripts/pdf-extraction/batch_extract_all.sh src/assets/information
   ```

2. **Review extracted text**:
   - Check `src/assets/information/**/*.txt` files
   - Verify dates, names, facts

3. **Update project data**:
   - Compare with `src/components/work/data/projects/*.js`
   - Correct any discrepancies

4. **Document changes**:
   - Update `docs/development/project-content-fact-check.md`

## Troubleshooting

### "ocrmypdf not found"
- Install: `brew install ocrmypdf`
- Or skip OCR (text extraction will still work for text-based PDFs)

### "pymupdf4llm not found"
- Install: `pip install pymupdf4llm`
- Or skip Markdown conversion (JSONL and TXT will still work)

### PDF parsing errors
- Try normalizing first: `bash scripts/pdf-extraction/normalize_pdf.sh file.pdf`
- Then extract from the normalized version

## File Structure

```
scripts/pdf-extraction/
├── README.md                    # This file
├── setup.sh                     # Setup script
├── sanitize_filenames.py        # Clean up filenames
├── normalize_pdf.sh             # Fix problematic PDFs
├── extract_text_or_ocr.py       # Extract text (with OCR)
├── pdf_to_md_jsonl.py           # Convert to MD/JSONL
└── batch_extract_all.sh         # Process all PDFs
```

## Notes

- Extracted files are created alongside source PDFs
- Original PDFs are never modified (except by sanitize_filenames.py)
- Safe to run multiple times (will overwrite previous extractions)
- Add `*.txt`, `*.md`, `*.jsonl` to `.gitignore` if desired
