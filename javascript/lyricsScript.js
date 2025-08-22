import { music_post } from "./music-items.js";

document.addEventListener('DOMContentLoaded', function(){  // Fixed typo
  const songList = document.getElementById('songList');
  const lyricsContent = document.getElementById('lyricsContent');
  const currentSongTitle = document.getElementById('currentSongTitle');
      
  // Populate song list
  music_post.forEach((song, index) => {
    const songLink = document.createElement('button');
    songLink.className = 'song-link';
    songLink.textContent = song.title;
    songLink.onclick = () => showLyrics(index);
    songList.appendChild(songLink);  // Fixed variable name
  });
      
  // Check URL parameters for specific track
  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = urlParams.get('track');
      
  if (trackParam !== null) {
    const trackIndex = parseInt(trackParam);
    if (!isNaN(trackIndex) && trackIndex >= 0 && trackIndex < music_post.length) {
      showLyrics(trackIndex);
    } else {
      // Show first song if invalid track parameter
      showLyrics(0);
    }
  } else {
    // Show first song by default
    showLyrics(0);
  }
      
  function showLyrics(index) {
    const song = music_post[index];
        
    // Update active class
    const links = document.querySelectorAll('.song-link');
    links.forEach((link, i) => {
      if (i === index) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
        
    // Update URL without reloading page
    window.history.replaceState({}, '', `?track=${index}`);
        
    // Display lyrics
    currentSongTitle.textContent = song.title;
    lyricsContent.innerHTML = song.lyric.replace(/\n/g, '<br>');
  }
});