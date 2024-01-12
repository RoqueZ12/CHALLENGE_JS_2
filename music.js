const audioPlayer = document.getElementById('audio-player');
const seekBar = document.getElementById('seek-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const playSong = document.getElementById('play');
const pauseSong = document.getElementById('pause');
const container = document.getElementById('contenedor2');
const image = document.getElementById('music-img');

// Función para cambiar de musica, necesitamos el array de canciones
//Array
const music = [
  {
    url: 'assets/forest-lullaby-110624.mp3',
    img: 'assets/cover-1.png'  ,
    title: 'Lost in the City Lights',
    author: 'Cosmo Sheldrake'
  },
  {
    url: 'assets/lost-in-city-lights-145038.mp3',
    img: 'assets/cover-2.png',
    title: 'Forest Lullaby',
    author: 'Lesfm'
  }
]
//declaramos el indice
let currentSongIndex = 0;
// Variable para guardar la posición actual del audio
let pausedTime = 0;

// Función para reproducir música
function playMusic() {
  const currentSong = music[currentSongIndex];
  audioPlayer.src = currentSong.url;
  image.src = currentSong.img;
  songTitle.textContent = currentSong.title;
  songArtist.textContent = currentSong.author;

  // Establece la posición del audio al valor guardado (si existe)
  if (pausedTime) {
    audioPlayer.currentTime = pausedTime;
    pausedTime = 0; // Restablece la variable a 0 después de usarla
  }
  
  audioPlayer.play();
  togglePlayPauseButtons();
}

// Función para cambiar entre reproducir y pausar
function toggle() {
  if (audioPlayer.paused || audioPlayer.ended) {
      playMusic();
  } else {
      pauseMusic();
  }
}

// Función para pausar música
function pauseMusic() {
  audioPlayer.pause();
  pausedTime = audioPlayer.currentTime; // Guarda la posición actual
  togglePlayPauseButtons();
}

// Función para avanzar a la siguiente canción
function forwardMusic() {
  currentSongIndex = (currentSongIndex + 1) % music.length;
  seekBar.value = 0;
  playMusic();
}

// Función para retroceder a la canción anterior
function backMusic() {
  currentSongIndex = (currentSongIndex - 1 + music.length) % music.length;
  playMusic();
}
// Actualizar el botón de reproducción y pausa según el estado del audio
function togglePlayPauseButtons() {
  playSong.style.display = audioPlayer.paused ? 'inline-block' : 'none';
  pauseSong.style.display = audioPlayer.paused ? 'none' : 'inline-block';
}

// Inicialización: reproducir la primera canción al cargar
playMusic();
// Restablece la posición del seekBar al inicio
seekBar.value = 0;


// Listener para cuando el audio termina para avanzar a la siguiente canción (opcional)
audioPlayer.addEventListener('ended', function() {
    forwardMusic();
});

// Actualizar el tiempo actual y la duración de la canción
audioPlayer.addEventListener('timeupdate', function() {
  // Calcula el porcentaje de progreso
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;

  // Cambia el gradiente del fondo de la barra de progreso
  seekBar.style.background = `linear-gradient(to right, #c93b76 0%, #c93b76 ${progressPercent}%, #ffffff ${progressPercent}%, #ffffff 100%)`;
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime - currentMinutes * 60);

    // Verifica si audioPlayer.duration es un número válido
    if (!isNaN(audioPlayer.duration)) {
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration - durationMinutes * 60);
        duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }

    currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

    // Actualizar la barra de progreso
    seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
   
});

// Cambiar la posición de reproducción al cambiar la barra de progreso
seekBar.addEventListener('change', function() {
    audioPlayer.currentTime = (seekBar.value * audioPlayer.duration) / 100;
});