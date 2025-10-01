#!/usr/bin/env python3
"""
Convert PDFs to Markdown and JSONL formats for MCP/RAG ingestion.
Requires: PyMuPDF (fitz), pymupdf4llm
"""
import sys
import json
from pathlib import Path

try:
    import fitz
except ImportError:
    print("Error: PyMuPDF not installed. Run: pip install pymupdf")
    sys.exit(1)

try:
    import pymupdf4llm
except ImportError:
    print("Warning: pymupdf4llm not installed. Markdown conversion will be skipped.")
    print("Install with: pip install pymupdf4llm")
    pymupdf4llm = None

def pdf_to_md(pdf_path, md_out):
    """Convert PDF to Markdown format."""
    if pymupdf4llm is None:
        print("  ⚠ Skipping Markdown conversion (pymupdf4llm not available)")
        return False
    
    try:
        md = pymupdf4llm.to_markdown(str(pdf_path))
        Path(md_out).write_text(md, encoding="utf-8")
        return True
    except Exception as e:
        print(f"  ✗ Markdown conversion failed: {e}")
        return False

def pdf_to_jsonl_pages(pdf_path, jsonl_out):
    """Convert PDF to JSONL with one record per page."""
    try:
        doc = fitz.open(pdf_path)
        with open(jsonl_out, "w", encoding="utf-8") as f:
            for i, page in enumerate(doc, 1):
                text = page.get_text("text")
                rec = {
                    "doc_id": Path(pdf_path).name,
                    "page": i,
                    "text": text.strip()
                }
                f.write(json.dumps(rec, ensure_ascii=False) + "\n")
        return True
    except Exception as e:
        print(f"  ✗ JSONL conversion failed: {e}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Usage: python pdf_to_md_jsonl.py file.pdf")
        sys.exit(1)
    
    pdf = Path(sys.argv[1])
    if not pdf.exists():
        print(f"Error: File not found: {pdf}")
        sys.exit(1)
    
    md_out = pdf.with_suffix(".md")
    jsonl_out = pdf.with_suffix(".jsonl")
    
    print(f"Converting: {pdf.name}")
    
    # Convert to Markdown
    if pdf_to_md(pdf, md_out):
        print(f"  ✓ Markdown: {md_out}")
    
    # Convert to JSONL
    if pdf_to_jsonl_pages(pdf, jsonl_out):
        print(f"  ✓ JSONL: {jsonl_out}")

if __name__ == "__main__":
    main()
