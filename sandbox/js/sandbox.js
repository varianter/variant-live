import p5 from "p5";
import fs from "fs";

import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";

import editor from "./editor";
import createMusic from "./audio-player";
import createAddLink from "./add-link";

import ibmFont from "../assets/IBMPlexMono-Bold.ttf";

const example = fs.readFileSync(__dirname + "/example.template").toString();

let render = () => {};
let metadata = {};
const editorContainer = document.getElementById("editor");
const updateLink = createAddLink(editorContainer.parentElement);

editor(example, editorContainer, function replaceSource(error, fn, attribution, src) {
  if (error) return console.error(error);
  updateLink(src);

  render = fn;
  metadata = attribution;
});

function env(p) {
  let fft, analyzer, music, myFont;

  p.preload = () => {
    music = createMusic(p5);
    myFont = p.loadFont(ibmFont);
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
    p.textFont(myFont);
    p.noFill();
    fft.analyze();

    try {
      p.push();
      render(p, {
        bass: fft.getEnergy("bass"),
        treble: fft.getEnergy("treble"),
        mid: fft.getEnergy("mid"),
        level: analyzer.getLevel()
      });
      p.pop();

      renderAttribution(p);
    } catch (ex) {
      console.error(ex.message);
    }
  };

  function renderAttribution(p) {
    if (!metadata || !metadata.creators || !Array.isArray(metadata.creators)) return;

    p.push();
    p.translate(-p.windowWidth / 2, p.windowHeight / 2 - 80);
    p.textSize(40);
    p.fill("#fff");
    p.text(metadata.creators.join(" & "), 20, 0);

    if (metadata.url) {
      p.textSize(26);
      p.text(metadata.url, 20, 40);
    }
    p.pop();
  }
}
new p5(env, document.getElementById("canvas"));
