const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
// const cover = document.getElementById('cover');

// Song titles
const songs = [
  '01 - Bác Đang Cùng Chúng Cháu Hành Quân - Tốp Ca Nam Nữ Qk7',
  '02 - Bác Hồ Một Tình Yêu Bao La - Thu Hiền',
  '03 - Ca Ngợi Hồ Chủ Tịch - Quang Thọ',
  '04 - Ai Yêu Bác Hồ Chí Minh - Various Artists',
  '05 - Bài Ca Hồ Chí Minh - Various Artists',
  '06 - Dấu Chân Phía Trước - Cao Minh',
  '07 - Đêm Nghe Hát Đò Đưa Nhớ Bác - Phạm Phương Thảo',
  '08 - Đêm Qua Em Mơ Gặp Bác Hồ - Phước Hạnh',
  '09 - Đêm Trường Sơn Nhớ Bác - Việt Hoàn (NSƯT)',
  '10 - Hồ Chí Minh Đẹp Nhất Tên Người - Thu Hiền',
  '11 - Miền Nam Nhớ Mãi Ơn Người - Thanh Thúy',
  '12 - Miền Trung Nhớ Bác - Thu Hiền',
  '13 - Người Sống Mãi Trong Lòng Miền Nam - Quang Lý',
  '14 - Như Có Bác Hồ Trong Ngày Vui Đại Thắng - Various Artists',
  '15 - Tiếng Hát Từ Thành Phố Mang Tên Người - Trọng Tấn',
  '16 - Tiếng Hát Giữa Rừng Pắc Bó - Anh Thơ',
  '17 - Tình Bác Sáng Đời Ta - Quang Lý',
  '18 - Trồng Cây Lại Nhớ Đến Người - Thanh Hoa',
  '19 - Viếng Lăng Bác - Thanh Thủy',
  '20 - Lời Bác Dặn Trước Lúc Đi Xa - Thu Hiền'
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  // cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);