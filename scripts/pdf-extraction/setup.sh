#!/usr/bin/env bash
# Setup script for PDF extraction pipeline

set -euo pipefail

echo "=========================================="
echo "PDF Extraction Pipeline Setup"
echo "=========================================="
echo ""

# Check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "✓ Detected macOS"
    
    # Check for Homebrew
    if ! command -v brew &> /dev/null; then
        echo "✗ Homebrew not found. Please install from https://brew.sh"
        exit 1
    fi
    echo "✓ Homebrew installed"
    
    # Check/install system dependencies
    echo ""
    echo "Checking system dependencies..."
    
    deps=("qpdf" "gs" "tesseract" "ocrmypdf")
    missing=()
    
    for dep in "${deps[@]}"; do
        if command -v "$dep" &> /dev/null; then
            echo "  ✓ $dep"
        else
            echo "  ✗ $dep (missing)"
            missing+=("$dep")
        fi
    done
    
    if [ ${#missing[@]} -gt 0 ]; then
        echo ""
        echo "Installing missing dependencies..."
        brew install qpdf ghostscript tesseract ocrmypdf
    fi
else
    echo "⚠ Non-macOS system detected"
    echo "Please install manually:"
    echo "  - qpdf"
    echo "  - ghostscript"
    echo "  - tesseract"
    echo "  - ocrmypdf"
fi

echo ""
echo "=========================================="
echo "Python Environment Setup"
echo "=========================================="
echo ""

# Navigate to repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

# Check for Python 3
if ! command -v python3 &> /dev/null; then
    echo "✗ Python 3 not found. Please install Python 3.8+"
    exit 1
fi
echo "✓ Python 3 found: $(python3 --version)"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo ""
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo "✓ Virtual environment created"
else
    echo "✓ Virtual environment exists"
fi

# Activate and install dependencies
echo ""
echo "Installing Python dependencies..."
source venv/bin/activate
pip install --upgrade pip --quiet
pip install pymupdf PyPDF2 ocrmypdf pymupdf4llm --quiet

echo "✓ Python dependencies installed:"
echo "  - pymupdf (PyMuPDF)"
echo "  - PyPDF2"
echo "  - ocrmypdf"
echo "  - pymupdf4llm"

# Make scripts executable
echo ""
echo "Making scripts executable..."
chmod +x "$SCRIPT_DIR"/*.sh
chmod +x "$SCRIPT_DIR"/*.py
echo "✓ Scripts are executable"

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "To use the extraction pipeline:"
echo ""
echo "1. Activate the virtual environment:"
echo "   source venv/bin/activate"
echo ""
echo "2. Run the batch extraction:"
echo "   bash scripts/pdf-extraction/batch_extract_all.sh src/assets/information"
echo ""
echo "3. Review extracted files:"
echo "   ls src/assets/information/**/*.txt"
echo ""
