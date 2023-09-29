const player = document.querySelector('.player')
const playBtn = document.querySelector('.playPause')
const nextBtn = document.querySelector('.nextSong')
const prevBtn = document.querySelector('.previousSong')
const audio = document.getElementById('audio')
const progressLine = document.querySelector('.progress__line')
const progressCurrent = document.querySelector('.progress__current')
const mainBackground = document.querySelector('.main-background')
const playerImg = document.querySelector('.img')
const songArtist = document.querySelector('.top__song-artist')
const songTitle = document.querySelector('.top__song-title')
const timeLineStart = document.querySelector('.time-line-start')
const timeLineEnd = document.querySelector('.time-line-end')




const artists = ['AC/DC', 'Rammstein', 'НЮ', 'HI-FI']
const songs = ['highway-to-hell', 'auslander', 'рассвет', 'за мной']
let artistIndex = 0;
let songIndex = 0;

const loadSong = (song) => {
   songTitle.innerHTML = song;
   audio.src = `music/${song}.mp3`
   playerImg.src = `img/background/img_${songIndex + 1}.jpg`
}
loadSong(songs[songIndex])

const loadArtist = (artist) => {
   songArtist.innerHTML = artist;
   mainBackground.src = `img/background/img_${songIndex + 1}.jpg`

}
loadArtist(artists[artistIndex])


const playSong = () => {
   audio.play();
   player.classList.add('play');
   playBtn.src = 'img/button/pausebutton.png'

}
const pauseSong = () => {
   audio.pause();
   player.classList.remove('play');
   playBtn.src = 'img/button/playbutton.png'
}


const changePlayPause = () => {
   const isPlaying = player.classList.contains('play')
   if (isPlaying) {
      pauseSong();
   } else {
      playSong();
   }
}
playBtn.addEventListener('click', changePlayPause)



//ПЕРЕКЛЮЧЕНИЕ ПЕСЕН ВПЕРЕД И НАЗАД

const nextSong = () => {
   artistIndex++;
   if (artistIndex > artists.length - 1) {
      artistIndex = 0;
   }
   songIndex++;
   if (songIndex > songs.length - 1) {
      songIndex = 0;
   }
   loadSong(songs[songIndex])
   loadArtist(artists[artistIndex])
   playSong()
}
nextBtn.addEventListener('click', nextSong)



const prevSong = () => {
   artistIndex--;
   if (artistIndex < 0) {
      artistIndex = artists.length - 1;
   }
   songIndex--;
   if (songIndex < 0) {
      songIndex = songs.length - 1;
   }
   loadSong(songs[songIndex])
   loadArtist(artists[artistIndex])
   playSong()
}
prevBtn.addEventListener('click', prevSong)
audio.addEventListener('ended', nextSong)

//ПРОГРЕСС ПЕСНИ

const progressBar = (event) => {
   const { duration, currentTime } = event.srcElement;
   const progressSong = (currentTime / duration) * 100;
   progressCurrent.style.width = `${progressSong}%`
   setTimeout(() => {
      timeLineStart.innerHTML = formatTime(audio.currentTime);
      timeLineEnd.innerHTML = formatTime(audio.duration);
   }, 300)

}
audio.addEventListener('timeupdate', progressBar)

const formatTime = (time) => {
   let min = Math.floor(time / 60);
   if (min < 10) {
      min = `0${min}`;
   }
   let sec = Math.floor(time % 60);
   if (sec < 10) {
      sec = `0${sec}`;
   }
   return `${min}:${sec}`
}



//ПЕРЕМОТКА ПЕСНИ 

const durationProgress = (event) => {
   const width = progressLine.offsetWidth;
   const click = event.offsetX;
   const duration = audio.duration;
   audio.currentTime = (click / width) * duration;
}
progressLine.addEventListener('click', durationProgress)

