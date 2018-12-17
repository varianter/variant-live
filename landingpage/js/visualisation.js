let offset = -999999;
let easing = 0.05;
let targetX;

let timer = 0;
let timerLimit = 60 * 10;

export default function draw(p5) {
  p5.push();
  p5.translate(-p5.windowWidth / 2, -p5.windowHeight / 2);
  p5.rotate(p5.radians(-65));
  p5.strokeWeight(0);
  let offsetOffset = 300;

  if (typeof targetX === "undefined") {
    targetX = -p5.windowWidth / 2;
  }

  if (offset < -p5.windowWidth * 2) {
    offset = p5.windowWidth * 2;
  }

  if (++timer > timerLimit) {
    targetX = -p5.windowWidth;
    offsetOffset *= -0.5;
  }

  if (++timer > timerLimit * 1.1) {
    targetX = -p5.windowWidth / 2;
    offset = p5.windowWidth * 2;
    timer = 0;
    offsetOffset *= -2;
  }

  var diffx = targetX - offset;
  offset += diffx * easing;

  let size = 200,
    total = 90;

  let width = p5.windowWidth + 250;
  p5.fill("#4c358f");
  p5.rect(-p5.windowHeight + total, offset, size, width);

  total += size;
  p5.fill("#ff0064");
  p5.rect(-p5.windowHeight + total, offset + offsetOffset, size, width);

  total += size;
  p5.fill("#ffc2bb");
  p5.rect(-p5.windowHeight + total, offset + offsetOffset * 2, size, width);

  total += size;
  p5.fill("#f0e7d5");
  p5.rect(-p5.windowHeight + total, offset + offsetOffset * 3, size, width);
  p5.pop();
}
