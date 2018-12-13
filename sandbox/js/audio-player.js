import file from "../assets/music.mp3";

const play = document.querySelector("#play");
const restart = document.querySelector("#restart");
const progress = document.querySelector("#progress");

let sound;
export default function createMusic(p5) {
  sound = new p5.SoundFile(file, function loaded() {
    progress.setAttribute("max", sound.duration());
    progress.value = 0;
  });

  play.addEventListener("click", function() {
    if (sound.isPlaying()) {
      play.textContent = "▶";
      sound.pause();
    } else {
      play.textContent = "❙❙";
      sound.loop();
    }
  });

  setInterval(function() {
    if (sound.isPlaying()) {
      progress.value = sound.currentTime();
    }
  }, 500);

  restart.addEventListener("click", function() {
    sound.jump();
  });

  return sound;
}
