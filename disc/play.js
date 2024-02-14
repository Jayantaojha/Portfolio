// accessing elements from play.html
let body = document.querySelector('body');

const playBackIcon = document.getElementById('back-arrow');
const playSearchIcon = document.getElementById('play-search-icon');

let playCover = document.getElementById('play-cover-image');
let playTitle = document.getElementById('song-title');
let playArtist = document.getElementById('artist-name');

let progressBar = document.getElementById('progress-bar');

let currentDuration = document.getElementById('music-current-time');
let totalDuration = document.getElementById('song-duration');

let playLikeIcon = document.getElementById('heart-icon');

const prevSong = document.querySelector('#prev-song');
const playButton = document.querySelector('#playButton');
const nextSong = document.querySelector('#next-song');

let playRepeatIcon = document.getElementById('repeat-icon');
const lyricsdiv = document.getElementById('lyrics');



// creating a search input
let searchInput = document.createElement('input');
searchInput.style.height = '10vh';
searchInput.style.position = 'absolute';
searchInput.style.top = '4vh';
searchInput.style.backgroundColor = "#656253";
searchInput.style.color = "#bcbcbb";
searchInput.style.borderRadius = "10px";
searchInput.style.outline = 'none';
searchInput.style.paddingLeft = '10px';
searchInput.placeholder = "Search...";

if (screen.width > 600) {
    searchInput.style.width = "50vw";
    searchInput.style.left = '25vw';
}
else {
    searchInput.style.width = "70vw";
    searchInput.style.left = '15vw';
}

// purpose: 
let counter = 0;


// on search icon | purpose: 
let clickTime = 0;

// on playbutton
let playClickTime = 0;


// create an audio object 
let song = new Audio();
song.src = null;

// for search icon
playSearchIcon.addEventListener('click', () => {
    if (clickTime === 0) {
        body.appendChild(searchInput);

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                if (searchInput.value.trim() !== "") { // Checking for a non-empty and non-whitespace value
                    const foundSong = allSongs.find((item) =>
                        item.songTitle.trim().toLowerCase() === searchInput.value.trim().toLowerCase()
                    );

                    if (foundSong) {
                        playSong(foundSong.songPath, foundSong.coverPath, foundSong.songTitle, foundSong.artistName);
                        playButton.classList.remove('fa-circle-play');
                        playButton.classList.add('fa-circle-pause');
                        counter = 1;

                        if (body.contains(searchInput)) {
                            body.removeChild(searchInput);
                        }
                    }
                }
            }
        });


        clickTime = 1;

    } else if (clickTime === 1) {
        if (body.contains(searchInput)) {
            body.removeChild(searchInput);
            clickTime = 0;
        }
    }
});



// to play current song
function playSong(songPath, songCover, songTitle, songArtist) {
    if (song.src != null) {
        song.src = null;
        song.src = songPath;
        playTitle.innerText = songTitle;
        playArtist.innerText = songArtist;
        playCover.src = songCover;
    }
    else {
        song.src = songPath;
        playTitle.innerText = songTitle;
        playArtist.innerText = songArtist;
        playCover.src = songCover;
    }


    song.addEventListener('loadedmetadata', () => {
        let durationInMinutes = Math.floor(song.duration / 60);
        let durationInSeconds = Math.floor(song.duration % 60);
        totalDuration.innerText = `${durationInMinutes}:${durationInSeconds < 10 ? '0' : ''}${durationInSeconds}`;

    });



    playButton.addEventListener('click', () => {
        if (counter == 0) {
            playButton.classList.remove('fa-circle-play');
            playButton.classList.add('fa-circle-pause');
            song.play();
            counter = 1;

            // Reset clickTime to 0 when the song starts playing
            clickTime = 0;


        } else if (counter === 1) {
            playButton.classList.remove('fa-circle-pause');
            playButton.classList.add('fa-circle-play');
            song.pause();
            counter = 0;

        }
    });

    song.addEventListener('timeupdate', () => {
        progress = parseInt((song.currentTime / song.duration) * 100);
        progressBar.value = progress;

        // Update current duration text
        let currentMinutes = Math.floor(song.currentTime / 60);
        let currentSeconds = Math.floor(song.currentTime % 60);
        currentDuration.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    });

    progressBar.addEventListener('change', () => {
        song.currentTime = progressBar.value * song.duration / 100;
    });

    song.play(); // song is playing automatically 

}

// my code
let firstPlayButton = true;

let currSongIndex = 0;

playButton.addEventListener('click', () => {
    if (firstPlayButton) {
        playSong(allSongs[currSongIndex].songPath, allSongs[currSongIndex].coverPath, allSongs[currSongIndex].songTitle, allSongs[currSongIndex].artistName);
        playButton.classList.remove('fa-circle-play');
        playButton.classList.add('fa-circle-pause');
        firstPlayButton = false;
    }

})

nextSong.addEventListener('click', () => {
    currSongIndex = (currSongIndex + 1) % allSongs.length;
    playSong(allSongs[currSongIndex].songPath, allSongs[currSongIndex].coverPath, allSongs[currSongIndex].songTitle, allSongs[currSongIndex].artistName);
    playButton.classList.remove('fa-circle-play');
    playButton.classList.add('fa-circle-pause');

})

prevSong.addEventListener('click', () => {
    currSongIndex = (currSongIndex - 1 + allSongs.length) % allSongs.length;
    playSong(allSongs[currSongIndex].songPath, allSongs[currSongIndex].coverPath, allSongs[currSongIndex].songTitle, allSongs[currSongIndex].artistName);
    playButton.classList.remove('fa-circle-play');
    playButton.classList.add('fa-circle-pause');
})

