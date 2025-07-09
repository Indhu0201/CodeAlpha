const songs = [
  {
    lang: 'Telugu',
  title: 'Palike Gorinka',
  artist: 'K. S. Chithra, Hariharan',
  src: 'PalikeGorinka.mpeg',
  cover: 'Palikegorinka.png',
  duration: '4:45',
    theme: {
      bg: 'linear-gradient(to right,rgb(30, 27, 29),rgb(55, 1, 35))',
      glow: '#a43931',
    }
  },
  {
    lang: 'Hindi',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh',
    src: 'ApnaBanale.mpeg',
    cover: 'ApnaBanale.jpg',
    duration: '3:55',
    theme: {
      bg: 'linear-gradient(to right,rgb(9, 16, 41),rgb(65, 51, 123))',
      glow: '#2c5364',
    }
  },
  {
    lang: 'English',
    title: 'Levitating',
    artist: 'Dua Lipa',
    src: 'Levitating.mpeg',
    cover: 'LevitatingPic.png',
    duration: '3:23',
    theme: {
      bg: 'linear-gradient(to right,rgb(65, 41, 90),rgb(47, 7, 67))',
      glow: '#2F0743',
    }
  },
  {
     lang: 'Tamil',
  title: 'Enna Solla Pogirai',
  artist: 'Shankar Mahadevan',
  src: 'EnnaSollaPogirai.mp3',
  cover: 'EnnaSollaPogiraiPic.jpeg',
  duration: '5:12',
    theme: {
      bg:'linear-gradient(to right,rgb(56,87,90),rgb(1, 100, 107))',
      glow: '#f09819',
     
    }
  },
  {
     lang: 'Kannada',
  title: 'Belageddu',
  artist: 'Vijay Prakash',
  src: 'Belageddu.mp3',
  cover: 'Belageddu.png',
  duration: '4:38',
    theme: {
      bg: 'linear-gradient(to right,rgb(19, 40, 27),rgb(3, 120, 40))',
      glow: '#fc466b',
     
    }
  }
];

let currentSong = 0;
const audio = new Audio();

const disc = document.getElementById('disc');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');

function applyTheme(theme) {
  document.body.style.background = `${theme.bg}, ${theme.glow}`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';

  document.querySelector('.disc-container').style.boxShadow = `0 0 25px ${theme.glow}`;
  document.querySelectorAll('.controls button').forEach(btn => {
    btn.style.boxShadow = `0 0 10px ${theme.glow}`;
  });
}

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  disc.src = song.cover;
  duration.textContent = song.duration;
  applyTheme(song.theme);
  audio.load();
}

function playSong() {
  audio.play();
  disc.parentElement.classList.remove('paused');
}

function pauseSong() {
  audio.pause();
  disc.parentElement.classList.add('paused');
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

function updateProgress() {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function setVolume() {
  audio.volume = volume.value;
}

function renderPlaylist(filter = 'all') {
  playlist.innerHTML = '';
  const filtered = filter === 'all' ? songs : songs.filter(song => song.lang === filter);
  filtered.forEach(song => {
    const songDiv = document.createElement('div');
    songDiv.className = 'song';
    songDiv.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" />
      <div class="song-info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
      <div class="song-time">${song.duration}</div>
    `;
    songDiv.addEventListener('click', () => {
      currentSong = songs.findIndex(s => s.title === song.title);
      loadSong(currentSong);
      playSong();
    });
    playlist.appendChild(songDiv);
  });
}

function initFilters() {
  const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPlaylist(btn.getAttribute('data-lang'));
    });
  });
}

playBtn.onclick = playSong;
pauseBtn.onclick = pauseSong;
nextBtn.onclick = nextSong;
prevBtn.onclick = prevSong;
volume.oninput = setVolume;
audio.ontimeupdate = updateProgress;
progress.oninput = () => (audio.currentTime = progress.value);

// 🎨 Visualizer
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function drawVisualizer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const bars = 40;
  const width = canvas.width / bars;
  for (let i = 0; i < bars; i++) {
    const height = Math.random() * canvas.height;
    const hue = (i * 360) / bars;
    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.fillRect(i * width, canvas.height - height, width - 2, height);
  }
  requestAnimationFrame(drawVisualizer);
}
drawVisualizer();

// 🔁 Start app
loadSong(currentSong);
renderPlaylist();
initFilters();
