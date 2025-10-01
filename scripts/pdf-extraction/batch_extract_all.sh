#!/usr/bin/env bash
# Batch process all PDFs in a directory
# Usage: bash batch_extract_all.sh /path/to/pdfs

set -euo pipefail

DIR="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=========================================="
echo "PDF Extraction Pipeline"
echo "=========================================="
echo "Directory: $DIR"
echo ""

# Step 1: Sanitize filenames
echo "Step 1: Sanitizing filenames..."
python3 "$SCRIPT_DIR/sanitize_filenames.py" "$DIR" || true
echo ""

# Step 2: Process each PDF
shopt -s nullglob
for f in "$DIR"/**/*.pdf; do
    echo "=========================================="
    echo "Processing: $f"
    echo "=========================================="
    
    # Extract text (with OCR fallback)
    python3 "$SCRIPT_DIR/extract_text_or_ocr.py" "$f" || true
    
    # Convert to Markdown and JSONL
    python3 "$SCRIPT_DIR/pdf_to_md_jsonl.py" "$f" || true
    
    echo ""
done

echo "=========================================="
echo "Extraction Complete!"
echo "=========================================="
echo ""
echo "Generated files:"
echo "  *.txt    - Plain text extraction"
echo "  *.md     - Markdown format"
echo "  *.jsonl  - JSON Lines (page-by-page)"
echo ""
