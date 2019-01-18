import createP5Env from "../../common/p5-env";
import visuals from "../../visuals/*.js";

const timePerVisualInSec = 120;

const availableVisuals = Object.keys(visuals);
let n = 0;
const visualName = availableVisuals[n];

const render = visuals[visualName].default;
const metadata = visuals[visualName].Metadata;

const opts = {
  render,
  preload(_, p5) {
    let mic = new p5.AudioIn();
    mic.start();
    return mic;
  }
};

let { recreate } = createP5Env(opts, metadata, document.getElementById("canvas"));
let interval = setupInterval();

function setupInterval() {
  return setInterval(nextVisual, timePerVisualInSec * 1000);
}

document.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "ArrowLeft":
      onArrow("left");
      break;
    case "ArrowRight":
      onArrow("right");
      break;
  }
});

function onArrow(direction) {
  clearInterval(interval);
  if (direction === "right") {
    nextVisual();
  } else {
    prevVisual();
  }
  interval = setupInterval();
}

function nextVisual() {
  n = n >= availableVisuals.length - 1 ? 0 : n + 1;
  console.log(availableVisuals[n]);
  recreate({
    render: visuals[availableVisuals[n]].default,
    metadata: visuals[availableVisuals[n]].Metadata
  });
}

function prevVisual() {
  n = n === 0 ? availableVisuals.length - 1 : n - 1;
  console.log(availableVisuals[n]);
  recreate({
    render: visuals[availableVisuals[n]].default,
    metadata: visuals[availableVisuals[n]].Metadata
  });
}
