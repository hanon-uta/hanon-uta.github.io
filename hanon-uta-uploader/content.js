// Extract video data from YouTube page
function extractVideoData() {
  const rawTitle = document.title;
  const video_title = rawTitle.replace(/^\(\d+\)\s*/, '').replace(/\s*-\s*YouTube$/, '').trim();
  
  const video_artist_element = document.querySelector('ytd-video-owner-renderer #channel-name a');
  const video_artist = video_artist_element ? video_artist_element.textContent.trim() : 'Unknown';
  
  const video_id = new URLSearchParams(window.location.search).get('v') || '';
  const video_publish_date_str = extractLiveStartDate();
  const song_timeline = extractCommentTimeline();
  
  return {
    video_title,
    video_artist,
    video_id,
    video_publish_date_str,
    song_timeline
  };
}

// Extract live start date
function extractLiveStartDate() {
  const pad = n => n.toString().padStart(2, '0');
  
  function fmt(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  
  function getVideoDurationSeconds() {
    const durationElem = document.querySelector('.ytp-time-duration');
    if (!durationElem) return 0;
    const parts = durationElem.textContent.trim().split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    else if (parts.length === 2) return parts[0] * 60 + parts[1];
    else if (parts.length === 1) return parts[0];
    return 0;
  }
  
  const infoElem = document.querySelector('#info-strings, #info');
  let endDate = null;
  
  if (infoElem) {
    const text = infoElem.textContent.trim();
    const regexes = [
      /直播开始日期[:：]\s*(\d{4})年(\d{1,2})月(\d{1,2})日(\s*(\d{1,2}):(\d{2}))?/,
      /配信開始日時[:：]\s*(\d{4})年(\d{1,2})月(\d{1,2})日\s*(\d{1,2}):(\d{2})?/,
      /Streamed (live )?on (\w+ \d{1,2}, \d{4})( at (\d{1,2}:\d{2}))?/
    ];
    
    for (const r of regexes) {
      const m = text.match(r);
      if (m) {
        const year = parseInt(m[1]), month = parseInt(m[2]) - 1, day = parseInt(m[3]);
        const hour = m[5] ? parseInt(m[5]) : 0;
        const min = m[6] ? parseInt(m[6]) : 0;
        endDate = new Date(year, month, day, hour, min, 0);
        break;
      }
    }
  }
  
  if (!endDate) {
    const metaDate = document.querySelector('meta[itemprop="uploadDate"]');
    if (metaDate && metaDate.content) {
      endDate = new Date(metaDate.content);
    }
  }
  
  if (!endDate) return 'Unknown Date';
  
  const durationSec = getVideoDurationSeconds();
  const startDate = new Date(endDate.getTime() - durationSec * 1000);
  return fmt(startDate);
}

// Extract timeline from comments
function extractCommentTimeline() {
  const targetUsers = [
    '@ささかま_k', '@tk-taks1984', '@timestamp-nog', '@haruto_nog', '@野上ハルト',
    '@harut0_nog', '@SaySay009', '@tomfukuとむふく', '@コイケン_koiken', '@remilia.s',
    '@ぽテさら', '@はこぴぴぴ', '@Cyaegha', '@PP-dy5nd', '@hiyokoalex4074',
    '@atamorumoru', '@とっきー-ycilysm', '@ke-suke_39', '@futianx1360', '@せきね-f7u',
    '@higeiwashi', '@HorineSu', '@exl5eq28', '@PP-dy5nd'
  ];
  
  const comments = document.querySelectorAll('ytd-comment-thread-renderer');
  const timestampPattern = /\d+:\d{2}:\d{2}|\d+:\d{2}/;
  
  const results = [];
  
  for (const user of targetUsers) {
    for (const comment of comments) {
      const author = comment.querySelector('#author-text')?.textContent.trim();
      if (author === user) {
        const content = comment.querySelector('#content-text')?.textContent.trim();
        if (content && timestampPattern.test(content)) {
          results.push({
            user: user,
            timeline: content
          });
        }
      }
    }
  }
  
  return results;
}

// Detect VTuber type from video title and artist
function detectVTuber(videoTitle, videoArtist) {
  const patterns = {
    'Hanon': ['香鳴ハノン', 'Hanon Ch.'],
    'Clara': ['暁月クララ', 'Clara Ch.'],
    'Gabu': ['鎖乙女がぶ', 'Gabu Ch.'],
    'Kaname': ['常磐カナメ', 'Kaname Ch.']
  };

  const text = `${videoTitle} ${videoArtist}`;
  let bestMatch = null;
  let bestLength = 0;
  for (const [vtuber, keywords] of Object.entries(patterns)) {
    for (const keyword of keywords) {
      if (text.includes(keyword) && keyword.length > bestLength) {
        bestMatch = vtuber;
        bestLength = keyword.length;
      }
    }
  }
  return bestMatch;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractData') {
    const data = extractVideoData();
    const vtuber = detectVTuber(data.video_title, data.video_artist);
    sendResponse({ data, vtuber });
  }
  
  if (request.action === 'getTargetUsers') {
    sendResponse({
      targetUsers: [
        '@ささかま_k', '@tk-taks1984', '@timestamp-nog', '@haruto_nog', '@野上ハルト',
        '@harut0_nog', '@SaySay009', '@tomfukuとむふく', '@コイケン_koiken', '@remilia.s',
        '@ぽテさら', '@はこぴぴぴ', '@Cyaegha', '@PP-dy5nd', '@hiyokoalex4074',
        '@atamorumoru', '@とっきー-ycilysm', '@ke-suke_39', '@futianx1360', '@せきね-f7u',
        '@higeiwashi', '@HorineSu', '@exl5eq28', '@PP-dy5nd'
      ]
    });
  }
  
  if (request.action === 'setTargetUsers') {
    // Store custom target users in chrome.storage
    chrome.storage.local.set({ targetUsers: request.targetUsers }, () => {
      sendResponse({ success: true });
    });
    return true; // Keep message channel open for async response
  }
});
