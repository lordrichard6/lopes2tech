#!/bin/bash

# Favicon Generator Script for lopes2tech
# This script generates all required favicon sizes from your main favicon

echo "🎨 Generating favicons for lopes2tech..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Please install it first:"
    echo "   brew install imagemagick"
    exit 1
fi

# Navigate to public directory
cd public

# Check if source favicon exists
if [ ! -f "favicon.ico" ]; then
    echo "❌ Source favicon.ico not found in public directory"
    exit 1
fi

echo "📱 Generating PNG favicons..."

# Generate PNG favicons for web
convert favicon.ico -resize 16x16 favicon-16x16.png
convert favicon.ico -resize 32x32 favicon-32x32.png
convert favicon.ico -resize 48x48 favicon-48x48.png
convert favicon.ico -resize 64x64 favicon-64x64.png
convert favicon.ico -resize 96x96 favicon-96x96.png
convert favicon.ico -resize 128x128 favicon-128x128.png
convert favicon.ico -resize 192x192 favicon-192x192.png
convert favicon.ico -resize 512x512 favicon-512x512.png

echo "🍎 Generating Apple Touch Icons..."

# Generate Apple Touch Icons
convert favicon.ico -resize 57x57 apple-touch-icon-57x57.png
convert favicon.ico -resize 60x60 apple-touch-icon-60x60.png
convert favicon.ico -resize 72x72 apple-touch-icon-72x72.png
convert favicon.ico -resize 76x76 apple-touch-icon-76x76.png
convert favicon.ico -resize 114x114 apple-touch-icon-114x114.png
convert favicon.ico -resize 120x120 apple-touch-icon-120x120.png
convert favicon.ico -resize 144x144 apple-touch-icon-144x144.png
convert favicon.ico -resize 152x152 apple-touch-icon-152x152.png
convert favicon.ico -resize 180x180 apple-touch-icon.png

echo "🪟 Generating Microsoft Tiles..."

# Generate Microsoft Tiles
convert favicon.ico -resize 70x70 mstile-70x70.png
convert favicon.ico -resize 144x144 mstile-144x144.png
convert favicon.ico -resize 150x150 mstile-150x150.png
convert favicon.ico -resize 310x310 mstile-310x310.png
convert favicon.ico -resize 310x150 mstile-310x150.png

echo "✅ All favicons generated successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Build your Angular project: npm run build"
echo "2. Deploy to your server"
echo "3. Test using Google's Rich Results Test: https://search.google.com/test/rich-results"
echo "4. Request reindexing in Google Search Console"
echo ""
echo "🔍 For Google to show your favicon:"
echo "- Your favicon should be a multiple of 48x48 pixels (48x48, 96x96, 144x144, etc.)"
echo "- It should be publicly accessible at https://lopes2tech.ch/favicon.ico"
echo "- Google typically updates search results within a few days to weeks"
