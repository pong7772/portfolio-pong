#!/bin/bash

# Script to generate favicons from profile picture
# Usage: ./scripts/generate-favicons.sh

SOURCE_IMAGE="public/images/pongpf.png"
FAVICON_DIR="public/favicon"

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed. Please install it first."
    echo "macOS: brew install imagemagick"
    exit 1
fi

# Use magick if available, otherwise use convert
if command -v magick &> /dev/null; then
    CONVERT_CMD="magick"
else
    CONVERT_CMD="convert"
fi

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "Error: Source image not found at $SOURCE_IMAGE"
    exit 1
fi

# Create favicon directory
mkdir -p "$FAVICON_DIR"

echo "Generating favicons from $SOURCE_IMAGE..."

# Generate PNG favicons
$CONVERT_CMD "$SOURCE_IMAGE" -resize 16x16 "$FAVICON_DIR/favicon-16x16.png"
$CONVERT_CMD "$SOURCE_IMAGE" -resize 32x32 "$FAVICON_DIR/favicon-32x32.png"
$CONVERT_CMD "$SOURCE_IMAGE" -resize 180x180 "$FAVICON_DIR/apple-touch-icon.png"
$CONVERT_CMD "$SOURCE_IMAGE" -resize 192x192 "$FAVICON_DIR/android-chrome-192x192.png"
$CONVERT_CMD "$SOURCE_IMAGE" -resize 512x512 "$FAVICON_DIR/android-chrome-512x512.png"
$CONVERT_CMD "$SOURCE_IMAGE" -resize 150x150 "$FAVICON_DIR/mstile-150x150.png"

# Generate ICO file (multi-resolution)
$CONVERT_CMD "$SOURCE_IMAGE" \( -clone 0 -resize 16x16 \) \( -clone 0 -resize 32x32 \) \( -clone 0 -resize 48x48 \) -delete 0 -alpha off -colors 256 "$FAVICON_DIR/favicon.ico"

# Copy favicon.ico to public root
cp "$FAVICON_DIR/favicon.ico" "public/favicon.ico"

echo "✅ Favicons generated successfully!"
echo "Files created in $FAVICON_DIR/ and public/favicon.ico"

