console.log("Welcome");

let tracker = document.querySelector(".tracker");
let trackCover = document.querySelector(".cover");
let trackName = document.querySelector(".songName h1");
let artistName = document.querySelector(".artistName");


let currentTime = document.querySelector(".currentTime");
let totalDuration = document.querySelector(".totalDuration");
let seekSlider = document.querySelector(".seekSlider");
let volumeSlider = document.querySelector(".volumeSlider");

let shuffle = document.querySelector(".shuffle");
let previous = document.querySelector(".previous");
let playPauseBtn = document.querySelector(".playPauseBtn");
let next = document.querySelector(".next");
let reload = document.querySelector(".reload");

let currentSong = document.createElement("audio");

let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let updateTimer;

let songsList = [
    {songName: "Royalty", artistName:"NCS", songPath: "songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName: "On & On (feat. Daniel Levi)", artistName:"NCS", songPath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Mortals (feat. Laura Brehm)", artistName:"NCS", songPath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Time Is Eating", artistName:"NCS", songPath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Faster", artistName:"NCS", songPath:"songs/5.mp3",coverPath:"covers/5.jpg"},
]

loadSong(songIndex);

function loadSong(songIndex) {
    currentSong.src = songsList[songIndex].songPath;
    currentSong.load();

    currentSong.volume = volumeSlider.value / 100;

    trackCover.style.backgroundImage = "url(" + songsList[songIndex].coverPath + ")";
    trackName.textContent = songsList[songIndex].songName;
    artistName.textContent = songsList[songIndex].artistName;
    tracker.textContent = "Playing music " + (songIndex + 1) + " of " + songsList.length;

    updateTimer = setInterval(setUpdate, 1000);

    currentSong.addEventListener("ended", nextSong);
}

function seekTo(){
    let seekto = currentSong.duration * (seekSlider.value / 100);
    currentSong.currentTime = seekto;
}

function setVolume(){
    currentSong.volume = volumeSlider.value / 100;
}

function reset() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

function shuffleSong(){
    isShuffle ? pauseShuffle() : playShuffle();
}

function pauseShuffle(){
    isShuffle = false;
    document.querySelector(".shuffle").classList.remove("shuffleOn");
}

function playShuffle() {
    isShuffle = true;
    document.querySelector(".shuffle").classList.add("shuffleOn");
}

function previousSong() {
    if (isShuffle === false ){
        if (songIndex > 0) {
            songIndex-=1;
        } else {
            songIndex = songsList.length -1;
        }
    } else {
        let shuffleIndex = Math.floor(Math.random() * (songsList.length));
        songIndex = shuffleIndex;
    }
    loadSong(songIndex);
    playSong();
}

function playPauseSong() {
    isPlaying ? pauseSong() : playSong();
}

function playSong() {
    currentSong.play();
    isPlaying = true;
    trackCover.classList.add("rotate");
    playPauseBtn.src = "svg/pause.svg"
}

function pauseSong() {
    currentSong.pause();
    isPlaying = false;
    trackCover.classList.remove("rotate");
    playPauseBtn.src = "svg/play.svg"
}


function nextSong() {
    if (isShuffle === false) {
        if (songIndex < songsList.length -1){
            songIndex+=1;
        } else {
            songIndex = 0;
        }
    } else {
        let shuffleIndex = Math.floor(Math.random() * (songsList.length));
        songIndex = shuffleIndex;
    }
    loadSong(songIndex);
    playSong();
}

function replaySong() {
    let currentIndex = songIndex;
    loadSong(currentIndex);
    playSong();
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(currentSong.duration)){
        seekPosition = currentSong.currentTime * (100 / currentSong.duration);
        seekSlider.value = seekPosition;
        
        let currentMinutes = Math.floor(currentSong.currentTime / 60);
        let currentSeconds = Math.floor(currentSong.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentSong.duration / 60);
        let durationSeconds = Math.floor(currentSong.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds };
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds };
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes };
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes };

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;

    }
}