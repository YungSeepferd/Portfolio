#!/usr/bin/env python3
"""
Sanitize PDF filenames to ASCII-safe, underscore-separated format.
Removes spaces, umlauts, and special characters that break tools.
"""
import os
import re
import sys
import unicodedata
import pathlib

def sanitize_filenames(root_path):
    """Sanitize all PDF filenames in the given directory tree."""
    root = pathlib.Path(root_path)
    pattern = re.compile(r"[^A-Za-z0-9._-]+")
    
    renamed_count = 0
    for p in root.rglob("*.pdf"):
        # Normalize unicode and convert to ASCII
        safe = unicodedata.normalize("NFKD", p.stem).encode("ascii", "ignore").decode()
        # Replace non-alphanumeric with underscores
        safe = pattern.sub("_", safe).strip("_")
        # Keep names under 80 chars
        new = p.with_name(f"{safe[:80]}.pdf")
        
        if new != p:
            p.rename(new)
            print(f"Renamed: {p.name} -> {new.name}")
            renamed_count += 1
    
    print(f"\nTotal files renamed: {renamed_count}")
    return renamed_count

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python sanitize_filenames.py /path/to/pdfs")
        sys.exit(1)
    
    root_dir = sys.argv[1]
    if not os.path.exists(root_dir):
        print(f"Error: Directory not found: {root_dir}")
        sys.exit(1)
    
    sanitize_filenames(root_dir)
