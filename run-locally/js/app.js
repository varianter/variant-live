import createP5Env from "../../common/p5-env";
import song from "../../assets/music.mp3";
import render, { Metadata } from "./visualisation";

const opts = {
  render,
  preload(_, p5) {
    let music = new p5.SoundFile(song, function loaded() {
      music.loop();
    });

    return music;
  }
};

createP5Env(opts, Metadata, document.getElementById("canvas"));
