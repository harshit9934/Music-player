const songs = [
  {
    title: "Mera Dil Bhi Kitna Pagal Hai",
    artist: "Kumar Sanu & Alka Yagnik",
    src: "songs\\WhatsApp Audio 2026-07-11 at 12.02.17 AM.mpeg",
    cover: "images/natur.jpg",
  },
  {
    title: "Sitaare",
    artist: "Arijit Singh",
    src: "songs\\WhatsApp Audio 2026-07-11 at 12.02.11 AM.mpeg",
    cover: "images/leaf.jpg",
  },
  {
    title: "Chura Ke Dil Mera",
    artist: "Kumar Sanu & Alka Yagnik",
    src: "songs\\WhatsApp Audio 2026-07-11 at 12.01.33 AM.mpeg",
    cover: "images/pexels-romain-coatmelec-2158686283-35540087.jpg",
  },
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

let currentSong = 0;
let isPlaying = false;
let repeat = false;
let shuffle = false;

// Load Song

function loadSong(index) {
  audio.src = songs[index].src;

  cover.src = songs[index].cover;

  title.innerText = songs[index].title;

  artist.innerText = songs[index].artist;

  document.querySelectorAll("#playlist li").forEach((li) => {
    li.classList.remove("active");
  });

  document
    .querySelector(`#playlist li[data-index="${index}"]`)
    .classList.add("active");
}

loadSong(currentSong);

// Play

function playSong() {
  audio.play();

  isPlaying = true;

  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Pause

function pauseSong() {
  audio.pause();

  isPlaying = false;

  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// Play Button

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next

function nextSong() {
  if (shuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong++;

    if (currentSong >= songs.length) {
      currentSong = 0;
    }
  }

  loadSong(currentSong);

  playSong();
}

// Previous

function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);

  playSong();
}

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

// Progress

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;

  progress.value = progressPercent || 0;

  currentTime.innerText = formatTime(audio.currentTime);

  duration.innerText = formatTime(audio.duration);
});

// Seek

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto Next

audio.addEventListener("ended", () => {
  if (repeat) {
    playSong();
  } else {
    nextSong();
  }
});

// Playlist Click

document.querySelectorAll("#playlist li").forEach((item) => {
  item.addEventListener("click", () => {
    currentSong = Number(item.dataset.index);

    loadSong(currentSong);

    playSong();
  });
});

// Shuffle

shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;

  shuffleBtn.style.color = shuffle ? "blue" : "#764ba2";
});

// Repeat

repeatBtn.addEventListener("click", () => {
  repeat = !repeat;

  repeatBtn.style.color = repeat ? "blue" : "#764ba2";
});

// Keyboard

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  if (e.key === "ArrowRight") {
    nextSong();
  }

  if (e.key === "ArrowLeft") {
    prevSong();
  }
});

// Time Format

function formatTime(time) {
  if (isNaN(time)) return "0:00";

  let minutes = Math.floor(time / 60);

  let seconds = Math.floor(time % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}
