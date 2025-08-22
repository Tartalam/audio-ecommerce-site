import { music_post } from "./music-items.js";
import {biography} from "./music-items.js";

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('#songTitle');
    const artistName = document.querySelector('#singerName');
    const audioImage = document.querySelector('.song-image'); // Changed to correct class
    const lyrics = document.querySelector('.track-lyrics p');
    const sampleBio = document.querySelector('.sample-bio p');
    

    
    // Correct selector for play button
    const playBtn = document.querySelector('.play');
    const imagePlaybtn = document.querySelector('.play-icon');
    const volumeIcon = document.querySelector('#volume-icon');
    let currentVolume = document.querySelector('.volume-slider');
    const trackName = document.querySelector('div.track > span');
    
    let track = document.createElement('audio');
    
    // Event listeners
    playBtn.addEventListener('click', playSong);
    
    let timer;
    let indexTracking = 0;
    let autoPlay = true;
    let musicPlaying = false;
    let muteMusic = false;
    let tempVol = 50;
    let tempVolIcon = 'fa fa-volume-up vol-icon';
    
    function loadTrack(index) {
        clearInterval(timer);
        track.src = music_post[index].audio;
        title.innerHTML = music_post[index].title;
        artistName.innerHTML = music_post[index].artist;
        audioImage.src = music_post[index].image;

        // load up to 16 lines of text into the container
        const fullLyrics = music_post[index].lyric;
        const lyricsArray = fullLyrics.split('\n');
        const maxLines = 16;

        if (lyricsArray.length > maxLines) {
            const visibleLyrics = lyricsArray.slice(0, maxLines).join('<br>');
            lyrics.innerHTML =`
            ${visibleLyrics}<br><br>
            <a href="lyrics.html?track=${index}" class="view-full-lyrics">
            View full lyrics →
        </a>`;
        } else {
            lyrics.innerHTML = fullLyrics.replace(/\n/g, '<br>');
        }
        
        trackName.innerHTML = music_post[index].title;

        // loads up to 16 line of the bio in the container
        const fullBio = biography;
        const bioArray = fullBio.split('\n');
        const maxLines2 = 7;
        
        if(bioArray.length > maxLines){
            const visibleBio = bioArray.slice(0, maxLines2).join('<br>');
            sampleBio.innerHTML = `
            ${visibleBio}<br>
            <a href = "../html/biblography-page.html" class = "view-full-bio">
            View full biography →</a>
            `;
        }else{
            sampleBio.innerHTML = fullBio.replace(/\n/g, '<br>');
        }
        
        // Load the audio (but don't play yet)
        track.load();
        timer = setInterval(updateMusic, 1000);
    }
    // play and pause music
     function playSong() {
        if (musicPlaying) {
            track.pause();
            musicPlaying = false;
            playBtn.innerHTML = '<i class="fa-solid fa-play buttom-play-icon"></i>';
        } else {
            track.play()
                .then(() => {
                    musicPlaying = true;
                    playBtn.innerHTML = '<i class="fa-solid fa-pause buttom-play-icon"></i>';
                })
                .catch(error => {
                    console.error('Playback failed:', error);
                });
        }
    }
    // play adn pause music
    audioImage.addEventListener('click', function(e){
        if(e.target === audioImage){
            if (musicPlaying) {
            track.pause();
            musicPlaying = false;
            imagePlaybtn.innerHTML = '<i class="fa-solid fa-pause play-button-icon"></i>';
            playBtn.innerHTML = '<i class="fa-solid fa-play buttom-play-icon"></i>';
        } else {
            track.play()
                .then(() => {
                    musicPlaying = true;
                    imagePlaybtn.innerHTML = '<i class="fa-solid fa-play play-button-icon"></i>';
                    playBtn.innerHTML = '<i class="fa-solid fa-pause buttom-play-icon"></i>';
                })
                .catch(error => {
                    console.error('Playback failed:', error);
                });
        }
        }
    });
    
    // Volume control
    currentVolume.addEventListener('input', function() {
        const volumeValue = parseInt(this.value);
        track.volume = volumeValue / 100;

        if (track.volume === 0) {
            volumeIcon.className = 'fa fa-volume-mute vol-icon';
            tempVolIcon = 'fa fa-volume-mute vol-icon';
            tempVol = volumeValue;
        } else if (currentVolume.value> 0 && currentVolume.value< 50){
            volumeIcon.className = 'fa fa-volume-down vol-icon';
            tempVolIcon = 'fa fa-volume-down vol-icon';
            tempVol = volumeValue;
        } else if (currentVolume.value > 49) {
            volumeIcon.className = 'fa fa-volume-up vol-icon';
            tempVolIcon = 'fa fa-volume-up vol-icon';
            tempVol = volumeValue;
        }
        muteMusic = (volumeValue === 0);
    });

    // Mute sound
    volumeIcon.addEventListener('click', function(){
        if(!muteMusic){
            //stores current value before muting
            tempVol = parseInt(currentVolume.value);
            tempVolIcon = volumeIcon.className;
            
            //mute
            track.volume = 0;
            currentVolume.value = 0;
            volumeIcon.className = 'fa fa-volume-mute vol-icon';
            muteMusic = true;
        }
        else{
            // restores previous volume
            track.volume = tempVol / 100;
            currentVolume.value = tempVol;
            volumeIcon.className = tempVolIcon;
            muteMusic = false;
        }

    });

function updateMusic(){
    if(track.ended){
        if(autoPlay){
            if(indexTracking < music_post.length - 1){
                // Move to next track
                indexTracking++;
                loadTrack(indexTracking);
                // Auto-play the next track
                track.play()
                    .then(() => {
                        musicPlaying = true;
                        playBtn.innerHTML = '<i class="fa-solid fa-pause buttom-play-icon"></i>';
                        imagePlaybtn.innerHTML = '<i class="fa-solid fa-play play-button-icon"></i>';
                    })
                    .catch(error => {
                        console.error('Playback failed:', error);
                    });
            } else {
                // Reset to first track when at the end
                indexTracking = 0;
                loadTrack(indexTracking);
                // Auto-play the first track
                track.play()
                    .then(() => {
                        musicPlaying = true;
                        playBtn.innerHTML = '<i class="fa-solid fa-pause buttom-play-icon"></i>';
                        imagePlaybtn.innerHTML = '<i class="fa-solid fa-play play-button-icon"></i>';
                    })
                    .catch(error => {
                        console.error('Playback failed:', error);
                    });
            }
        }
    }
}
    
    // Initialize
    loadTrack(indexTracking);
});