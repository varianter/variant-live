import createP5Env from "../../common/p5-env";
import song from "../../assets/music.mp3";
import visuals from "../../visuals/*.js";

const filename = getFilename();
const availableVisuals = Object.keys(visuals);

if (!availableVisuals.includes(filename)) {
  document.querySelector(".error").classList.add("error--visible");
} else {
  renderVisuals();
}

function renderVisuals() {
  const render = visuals[filename].default;
  const metadata = visuals[filename].Metadata;

  const opts = {
    render,
    preload(_, p5) {
      let music = new p5.SoundFile(song, function loaded() {
        music.loop();
      });

      return music;
    }
  };

  createP5Env(opts, metadata, document.getElementById("canvas"));
}

function getFilename() {
  let urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("visual")) return "";
  const visuals = decodeURIComponent(urlParams.get("visual"));

  if (!/^[a-z0-9]+$/i.test(visuals)) return "";
  return visuals;
}
