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
OUTPUT_FILE="$OUTPUT_DIR/yt-clean-v$VERSION.zip"

echo "Packaging Monkey Brain Extension Version $VERSION..."

# Create a dist folder if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Remove the old zip if it exists to ensure purely fresh packaging
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# Switch to the src directory so the zip archive is built from the root of src/
cd src
# Zip the necessary files into the root's dist folder
zip -r "../$OUTPUT_FILE" . -x "*.DS_Store"
cd ..

echo "✅ Success! Ready to upload: $OUTPUT_FILE"
