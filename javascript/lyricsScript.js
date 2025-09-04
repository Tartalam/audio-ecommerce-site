import { music_post } from "./music-items.js";

document.addEventListener('DOMContentLoaded', function(){  // Fixed typo
  const songList = document.getElementById('songList');
  const lyricsContent = document.getElementById('lyricsContent');
  const currentSongTitle = document.getElementById('currentSongTitle');
  const zoomIn = document.getElementById('zoom-in');
  const zoomOut = document.getElementById('zoom-out');

      
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

  zoomIn.addEventListener('click', function(e){

    const target = document.querySelector('.ld-notes');

    let currentZoom = parseFloat(target.getAttribute('data-zoom')) || 1;
    let newZoom = currentZoom + 0.1;
    newZoom = Math.min(2, Math.max(0.1, newZoom));

    target.style.transform = `scale(${newZoom})`;
    target.setAttribute('data-zoom', newZoom);
  });

  zoomOut.addEventListener('click', function(e){

    const target = document.querySelector('.ld-notes');

    let currentZoom = parseFloat(target.getAttribute('data-zoom')) || 1;
    let newZoom = currentZoom - 0.1;
    newZoom = Math.max(1, newZoom);

    target.style.transform = `scale(${newZoom})`;
    target.setAttribute('data-zoom', newZoom);

  });
});