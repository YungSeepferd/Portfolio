#!/usr/bin/env bash
# Normalize and linearize PDFs for better compatibility
# Requires: qpdf, ghostscript

set -euo pipefail

if [ $# -lt 1 ]; then
    echo "Usage: bash normalize_pdf.sh input.pdf [output.pdf]"
    exit 1
fi

in="$1"
out="${2:-${1%.*}.linearized.pdf}"

if [ ! -f "$in" ]; then
    echo "Error: Input file not found: $in"
    exit 1
fi

echo "Normalizing: $in"

# Step 1: Linearize (fast-web-view) & repair xrefs
qpdf --linearize --object-streams=generate --recompress-flate "$in" "$out.tmp"

# Step 2: Ghostscript to clean odd encodings/fonts (safe profile)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 -dPDFSETTINGS=/prepress \
   -dDetectDuplicateImages=true -dCompressFonts=true -dSubsetFonts=true \
   -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile="$out" "$out.tmp"

rm "$out.tmp"
echo "Normalized → $out"
