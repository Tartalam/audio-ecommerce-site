import { biography } from "../javascript/music-items.js";
        
  document.addEventListener('DOMContentLoaded', function() {
    const bioContent = document.getElementById('bioContent');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');     
    // Format the biography text with paragraphs
    const formattedBio = biography
    .split('\n\n') // Split by double newlines for paragraphs
    .map(paragraph => {
    if (paragraph.trim()) {
      return `<p>${paragraph.trim()}</p>`;
    }
      return '';
    })
    .join('');
          
    bioContent.innerHTML = formattedBio;

    zoomIn.addEventListener('click', function(e){

    const target = document.querySelector('#bioContent');
    let currentZoom = parseFloat(target.getAttribute('data-zoom')) || 1;
    let newZoom = currentZoom + 0.1;

    newZoom = Math.min(2, Math.max(0.1, newZoom));

    target.style.transform = `scale(${newZoom})`;
    target.setAttribute('data-zoom', newZoom);
  });

    zoomOut.addEventListener('click', function(e){

    const target = document.querySelector('#bioContent');
    let currentZoom = parseFloat(target.getAttribute('data-zoom')) || 1;
    let newZoom = currentZoom - 0.1;

    newZoom = Math.max(1, newZoom);

    target.style.transform = `scale(${newZoom})`;
    target.setAttribute('data-zoom', newZoom);
      });
  });