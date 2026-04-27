# Hanon Uta Uploader

Browser extension for uploading karaoke timeline data to GitHub repository.

## Features

- 🎤 Extract video data from YouTube pages automatically
- 🤖 Auto-detect VTuber type (Hanon, Clara, Gabu, Kaname)
- 📋 Preview and edit song list before upload
- 👥 Select from multiple timeline sources when available
- ⚙️ Customize target users for timeline extraction
- 📤 Upload directly to GitHub repository
- ✅ Validate JSON format before upload
- 🔄 Update existing files automatically
- 🚀 Trigger GitHub Actions deployment automatically

## Installation

### Developer Mode (Recommended)

1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `hanon-uta-uploader` folder

### Packed Extension

1. In `chrome://extensions/`, enable "Developer mode"
2. Click "Pack extension"
3. Select the `hanon-uta-uploader` folder
4. The `.crx` file will be generated

## Setup

### 1. Create GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Set token name (e.g., "Hanon Uta Uploader")
4. Select permissions: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)

### 2. Configure Extension

1. Navigate to any YouTube video page
2. Click the extension icon in your browser toolbar
3. Paste your GitHub token
4. Click "Save Token"

### 3. Configure Target Users (Optional)

1. Click the "⚙️ Settings" button
2. Add or remove target users (one per line)
3. Click "Save Settings"
4. These users' comments will be searched for timeline data

## Usage

### Upload New Data

1. Navigate to a YouTube karaoke video
2. Click the extension icon
3. Click "Extract Data"
4. **If multiple timelines found**: Select the desired timeline source
5. **Preview the song list**: Review extracted songs
6. **Edit if needed**: Click "✏️ Edit Timeline" to make changes
7. Verify the VTuber selection (auto-detected)
8. **Optional**: Adjust publish date or add file suffix
9. Click "Upload to GitHub"
10. Wait for success message
11. GitHub Actions will automatically build and deploy

### State Persistence

The extension automatically saves your progress:
- **Auto-save**: Data is saved after extracting, selecting timeline, or editing
- **Auto-restore**: Reopen the extension to continue where you left off
- **Auto-clear**: State is cleared after successful upload
- **Manual clear**: Click "🗑️ Clear" to reset and start fresh

### Update Token or Repository

If you need to update your GitHub token or change the repository:

1. Click the extension icon
2. Click "🔑 Update Token"
3. Update the token and/or repository name
4. Click "Save Token"
5. Click "← Back to Upload" to return

### File Naming

- **Default**: `YYYY-MM-DD.json` (e.g., `2026-01-30.json`)
- **With suffix**: `YYYY-MM-DD_2.json`, `YYYY-MM-DD_3.json`, etc.
- Use suffix when multiple videos on the same day
- Example: Enter `_2` in "File Suffix" field for second video of the day

### Publish Date

- **Auto-detect**: Automatically extracted from YouTube video
- **Manual input**: Enter custom date in `YYYY-MM-DD HH:MM:SS` format
- **Default**: Current time if not available
- Used for both file naming and JSON data

### Multiple Timeline Sources

When multiple target users have posted timeline comments:
1. A dropdown will appear showing all available sources
2. Select the user whose timeline you want to use
3. The song list will update automatically
4. You can switch between sources before uploading

### Editing Timeline

1. After extracting data, click "✏️ Edit Timeline"
2. Modify the timeline text as needed
3. Click "Save Changes"
4. The song list preview will update
5. Upload when satisfied

### Update Existing Data

If a file with the same date already exists, the extension will automatically update it instead of creating a new one.

## Supported VTubers

- **Hanon** (香鳴ハノン) - Hanon Ch. 香鳴ハノン【パレプロ】
- **Clara** (暁月クララ) - Clara Ch. 暁月クララ【パレプロ】
- **Gabu** (鎖乙女がぶ) - Gabu Ch. 鎖乙女がぶ【パレプロ】
- **Kaname** (常磐カナメ) - Kaname Ch. 常磐カナメ【パレプロ】

## Data Format

The extension extracts the following data from YouTube:

```json
{
  "video_title": "Video title",
  "video_artist": "Channel name",
  "video_id": "YouTube video ID",
  "video_publish_date_str": "YYYY-MM-DD HH:MM:SS",
  "song_timeline": "Timeline from comments"
}
```

## File Structure

Uploaded files are saved to:
```
src/assets/data/{vtuber}/{YYYY-MM-DD}.json
```

## Timeline Format

The timeline should follow this format:
```
0:03:20 Opening
0:11:39 01. Song Title / Artist
0:17:06 02. Another Song / Artist
```

Each line should start with a timestamp (HH:MM:SS or MM:SS) followed by the song information.

## Troubleshooting

### "Failed to extract data"
- Make sure you're on a YouTube video page
- Refresh the page and try again
- Check browser console for errors

### "Upload failed"
- Verify your GitHub token has `repo` permissions
- Check that the repository exists and you have write access
- Check GitHub API rate limits

### "File exists, updating..."
- This is normal behavior when updating existing data
- The extension will overwrite the existing file

### No timeline found
- Check that target users have posted timeline comments
- Try adding more target users in Settings
- Verify the comment format includes timestamps

### Multiple timelines available
- Use the dropdown to select the desired source
- Preview each timeline before choosing
- You can switch between sources

## Security

- GitHub tokens are stored locally in your browser using Chrome Storage API
- Tokens are never sent to any server except GitHub API
- You can revoke the token at any time from GitHub settings

## Development

### File Structure

```
hanon-uta-uploader/
├── manifest.json       # Extension configuration
├── content.js          # YouTube page script
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic
├── popup.css           # Popup styles
├── background.js       # Background service worker
├── icons/              # Extension icons
└── README.md           # This file
```

### Testing

1. Load the extension in developer mode
2. Navigate to a YouTube video
3. Open browser console (F12)
4. Click extension icon and test functionality
5. Check console for any errors

## License

MIT License

## Contributing

Feel free to submit issues and pull requests!
