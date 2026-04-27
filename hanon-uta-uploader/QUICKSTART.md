# Quick Start Guide

## Installation (5 minutes)

### Step 1: Prepare Icons (Optional)

The extension works without icons, but for a better experience:

1. Visit https://cloudconvert.com/svg-to-png
2. Upload `icons/icon.svg`
3. Convert to 16x16, 48x48, and 128x128 PNG
4. Save as `icon16.png`, `icon48.png`, `icon128.png` in the `icons/` folder

### Step 2: Install Extension

1. Open Chrome/Edge browser
2. Navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" (toggle in top right corner)
4. Click "Load unpacked"
5. Select the `hanon-uta-uploader` folder
6. Extension is now installed!

### Step 3: Create GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Hanon Uta Uploader"
4. Expiration: No expiration (or choose your preference)
5. Check: `repo` (full control of private repositories)
6. Click "Generate token"
7. **Copy the token** (starts with `ghp_`)

### Step 4: Configure Extension

1. Navigate to any YouTube video page
2. Click the extension icon in your browser toolbar
3. Paste your GitHub token
4. Click "Save Token"
5. Setup complete!

## First Upload

1. Navigate to a YouTube karaoke video
2. Click the extension icon
3. Click "Extract Data"
4. Review the extracted data
5. Verify VTuber selection (auto-detected)
6. Click "Upload to GitHub"
7. Wait for success message
8. Done! GitHub Actions will deploy automatically

## Troubleshooting

### Extension not loading
- Make sure "Developer mode" is enabled
- Check that you selected the correct folder
- Look for error messages in the extensions page

### Can't extract data
- Make sure you're on a YouTube video page (not homepage)
- Refresh the page and try again
- Check browser console (F12) for errors

### Upload failed
- Verify GitHub token has `repo` permissions
- Check that you have write access to the repository
- Check GitHub API status: https://www.githubstatus.com/

### Token not saving
- Make sure you're entering a valid token (starts with `ghp_`)
- Try refreshing the page
- Check browser console for errors

## Tips

- The extension auto-detects VTuber from video title/channel
- You can manually change the VTuber selection
- Existing files will be updated automatically
- Check GitHub Actions for deployment status

## Support

For issues or questions:
- Check the main README.md
- Open an issue on GitHub
- Check browser console for error messages
