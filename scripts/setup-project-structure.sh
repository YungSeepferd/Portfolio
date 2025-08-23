#!/bin/bash
# setup-project-structure.sh
# This script creates the initial directory structure for the new project organization

# Set the base directory to the current directory
BASE_DIR="$(pwd)"
SRC_DIR="$BASE_DIR/src"

echo "Setting up new project structure in $SRC_DIR..."

# Create main feature directory
mkdir -p "$SRC_DIR/features"
echo "✅ Created features directory"

# Create feature subdirectories
mkdir -p "$SRC_DIR/features/about/components"
mkdir -p "$SRC_DIR/features/about/hooks"
mkdir -p "$SRC_DIR/features/about/types"
mkdir -p "$SRC_DIR/features/about/utils"
touch "$SRC_DIR/features/about/index.ts"
echo "✅ Created about feature structure"

mkdir -p "$SRC_DIR/features/projects/components"
mkdir -p "$SRC_DIR/features/projects/hooks"
mkdir -p "$SRC_DIR/features/projects/types"
mkdir -p "$SRC_DIR/features/projects/utils"
touch "$SRC_DIR/features/projects/index.ts"
echo "✅ Created projects feature structure"

mkdir -p "$SRC_DIR/features/contact/components"
mkdir -p "$SRC_DIR/features/contact/hooks"
mkdir -p "$SRC_DIR/features/contact/types"
mkdir -p "$SRC_DIR/features/contact/utils"
touch "$SRC_DIR/features/contact/index.ts"
echo "✅ Created contact feature structure"

mkdir -p "$SRC_DIR/features/visualization/components"
mkdir -p "$SRC_DIR/features/visualization/hooks"
mkdir -p "$SRC_DIR/features/visualization/contexts"
mkdir -p "$SRC_DIR/features/visualization/types"
mkdir -p "$SRC_DIR/features/visualization/utils"
touch "$SRC_DIR/features/visualization/index.ts"
echo "✅ Created visualization feature structure"

# Create component directories
mkdir -p "$SRC_DIR/components/ui"
mkdir -p "$SRC_DIR/components/layout"
mkdir -p "$SRC_DIR/components/feedback"
echo "✅ Created component category directories"

# Create context directories
mkdir -p "$SRC_DIR/contexts/ThemeContext"
mkdir -p "$SRC_DIR/contexts/AccessibilityContext"
mkdir -p "$SRC_DIR/contexts/ModalContext"
echo "✅ Created context directories"

# Create hooks directories
mkdir -p "$SRC_DIR/hooks/animation"
mkdir -p "$SRC_DIR/hooks/media"
mkdir -p "$SRC_DIR/hooks/form"
mkdir -p "$SRC_DIR/hooks/interaction"
touch "$SRC_DIR/hooks/index.ts"
echo "✅ Created hooks directories"

# Create utility directories
mkdir -p "$SRC_DIR/utils/formatting"
mkdir -p "$SRC_DIR/utils/validation"
mkdir -p "$SRC_DIR/utils/animation"
mkdir -p "$SRC_DIR/utils/media"
touch "$SRC_DIR/utils/index.ts"
echo "✅ Created utility directories"

echo "Creating sample index files..."

# Create barrel exports
cat > "$SRC_DIR/hooks/index.ts" << EOL
// Main hooks barrel export
export * from './animation';
export * from './media';
export * from './form';
export * from './interaction';
EOL

cat > "$SRC_DIR/utils/index.ts" << EOL
// Main utils barrel export
export * from './formatting';
export * from './validation';
export * from './animation';
export * from './media';
EOL

cat > "$SRC_DIR/features/about/index.ts" << EOL
// About feature public API
// Export components, hooks, and types that should be accessible outside the feature
EOL

cat > "$SRC_DIR/features/projects/index.ts" << EOL
// Projects feature public API
// Export components, hooks, and types that should be accessible outside the feature
EOL

cat > "$SRC_DIR/features/contact/index.ts" << EOL
// Contact feature public API
// Export components, hooks, and types that should be accessible outside the feature
EOL

cat > "$SRC_DIR/features/visualization/index.ts" << EOL
// Visualization feature public API
// Export components, hooks, and types that should be accessible outside the feature
EOL

echo "✅ Created sample index files"

echo "📝 Directory structure setup complete!"
echo "Next steps:"
echo "1. Begin migrating shared components to their new locations"
echo "2. Move context providers to their dedicated folders"
echo "3. Start migrating feature components"
echo "4. Update the MIGRATION_TRACKER.md file to track progress"
