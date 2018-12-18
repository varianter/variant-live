export const Metadata = {
  creators: ["Marius Krakeli"],
  url: "https://www.variant.no"
};

export default function draw(p5, { bass, treble, mid, level }) {
  p5.translate(-p5.windowWidth / 2, -p5.windowHeight / 2, 0);
  for (let b = 0; b < bass; b++) {
    let _mapScale = p5.map(b, 0, bass, 0, 3);
    p5.push();
    p5.noFill();
    p5.stroke("#03dac6");
    p5.rotate(b * p5.frameCount);
    p5.strokeWeight(_mapScale);
    p5.pop();
  }

  /*----------  MID  ----------*/
  for (let m = 0; m < mid; m += 20) {
    let angle = m * 3 * p5.random();
    p5.strokeWeight(1);
    p5.push();

    p5.fill(
      p5.random(100, 255),
      p5.random(100, 255),
      p5.random(100, 255),
      p5.random(0, 255)
    );
    p5.fill("#6200ee");
    p5.rotate(angle * 5);
    p5.scale(level / 2);

    p5.pop();
  }

  /*----------  TREBLE  ----------*/
  for (let j = 5; j < treble; j += 20) {
    let angleT = j * 3 * p5.random();
    p5.strokeWeight(1);
    p5.push();
    p5.fill("#ff0166");
    p5.rotate(angleT * 5);
    p5.scale(level / 4);

    p5.pop();
  }
}
