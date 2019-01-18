export const Metadata = {
  creators: ["Stian Veum Møllersen"],
  url: "@mollerse",
  mode: "P2D"
};

let stepY = 0;

const PURPLE = "#6200ee";
const GREEN = "#03dac6";
const PINK = "#ff0166";
const BEIGE = "#ede8d7";
const BLACK = "#33333d";

function drawShape(p5, stepX, scaleY, offsetY, offsetNoise, factor = 1) {
  p5.beginShape();
  p5.vertex(0, p5.height);
  for (let x = 0; x <= p5.width + 1; x += p5.width / 100) {
    let n = p5.noise((stepX + offsetNoise) * factor, 0);
    let y = p5.map(n, 0, 1, 200 + offsetY - scaleY, 600 + offsetY - scaleY);
    p5.vertex(x, y);

    stepX += 0.025;
  }
  p5.vertex(p5.width, p5.height);

  p5.endShape(p5.CLOSE);
}

export default function draw(p5, { bass, treble, mid, level }) {
  p5.background(BLACK);
  let scaleBass = p5.map(bass, 0, 255, 0, 100);
  let scaleTreble = p5.map(treble, 0, 255, 0, 100);
  let scaleMid = p5.map(mid, 0, 255, 0, 100);

  p5.strokeWeight(2.5);
  p5.stroke(BLACK);

  let stepX = stepY;

  p5.fill(PINK);
  drawShape(p5, stepX, scaleBass, -200, 1000);
  p5.fill(PURPLE);
  drawShape(p5, stepX * 1.5, scaleMid, 0, 0);
  p5.fill(GREEN);
  drawShape(p5, stepX, scaleTreble, 200, 2000);
  p5.fill(BEIGE);
  drawShape(p5, stepX / 2, scaleBass / 2, 400, 3000, 0.25);

  stepY += level * 0.05;
}
