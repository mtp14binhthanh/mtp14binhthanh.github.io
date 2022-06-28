const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const  musicPlaylist = document.getElementsByClassName('music-playlist');
const  pDiv = document.querySelector(".playlist-div");
const  playList = document.querySelector(".playlist");
let trackList = [
  {
    name: "01 - Bác Đang Cùng Chúng Cháu Hành Quân - Tốp Ca Nam Nữ Qk7",
    path: "music/01 - Bác Đang Cùng Chúng Cháu Hành Quân - Tốp Ca Nam Nữ Qk7.mp3"
  },
  {
    name: "02 - Bác Hồ Một Tình Yêu Bao La - Thu Hiền",
    path: "music/02 - Bác Hồ Một Tình Yêu Bao La - Thu Hiền.mp3"
  },
  {
    name: "03 - Ca Ngợi Hồ Chủ Tịch - Quang Thọ",
    path: "music/03 - Ca Ngợi Hồ Chủ Tịch - Quang Thọ.mp3"
  },
  {
    name: "04 - Ai Yêu Bác Hồ Chí Minh - Various Artists",
    path: "music/04 - Ai Yêu Bác Hồ Chí Minh - Various Artists.mp3"
  },
  {
    name: "05 - Bài Ca Hồ Chí Minh - Various Artists",
    path: "music/05 - Bài Ca Hồ Chí Minh - Various Artists.mp3"
  },
  {
    name: "06 - Dấu Chân Phía Trước - Cao Minh",
    path: "music/06 - Dấu Chân Phía Trước - Cao Minh.mp3"
  },
  {
    name: "07 - Đêm Nghe Hát Đò Đưa Nhớ Bác - Phạm Phương Thảo",
    path: "music/07 - Đêm Nghe Hát Đò Đưa Nhớ Bác - Phạm Phương Thảo.mp3"
  },
  {
    name: "08 - Đêm Qua Em Mơ Gặp Bác Hồ - Phước Hạnh",
    path: "music/08 - Đêm Qua Em Mơ Gặp Bác Hồ - Phước Hạnh.mp3"
  },
  {
    name: "09 - Đêm Trường Sơn Nhớ Bác - Việt Hoàn (NSƯT)",
    path: "music/09 - Đêm Trường Sơn Nhớ Bác - Việt Hoàn (NSƯT).mp3"
  },
  {
    name: "10 - Hồ Chí Minh Đẹp Nhất Tên Người - Thu Hiền",
    path: "music/10 - Hồ Chí Minh Đẹp Nhất Tên Người - Thu Hiền.mp3"
  },
  {
    name: "11 - Miền Nam Nhớ Mãi Ơn Người - Thanh Thúy",
    path: "music/11 - Miền Nam Nhớ Mãi Ơn Người - Thanh Thúy.mp3"
  },
  {
    name: "12 - Miền Trung Nhớ Bác - Thu Hiền",
    path: "music/12 - Miền Trung Nhớ Bác - Thu Hiền.mp3"
  },
  {
    name: "13 - Người Sống Mãi Trong Lòng Miền Nam - Quang Lý",
    path: "music/13 - Người Sống Mãi Trong Lòng Miền Nam - Quang Lý.mp3"
  },
  {
    name: "14 - Như Có Bác Hồ Trong Ngày Vui Đại Thắng - Various Artists",
    path: "music/14 - Như Có Bác Hồ Trong Ngày Vui Đại Thắng - Various Artists.mp3"
  },
  {
    name: "15 - Tiếng Hát Từ Thành Phố Mang Tên Người - Trọng Tấn",
    path: "music/15 - Tiếng Hát Từ Thành Phố Mang Tên Người - Trọng Tấn.mp3"
  },
  {
    name: "16 - Tiếng Hát Giữa Rừng Pắc Bó - Anh Thơ",
    path: "music/16 - Tiếng Hát Giữa Rừng Pắc Bó - Anh Thơ.mp3"
  },
  {
    name: "17 - Tình Bác Sáng Đời Ta - Quang Lý",
    path: "music/17 - Tình Bác Sáng Đời Ta - Quang Lý.mp3"
  },
  {
    name: "18 - Trồng Cây Lại Nhớ Đến Người - Thanh Hoa",
    path: "music/18 - Trồng Cây Lại Nhớ Đến Người - Thanh Hoa.mp3"
  },
  {
    name: "19 - Viếng Lăng Bác - Thanh Thủy",
    path: "music/19 - Viếng Lăng Bác - Thanh Thủy.mp3"
  },
  {
    name: "20 - Lời Bác Dặn Trước Lúc Đi Xa - Thu Hiền",
    path: "music/20 - Lời Bác Dặn Trước Lúc Đi Xa - Thu Hiền.mp3"
  }
];
let indexTrack = 0;
let autoplay = 0;
let songIsPlaying = false;
let track = document.createElement("audio");

//   All Event Listeners
playBtn.addEventListener("click", justPlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
track.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
track.addEventListener('ended', nextSong);
displayTracks();
loadTrack(indexTrack);

// Load Tracks
function loadTrack(indexTrack) {
  track.src = trackList[indexTrack].path;
  title.innerHTML = trackList[indexTrack].name;
  track.load();
}
// Play song or Pause song
function justPlay() {
  if (songIsPlaying == false) {
    playSong();
  } else {
    pauseSong();
  }
}
// Play Song
function playSong() {
  songIsPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  track.play();
}
// Pause Song
function pauseSong() {
  songIsPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  track.pause();
}
// Next song
function nextSong() {
  if (indexTrack < trackList.length - 1) {
    indexTrack++;
    loadTrack(indexTrack);
    playSong();
  } else {
    indexTrack = 0;
    loadTrack(indexTrack);
    playSong();
  }
}
// prev song
function prevSong() {
  if (indexTrack > 0) {
    indexTrack--;
    loadTrack(indexTrack);
    playSong();
  } else {
    indexTrack = trackList.length - 1;
    loadTrack(indexTrack);
    playSong();
  }
}
//auto play
function autoPlayToggle() {
  if (autoplay == 0) {
    autoplay = 1;
  } else {
    autoplay = 0;
  }
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
    const duration = track.duration;
    track.currentTime = (clickX / width) * duration;
}
var audNow = 0; // current song
var audStart = false; // auto start next song

  // (B2) PLAY SELECTED SONG
function audPlay (idx, nostart) {
  audNow = idx;
  audStart = nostart ? false : true;
  track.src = trackList[idx]["single-song"];
  for (let i = 0; i < trackList.length; i++) {
    if (i == idx) {
      trackList[i]["single-song"].classList.add('.active');
    }
    else {
      trackList[i]["single-song"].classList.remove('.active');
    }
  }
}
//Play list
function displayTracks() {
  for (let i = 0; i < trackList.length; i++) {
    let div = document.createElement('div');
    div.classList.add('playlist');
    div.innerHTML = `<p class="single-song">${trackList[i].name}</p>`;
    div.addEventListener("click", () => { audPlay(i); });
    trackList[i]["single-song"] = div;
    pDiv.appendChild(div);
  }
  playFromPlaylist();
}
// Play song from the playlist
function playFromPlaylist() {
  pDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("single-song")) {
      //   alert(e.target.innerHTML);
      const indexNum = trackList.findIndex((item, index) => {
        if (item.name === e.target.innerHTML) {
          return true;
        }
      });
      loadTrack(indexNum);
      playSong();
    }
  });
}
