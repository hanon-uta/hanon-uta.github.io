document.addEventListener('DOMContentLoaded', async () => {
  const setupSection = document.getElementById('setup-section');
  const uploadSection = document.getElementById('upload-section');
  const settingsSection = document.getElementById('settings-section');
  const tokenInput = document.getElementById('github-token');
  const saveTokenBtn = document.getElementById('save-token');
  const vtuberSelect = document.getElementById('vtuber-select');
  const extractBtn = document.getElementById('extract-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const backBtn = document.getElementById('back-btn');
  const uploadBtn = document.getElementById('upload-btn');
  const jsonPreview = document.getElementById('json-preview');
  const status = document.getElementById('status');
  const timelineSelection = document.getElementById('timeline-selection');
  const timelineSelect = document.getElementById('timeline-select');
  const songPreview = document.getElementById('song-preview');
  const songList = document.getElementById('song-list');
  const editTimelineBtn = document.getElementById('edit-timeline-btn');
  const timelineEditor = document.getElementById('timeline-editor');
  const timelineEditorText = document.getElementById('timeline-editor-text');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const saveEditBtn = document.getElementById('save-edit-btn');
  const targetUsersTextarea = document.getElementById('target-users');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const publishDateInput = document.getElementById('publish-date');
  const fileSuffixInput = document.getElementById('file-suffix');
  const githubRepoInput = document.getElementById('github-repo');
  const updateConfigBtn = document.getElementById('update-config-btn');
  const clearStateBtn = document.getElementById('clear-state-btn');
  
  let currentData = null;
  let availableTimelines = [];
  let selectedTimeline = null;
  
  // Save state to storage
  async function saveState() {
    const stateToSave = {
      currentData: currentData,
      availableTimelines: availableTimelines,
      selectedTimeline: selectedTimeline !== null ? availableTimelines.findIndex(t => t.timeline === selectedTimeline) : null,
      vtuber: vtuberSelect.value,
      publishDate: publishDateInput.value,
      fileSuffix: fileSuffixInput.value
    };
    await chrome.storage.local.set(stateToSave);
  }
  
  // Clear saved state
  async function clearState() {
    await chrome.storage.local.remove([
      'currentData',
      'availableTimelines',
      'selectedTimeline',
      'vtuber',
      'publishDate',
      'fileSuffix'
    ]);
  }
  
  // Restore state from storage
  async function restoreState() {
    const { 
      currentData: savedData, 
      availableTimelines: savedTimelines,
      selectedTimeline: savedTimeline,
      vtuber: savedVtuber,
      publishDate: savedPublishDate,
      fileSuffix: savedSuffix
    } = await chrome.storage.local.get([
      'currentData', 
      'availableTimelines', 
      'selectedTimeline',
      'vtuber',
      'publishDate',
      'fileSuffix'
    ]);
    
    if (savedData) {
      currentData = savedData;
      jsonPreview.textContent = JSON.stringify(currentData, null, 2);
      uploadBtn.disabled = false;
      
      // Restore VTuber selection
      if (savedVtuber) {
        vtuberSelect.value = savedVtuber;
      }
      
      // Restore publish date
      if (savedPublishDate) {
        publishDateInput.value = savedPublishDate;
      } else if (currentData.video_publish_date_str) {
        publishDateInput.value = currentData.video_publish_date_str;
      }
      
      // Restore file suffix
      if (savedSuffix) {
        fileSuffixInput.value = savedSuffix;
      }
      
      // Restore timeline selection
      if (savedTimelines && savedTimelines.length > 0) {
        availableTimelines = savedTimelines;
        timelineSelection.classList.remove('hidden');
        
        // Clear existing options
        timelineSelect.innerHTML = '';
        
        // Add options
        savedTimelines.forEach((item, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = `${item.user} - ${item.timeline.substring(0, 50)}...`;
          timelineSelect.appendChild(option);
        });
        
        // Restore selected timeline
        if (savedTimeline !== null) {
          timelineSelect.value = savedTimeline;
          selectedTimeline = savedTimelines[savedTimeline].timeline;
          
          // Show song preview
          const songs = parseTimeline(selectedTimeline);
          displaySongPreview(songs);
        }
      } else if (currentData.song_timeline) {
        // Single timeline
        selectedTimeline = typeof currentData.song_timeline === 'string' 
          ? currentData.song_timeline 
          : currentData.song_timeline[0]?.timeline;
        
        if (selectedTimeline) {
          const songs = parseTimeline(selectedTimeline);
          displaySongPreview(songs);
        }
      }
      
      showStatus('Data restored from previous session', 'info');
    }
  }
  
  // Check if token is saved
  const { token, repo } = await chrome.storage.local.get(['token', 'repo']);
  if (token) {
    tokenInput.value = token;
    if (repo) {
      githubRepoInput.value = repo;
    }
    setupSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
    
    // Restore previous state
    await restoreState();
  }
  
  // Load target users
  const { targetUsers: savedTargetUsers } = await chrome.storage.local.get('targetUsers');
  if (savedTargetUsers) {
    targetUsersTextarea.value = savedTargetUsers.join('\n');
  } else {
    // Load default target users
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('youtube.com')) {
      try {
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getTargetUsers' });
        targetUsersTextarea.value = response.targetUsers.join('\n');
      } catch (error) {
        console.log('Could not load default target users');
      }
    }
  }
  
  // Save token
  saveTokenBtn.addEventListener('click', async () => {
    const token = tokenInput.value.trim();
    const repo = githubRepoInput.value.trim();
    
    if (token) {
      await chrome.storage.local.set({ token, repo });
      setupSection.classList.add('hidden');
      uploadSection.classList.remove('hidden');
      showStatus('Token saved!', 'success');
    } else {
      showStatus('Please enter a valid token', 'error');
    }
  });
  
  // Settings button
  settingsBtn.addEventListener('click', () => {
    uploadSection.classList.add('hidden');
    settingsSection.classList.remove('hidden');
  });
  
  // Update config button
  updateConfigBtn.addEventListener('click', () => {
    uploadSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
    // Pre-fill current values
    chrome.storage.local.get(['token', 'repo'], (data) => {
      if (data.token) {
        tokenInput.value = data.token;
      }
      if (data.repo) {
        githubRepoInput.value = data.repo;
      }
    });
  });
  
  // Back button
  backBtn.addEventListener('click', () => {
    settingsSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
  });
  
  // Back to upload from setup
  const setupBackBtn = document.createElement('button');
  setupBackBtn.textContent = '← Back to Upload';
  setupBackBtn.className = 'back-btn';
  setupBackBtn.style.marginTop = '10px';
  setupBackBtn.addEventListener('click', () => {
    setupSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
  });
  setupSection.appendChild(setupBackBtn);
  
  // Clear state button
  clearStateBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all saved data?')) {
      await clearState();
      currentData = null;
      availableTimelines = [];
      selectedTimeline = null;
      jsonPreview.textContent = '';
      uploadBtn.disabled = true;
      timelineSelection.classList.add('hidden');
      songPreview.classList.add('hidden');
      vtuberSelect.value = '';
      publishDateInput.value = '';
      fileSuffixInput.value = '';
      showStatus('Data cleared!', 'success');
    }
  });
  
  // Save settings
  saveSettingsBtn.addEventListener('click', async () => {
    const lines = targetUsersTextarea.value.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    await chrome.storage.local.set({ targetUsers: lines });
    showStatus('Settings saved!', 'success');
    
    // Also update content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('youtube.com')) {
      try {
        await chrome.tabs.sendMessage(tab.id, { action: 'setTargetUsers', targetUsers: lines });
      } catch (error) {
        console.log('Could not update content script');
      }
    }
  });
  
  // Extract data from current tab
  extractBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('youtube.com')) {
      showStatus('Please navigate to a YouTube video page', 'error');
      return;
    }
    
    try {
      showStatus('Extracting data...', 'info');
      
      // Try to send message, if content script is not loaded, inject it
      let response;
      try {
        response = await chrome.tabs.sendMessage(tab.id, { action: 'extractData' });
      } catch (error) {
        // Content script not loaded, inject it
        console.log('Content script not loaded, injecting...');
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
        
        // Wait a bit for the script to load
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Try again
        response = await chrome.tabs.sendMessage(tab.id, { action: 'extractData' });
      }
      
      currentData = response.data;
      
      // Auto-select VTuber
      if (response.vtuber) {
        vtuberSelect.value = response.vtuber;
      }
      
      // Auto-fill publish date if available
      if (currentData.video_publish_date_str) {
        publishDateInput.value = currentData.video_publish_date_str;
      }
      
      // Save state
      await saveState();
      
      // Check if we have multiple timelines
      if (Array.isArray(currentData.song_timeline) && currentData.song_timeline.length > 0) {
        availableTimelines = currentData.song_timeline;
        
        // Populate timeline select
        timelineSelect.innerHTML = '<option value="">Select a user...</option>';
        availableTimelines.forEach((item, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = item.user;
          timelineSelect.appendChild(option);
        });
        
        timelineSelection.classList.remove('hidden');
        showStatus(`Found ${availableTimelines.length} timeline sources. Please select one.`, 'info');
      } else {
        // Single timeline or no timeline
        selectedTimeline = currentData.song_timeline;
        showSongPreview(selectedTimeline);
        updateJSONPreview();
        uploadBtn.disabled = false;
        showStatus('Data extracted successfully!', 'success');
      }
    } catch (error) {
      showStatus('Failed to extract data: ' + error.message, 'error');
      console.error('Extract error:', error);
    }
  });
  
  // Timeline selection
  timelineSelect.addEventListener('change', async () => {
    const index = parseInt(timelineSelect.value);
    if (!isNaN(index) && availableTimelines[index]) {
      selectedTimeline = availableTimelines[index].timeline;
      showSongPreview(selectedTimeline);
      updateJSONPreview();
      uploadBtn.disabled = false;
      showStatus(`Selected timeline from ${availableTimelines[index].user}`, 'success');
      
      // Save state
      await saveState();
    }
  });
  
  // Show song preview
  function showSongPreview(timeline) {
    const songs = parseTimeline(timeline);
    songList.innerHTML = '';
    
    if (songs.length === 0) {
      songList.innerHTML = '<p class="no-songs">No songs found in timeline</p>';
      return;
    }
    
    songs.forEach((song, index) => {
      const songItem = document.createElement('div');
      songItem.className = 'song-item';
      
      const artistDisplay = song.artist ? ` / ${song.artist}` : '';
      songItem.innerHTML = `
        <span class="song-number">${index + 1}.</span>
        <span class="song-time">${song.time}</span>
        <span class="song-title">${song.title}${artistDisplay}</span>
      `;
      songList.appendChild(songItem);
    });
    
    songPreview.classList.remove('hidden');
  }
  
  // Parse timeline to extract songs (matching original project logic)
  function parseTimeline(timeline) {
    const songs = [];
    const lines = timeline.split('\n');
    
    // Time regex from original project
    // Matches: HH:MM:SS or MM:SS, optionally with ranges (0:07:50；0:12:15)
    const timeRegex = /^((?:\d{1,2}:\d{2}(?::\d{2})?)(?:\s*~\s*\d{1,2}:\d{2}(?::\d{2})?)?)(?:[;；]\s*(?:\d{1,2}:\d{2}(?::\d{2})?)(?:\s*~\s*\d{1,2}:\d{2}(?::\d{2})?)?)*\s+(.+)/;
    
    // Filter keywords from original project
    const filterKeywords = [
      'はのは',
      'スパチャ読み',
      'スパチャ',
      'チャンネル',
      'エンドカード',
      'END',
      'OP',
      'ED',
      '開始',
      '告知',
      'お知らせ',
      '雑談',
      '生写真',
      '研究生',
      'ばいばーい！',
      '待機',
      'MC',
      'スクショタイム',
      '同接',
      'こんばんは'
    ];
    
    lines.forEach(line => {
      const match = timeRegex.exec(line);
      if (match) {
        const time = match[1];
        let songInfo = match[2];
        
        // Remove numbering (e.g., "01. ", "02. ")
        songInfo = songInfo.replace(/^\d+\.\s*/, '');
        
        // Split song and artist
        let [title, artist] = songInfo.includes('/')
          ? songInfo.split('/').map(part => part.trim())
          : [songInfo.trim(), ''];
        
        // Remove duration timestamp and anything after it from artist
        if (artist) {
          artist = artist.replace(/\s*~?\d{1,2}:\d{2}(?::\d{2})?.*$/, '').trim();
        }
        
        // Filter out non-song content
        const shouldFilter = filterKeywords.some(keyword => {
          if (keyword === 'OP' || keyword === 'ED' || keyword === '待機' || keyword === 'MC' || keyword === 'スクショタイム' || keyword === 'ばいばーい！') {
            return title === keyword;
          }
          return title.includes(keyword);
        });
        
        if (!shouldFilter) {
          songs.push({
            time: time,
            title: title,
            artist: artist
          });
        }
      }
    });
    
    return songs;
  }
  
  // Update JSON preview
  function updateJSONPreview() {
    if (currentData) {
      const previewData = { ...currentData };
      previewData.song_timeline = selectedTimeline;
      jsonPreview.textContent = JSON.stringify(previewData, null, 2);
    }
  }
  
  // Edit timeline button
  editTimelineBtn.addEventListener('click', () => {
    timelineEditorText.value = selectedTimeline;
    songPreview.classList.add('hidden');
    timelineEditor.classList.remove('hidden');
  });
  
  // Cancel edit
  cancelEditBtn.addEventListener('click', () => {
    timelineEditor.classList.add('hidden');
    songPreview.classList.remove('hidden');
  });
  
  // Save edit
  saveEditBtn.addEventListener('click', async () => {
    selectedTimeline = timelineEditorText.value;
    showSongPreview(selectedTimeline);
    updateJSONPreview();
    timelineEditor.classList.add('hidden');
    songPreview.classList.remove('hidden');
    showStatus('Timeline updated!', 'success');
    
    // Save state
    await saveState();
  });
  
  // Upload to GitHub
  uploadBtn.addEventListener('click', async () => {
    const vtuber = vtuberSelect.value;
    if (!vtuber) {
      showStatus('Please select a VTuber', 'error');
      return;
    }
    
    const { token } = await chrome.storage.local.get('token');
    if (!token) {
      showStatus('Please set up GitHub token first', 'error');
      return;
    }
    
    const { repo } = await chrome.storage.local.get('repo');
    const githubRepo = repo || 'hanon-uta/hanon-uta.github.io';
    
    // Update current data with selected timeline
    currentData.song_timeline = selectedTimeline;
    
    // Handle video_publish_date_str
    let publishDateStr = publishDateInput.value.trim();
    if (!publishDateStr) {
      // Use auto-detected date or default to current time
      publishDateStr = currentData.video_publish_date_str;
      if (!publishDateStr) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        publishDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    }
    currentData.video_publish_date_str = publishDateStr;
    
    // Generate filename with optional suffix
    const dateStr = publishDateStr.split(' ')[0];
    const suffix = fileSuffixInput.value.trim();
    const filename = `${dateStr}${suffix}.json`;
    const path = `src/assets/data/${vtuber}/${filename}`;
    
    try {
      showStatus('Checking if file exists...', 'info');
      
      // Check if file exists
      const checkResponse = await fetch(
        `https://api.github.com/repos/${githubRepo}/contents/${path}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );
      
      let sha = null;
      if (checkResponse.ok) {
        const fileData = await checkResponse.json();
        sha = fileData.sha;
        showStatus('File exists, updating...', 'info');
      } else {
        showStatus('Creating new file...', 'info');
      }
      
      // Upload file with proper encoding
      showStatus('Uploading to GitHub...', 'info');
      const jsonString = JSON.stringify(currentData, null, 2);
      
      // Use TextEncoder to handle UTF-8 properly
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(jsonString);
      
      // Convert to base64
      let binaryString = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }
      const base64Content = btoa(binaryString);
      
      const uploadResponse = await fetch(
        `https://api.github.com/repos/${githubRepo}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `Upload ${filename} for ${vtuber}`,
            content: base64Content,
            sha: sha
          })
        }
      );
      
      if (uploadResponse.ok) {
        showStatus('Upload successful! GitHub Actions will deploy automatically.', 'success');
        uploadBtn.disabled = true;
        
        // Clear saved state after successful upload
        await clearState();
      } else {
        const error = await uploadResponse.json();
        showStatus('Upload failed: ' + error.message, 'error');
      }
    } catch (error) {
      showStatus('Upload failed: ' + error.message, 'error');
    }
  });
  
  function showStatus(message, type) {
    status.textContent = message;
    status.className = `status ${type}`;
  }
});
