# Feature Documentation

## New Features

### 1. Song List Preview and Editing ✨

**Description:**
- Automatically parses timeline and displays song list after data extraction
- Each song shows index, time, and title
- Direct timeline text editing supported
- Real-time preview updates after editing

**Usage Flow:**
1. Click "Extract Data" to extract data
2. View song list preview
3. If modification needed, click "✏️ Edit Timeline"
4. Edit timeline in the editor
5. Click "Save Changes" to save
6. Preview updates automatically

**UI Elements:**
- Song list: Displays all extracted songs
- Edit button: Opens timeline editor
- Editor: Text box supporting multi-line editing
- Save/Cancel buttons: Confirm or cancel changes

---

### 2. Multiple Timeline Source Selection 👥

**Description:**
- Automatically detects timeline comments from all target users
- Shows dropdown menu for user to select which data source to use
- Can switch between different timeline sources
- Real-time preview of selected timeline

**Usage Flow:**
1. Click "Extract Data" to extract data
2. If multiple timeline sources found, dropdown menu appears
3. Select desired user
4. Song list updates automatically
5. Can switch to other users anytime

**UI Elements:**
- Timeline selection dropdown: Shows all available users
- Status message: Shows how many timeline sources found

---

### 3. Dynamic Target User Management ⚙️

**Description:**
- Can add or remove target users in settings
- One username per line (@username)
- Takes effect immediately after saving
- Settings persist in browser storage

**Usage Flow:**
1. Click "⚙️ Settings" button
2. Edit target user list in text box
3. One username per line
4. Click "Save Settings" to save
5. Click "← Back" to return to main interface

**UI Elements:**
- Settings button: Opens settings page
- Target users text box: Multi-line text input
- Save settings button: Save changes
- Back button: Return to main interface

---

## Technical Implementation

### Data Flow

```
YouTube Page
    ↓
content.js extracts data
    ↓
Returns all matching timelines
    ↓
popup.js displays selection interface
    ↓
User selects timeline
    ↓
Parse and display song list
    ↓
User edits (optional)
    ↓
Update JSON preview
    ↓
Upload to GitHub
```

### Storage Mechanism

- **GitHub Token**: Stored in `chrome.storage.local`
- **Target users list**: Stored in `chrome.storage.local`
- **Data persistence**: Remains after browser closes

### Message Passing

```
popup.js → content.js
  - extractData: Extract video data
  - getTargetUsers: Get default target users
  - setTargetUsers: Update target users list

content.js → popup.js
  - Return extracted data
  - Return target users list
  - Confirm settings update
```

---

## UI Layout

### Main Interface
```
┌─────────────────────────┐
│   🎤 Hanon Uta Uploader  │
├─────────────────────────┤
│ VTuber: [dropdown]       │
│                          │
│ [Extract Data] [Settings]│
│                          │
│ [Timeline selection - optional]│
│                          │
│ Song list preview:       │
│ ┌─────────────────────┐ │
│ │ 1. 0:11:39 Song...  │ │
│ │ 2. 0:17:06 Song...  │ │
│ │ ...                 │ │
│ └─────────────────────┘ │
│ [✏️ Edit Timeline]       │
│                          │
│ JSON Preview:            │
│ ┌─────────────────────┐ │
│ │ { ... }             │ │
│ └─────────────────────┘ │
│                          │
│ [Upload to GitHub]       │
│                          │
│ [Status message]         │
└─────────────────────────┘
```

### Settings Interface
```
┌─────────────────────────┐
│   Settings               │
├─────────────────────────┤
│ Target Users:            │
│ ┌─────────────────────┐ │
│ │ @user1              │ │
│ │ @user2              │ │
│ │ @user3              │ │
│ │ ...                 │ │
│ └─────────────────────┘ │
│                          │
│ [← Back] [Save Settings] │
└─────────────────────────┘
```

### Edit Interface
```
┌─────────────────────────┐
│   Edit Timeline          │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 0:03:20 Opening     │ │
│ │ 0:11:39 01. Song... │ │
│ │ 0:17:06 02. Song... │ │
│ │ ...                 │ │
│ │ [Editable text box]  │ │
│ └─────────────────────┘ │
│                          │
│ [Cancel] [Save Changes]  │
└─────────────────────────┘
```

---

## User Experience Improvements

### 1. Smart Defaults
- Auto-detect VTuber type
- Auto-select first timeline source
- Load saved target users list

### 2. Real-time Feedback
- Show progress during data extraction
- Update preview immediately after timeline selection
- Real-time song list update after editing
- Detailed status during upload

### 3. Error Handling
- Invalid GitHub Token prompt
- Error message on extraction failure
- Detailed error on upload failure
- Retry prompt on network errors

### 4. Flexibility
- Can switch timeline sources anytime
- Can edit timeline multiple times
- Can modify target users list
- Can cancel edit operations

---

## Future Possible Improvements

1. **Batch upload**: Support uploading multiple videos at once
2. **History**: Show recently uploaded videos
3. **Templates**: Save common timeline formats
4. **Keyboard shortcuts**: Support keyboard operations
5. **Theme switching**: Support dark mode
6. **Export function**: Export as local JSON file
7. **Import function**: Import timeline from local file
8. **Enhanced validation**: Stricter format validation
9. **Statistics**: Show upload statistics
10. **Multi-language support**: Support English/Japanese interface

---

## FAQ

### Q: Why can't I find a timeline?
A: Check if the target users list is correct, ensure these users have posted comments with timestamps in the video comments section.

### Q: How do I add new target users?
A: Click the "Settings" button, add usernames in the text box (one per line), then save.

### Q: Will the format be messed up after editing the timeline?
A: No, the editor maintains the original format, only modifying the content.

### Q: Can I switch timeline sources?
A: Yes, use the dropdown menu to switch anytime, the preview will update automatically.

### Q: Will settings be saved?
A: Yes, all settings are stored locally in the browser and remain after closing the browser.

---

## Summary

This update significantly improves the usability and flexibility of the extension:

✅ **Preview feature**: View and edit song list before upload
✅ **Multi-source selection**: Choose the most suitable from multiple timeline sources
✅ **Custom configuration**: Flexibly manage target users list
✅ **Real-time feedback**: Instant feedback for all operations
✅ **User-friendly**: Clear interface, simple operations

These features make the entire upload process more controllable and efficient!

