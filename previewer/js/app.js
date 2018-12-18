import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";

import visuals from "../../visuals/*.js";
import ibmFont from "../../sandbox/assets/IBMPlexMono-Bold.ttf";
import song from "../../sandbox/assets/music.mp3";

function getFilename() {
  let urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("visual")) return "";
  const visuals = decodeURIComponent(urlParams.get("visual"));

  if (!/^[a-z0-9]+$/.test(visuals)) return "";
  return visuals;
}

const filename = getFilename();
const availableVisuals = Object.keys(visuals);

if (!availableVisuals.includes(filename)) {
  document.querySelector(".error").classList.add("error--visible");
} else {
  let render = visuals[filename].default;
  let metadata = visuals[filename].Metadata;
  new p5(createEnv(render, metadata), document.getElementById("canvas"));
}

function createEnv(render, metadata) {
  return function env(p) {
    let fft, analyzer, music, myFont;

    p.preload = () => {
      music = new p5.SoundFile(song, function loaded() {
        music.loop();
      });

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
  };
}
