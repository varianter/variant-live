import p5 from "p5";
import fs from "fs";

import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";

import editor from "./editor";
import createMusic from "./audio-player";

const example = fs.readFileSync(__dirname + "/example.template").toString();

let render = () => {};
const editorContainer = document.getElementById("editor");
editor(example, editorContainer, function replaceSource(error, fn) {
  if (error) return console.error(error);
  render = fn;
});

function env(p) {
  let fft, analyzer, music;

  p.preload = () => {
    music = createMusic(p5);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    fft = new p5.FFT();
    fft.setInput(music);

    analyzer = new p5.Amplitude();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background("#000");
    p.noFill();
    fft.analyze();

    render(p, {
      bass: fft.getEnergy("bass"),
      treble: fft.getEnergy("treble"),
      mid: fft.getEnergy("mid"),
      level: analyzer.getLevel()
    });
  };
}
new p5(env, document.getElementById("canvas"));
