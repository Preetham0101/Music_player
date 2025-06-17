const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "song2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: "song3.mp3",
    cover: "cover3.jpg"
  }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  highlightPlaylist(index);
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function buildPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
    });
    playlist.appendChild(li);
  });
}

function highlightPlaylist(index) {
  const items = playlist.querySelectorAll("li");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

// Initialize
loadSong(currentSong);
buildPlaylist();
volume.value = 0.7;
audio.volume = 0.7;
