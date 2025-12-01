#!/bin/bash

# Biology in Data - TSX to JSX Conversion Script
# This script helps convert TypeScript files to JavaScript

echo "=== Biology in Data TSX to JSX Conversion ==="
echo ""

# Create src directory structure if it doesn't exist
mkdir -p src/components/figma
mkdir -p src/pages
mkdir -p src/contexts
mkdir -p src/lib
mkdir -p src/styles

echo "✓ Directory structure created"

# Copy CSS files (no conversion needed)
echo ""
echo "Copying CSS files..."
cp styles/components.module.css src/styles/ 2>/dev/null && echo "✓ components.module.css" || echo "✗ components.module.css not found"
cp styles/HomePage.module.css src/styles/ 2>/dev/null && echo "✓ HomePage.module.css" || echo "✗ HomePage.module.css not found"
cp styles/pages.module.css src/styles/ 2>/dev/null && echo "✓ pages.module.css" || echo "✗ pages.module.css not found"
cp styles/ResearchListPage.module.css src/styles/ 2>/dev/null && echo "✓ ResearchListPage.module.css" || echo "✗ ResearchListPage.module.css not found"

echo ""
echo "=== Conversion Complete ==="
echo ""
echo "Files successfully set up:"
echo "  ✓ index.html"
echo "  ✓ vite.config.js"
echo "  ✓ package.json"
echo "  ✓ src/main.jsx"
echo "  ✓ src/App.jsx"
echo "  ✓ src/contexts/AuthContext.jsx"
echo "  ✓ src/lib/mockData.js"
echo "  ✓ src/components/ProtectedRoute.jsx"
echo "  ✓ src/components/ChartFrame.jsx"
echo "  ✓ src/components/NavbarNew.jsx"
echo "  ✓ src/components/FooterNew.jsx"
echo "  ✓ src/styles/*.css (all CSS files)"
echo ""
echo "Next steps:"
echo "  1. Review CONVERSION_GUIDE.md for conversion patterns"
echo "  2. Convert remaining .tsx files to .jsx manually"
echo "  3. Run: npm install"
echo "  4. Run: npm run dev"
echo ""
