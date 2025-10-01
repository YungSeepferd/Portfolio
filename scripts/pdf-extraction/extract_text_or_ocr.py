#!/usr/bin/env python3
"""
Extract text from PDFs with fallback to OCR for image-only PDFs.
Requires: PyMuPDF (fitz), ocrmypdf
"""
import sys
import subprocess
import os
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Error: PyMuPDF not installed. Run: pip install pymupdf")
    sys.exit(1)

def has_text(pdf_path):
    """Check if PDF has extractable text."""
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text = page.get_text("text").strip()
            if text and len(text) > 50:  # At least 50 chars to be meaningful
                return True
        return False
    except Exception as e:
        print(f"Error checking text: {e}")
        return False

def extract_text(pdf_path, txt_out):
    """Extract text from PDF to text file."""
    try:
        doc = fitz.open(pdf_path)
        with open(txt_out, "w", encoding="utf-8") as f:
            for i, page in enumerate(doc, 1):
                f.write(f"\n\n{'='*60}\n")
                f.write(f"PAGE {i}\n")
                f.write(f"{'='*60}\n\n")
                f.write(page.get_text("text"))
        return True
    except Exception as e:
        print(f"Error extracting text: {e}")
        return False

def ocr_pdf(pdf_path, ocr_out):
    """Run OCR on PDF to create searchable version."""
    try:
        # Check if ocrmypdf is available
        result = subprocess.run(["which", "ocrmypdf"], 
                              capture_output=True, text=True)
        if result.returncode != 0:
            print("Warning: ocrmypdf not installed. Skipping OCR.")
            return False
        
        subprocess.run([
            "ocrmypdf", 
            "--skip-text",  # Skip pages that already have text
            "--optimize", "3",
            "--jobs", "4",
            pdf_path, 
            ocr_out
        ], check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"OCR failed: {e}")
        return False
    except Exception as e:
        print(f"Error during OCR: {e}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract_text_or_ocr.py file.pdf")
        sys.exit(1)
    
    pdf = Path(sys.argv[1])
    if not pdf.exists():
        print(f"Error: File not found: {pdf}")
        sys.exit(1)
    
    base = pdf.with_suffix("")
    txt = base.with_suffix(".txt")
    
    print(f"Processing: {pdf.name}")
    
    # Try direct text extraction first
    if has_text(pdf):
        print("  → Extracting text directly...")
        if extract_text(pdf, txt):
            print(f"  ✓ Text extracted: {txt}")
        else:
            print("  ✗ Text extraction failed")
    else:
        print("  → No text found, attempting OCR...")
        ocr_out = base.with_suffix(".ocr.pdf")
        if ocr_pdf(pdf, ocr_out):
            print("  → Extracting text from OCR'd PDF...")
            if extract_text(ocr_out, txt):
                print(f"  ✓ OCR + text extracted: {txt}")
            else:
                print("  ✗ Text extraction from OCR failed")
        else:
            print("  ✗ OCR failed, trying basic extraction anyway...")
            extract_text(pdf, txt)
            print(f"  ⚠ Partial extraction: {txt}")

if __name__ == "__main__":
    main()
