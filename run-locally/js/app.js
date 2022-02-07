import createP5Env from "../../common/p5-env";
import song from "../../assets/music.mp3";
import render, { Metadata } from "../../visuals/speaker";
import p5 from "../../common/p5";

const opts = {
  render
};

var isPlaying = false;


document.getElementById('canvas').addEventListener('click', function() {
  if (!isPlaying) {
    let music = new p5.SoundFile(song, function loaded() {
      music.loop();
    });
    document.getElementById('clickToStart').style.display = "none";
    isPlaying = true;
  }
  
}, false);

createP5Env(opts, Metadata, document.getElementById("canvas"));
