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

  function checkPlayState() {
    if (sound.isPlaying()) {
      play.textContent = "❙❙";
    } else {
      play.textContent = "▶";
    }
  }

  play.addEventListener("click", function() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
    }
  });

  setInterval(function() {
    if (sound.isPlaying()) {
      progress.value = sound.currentTime();
    }
    checkPlayState();
  }, 200);

  restart.addEventListener("click", function() {
    if (!sound.isPlaying()) {
      sound.stop();
      progress.value = 0;
    } else {
      sound.jump(0);
    }
  });

  progress.addEventListener("click", function(e) {
    let x = e.pageX - progress.offsetLeft;
    let clickedValue = (x * progress.max) / progress.offsetWidth;
    let isClicked = clickedValue <= progress.max && clickedValue >= 0;

    if (isClicked) {
      sound.jump(clickedValue);
      progress.value = clickedValue;
    }
  });

  return sound;
}
