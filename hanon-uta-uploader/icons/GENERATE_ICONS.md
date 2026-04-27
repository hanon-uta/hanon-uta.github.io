# Icon Generation Script

This script helps generate PNG icons from the SVG file.

## Using Online Tools

1. Visit https://cloudconvert.com/svg-to-png
2. Upload `icon.svg`
3. Set sizes: 16x16, 48x48, 128x128
4. Download and rename to:
   - icon16.png
   - icon48.png
   - icon128.png

## Using Command Line (with ImageMagick)

If you have ImageMagick installed:

```bash
# Install ImageMagick (Windows)
# Download from https://imagemagick.org/script/download.php#windows

# Generate icons
magick icon.svg -resize 16x16 icon16.png
magick icon.svg -resize 48x48 icon48.png
magick icon.svg -resize 128x128 icon128.png
```

## Using Node.js (with sharp)

```bash
npm install sharp
node generate-icons.js
```

## Temporary Solution

For immediate testing without icons:
1. The extension will still work without icons
2. Chrome will show a default puzzle piece icon
3. You can add icons later

## Note

The SVG icon is a simple microphone design on a blue background.
You can customize it by editing `icon.svg` in any text editor or vector graphics software.
