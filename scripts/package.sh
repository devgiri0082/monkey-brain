#!/bin/bash

# Get the directory where the script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Go to the project root
cd "$DIR/.."

# Read version from manifest.json (simple grep, works if the format matches)
VERSION=$(grep '"version"' src/manifest.json | grep -o '[0-9\.]*' | head -n 1)
if [ -z "$VERSION" ]; then
    VERSION="1.0"
fi

OUTPUT_DIR="dist"
OUTPUT_FILE="$OUTPUT_DIR/monkey-brain-v$VERSION.zip"

echo "Packaging Monkey Brain Extension Version $VERSION..."

# Create a dist folder if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Remove the old zip if it exists to ensure purely fresh packaging
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# -----------------
# BUILD PREPARATION
# -----------------
BUILD_DIR=".build_tmp"
# Clean up any residual buildup
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copy all the raw extension files over
# We use this temp directory so we don't dirty the src/ folder with generated resizes
cp -R src/* "$BUILD_DIR/"

# -----------------
# ASSET COMPILATION
# -----------------
if [ -f "$BUILD_DIR/icon.png" ]; then
    echo "Generating resized icons for Chrome from master icon.png..."
    sips -s format png -z 16 16 "$BUILD_DIR/icon.png" --out "$BUILD_DIR/icon16.png" > /dev/null
    sips -s format png -z 48 48 "$BUILD_DIR/icon.png" --out "$BUILD_DIR/icon48.png" > /dev/null
    sips -s format png -z 128 128 "$BUILD_DIR/icon.png" --out "$BUILD_DIR/icon128.png" > /dev/null
    
    # We remove the master icon from the built extension to save space, 
    # since manifest.json only points to the specific sizes
    rm "$BUILD_DIR/icon.png"
else
    echo "Warning: No master icon.png found in src/. Make sure you have one!"
fi

# -----------------
# PACKAGING
# -----------------
# Switch to the build directory so the zip archive is built from the root of src/
cd "$BUILD_DIR"
# Zip the necessary files into the root's dist folder
zip -r "../$OUTPUT_FILE" . -x "*.DS_Store"
cd ..

# Clean up the temporary build directory
rm -rf "$BUILD_DIR"

echo "✅ Success! Ready to upload: $OUTPUT_FILE"
