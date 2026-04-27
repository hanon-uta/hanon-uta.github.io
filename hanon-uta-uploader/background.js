// Background service worker
// This file is required by manifest.json but currently doesn't need any logic
// It can be used for future features like:
// - Handling GitHub API rate limiting
// - Caching data
// - Background sync

chrome.runtime.onInstalled.addListener(() => {
  console.log('Hanon Uta Uploader installed');
});
