export const Metadata = {
  creators: ["Marius Krakeli"],
  url: "https://www.variant.no"
};

export default function draw(p5, { bass, treble, mid, amplitude }) {
  p5.randomSeed(700);
  let pieces = p5.map(p5.random(0, p5.windowWidth), 0, p5.width, 2, 0.1);
  let radius = p5.map(
    p5.random(0, p5.windowHeight),
    0,
    p5.height,
    p5.windowHeight / 8,
    p5.windowHeight / 6
  );

  let mapbass = p5.map(bass, 0, 255, -100, 800);
  let scalebass = p5.map(bass, 0, 255, 0.5, 1.2);
  let mapMid = p5.map(mid, 0, 255, -radius / 4, radius * 4);

  let mapTreble = p5.map(treble, 0, 255, -radius / 4, radius * 4);
  let scaleTreble = p5.map(treble, 0, 255, 1, 1.5);

  for (let i = 0; i < pieces; i += 0.01) {
    p5.rotate(p5.TWO_PI / pieces);

    /*----------  BASS  ----------*/
    p5.push();
    p5.strokeWeight(1);
    p5.stroke("#6200ee");
    p5.scale(scalebass);
    p5.rotate(p5.frameCount * -0.5);
    p5.line(mapbass, radius / 2, radius, radius);
    p5.line(-mapbass, -radius / 2, radius, radius);
    p5.pop();

    /*----------  MID  ----------*/
    p5.push();
    p5.strokeWeight(1);
    p5.stroke("#ff0166");
    p5.line(mapMid, radius, radius * 2, radius * 2);
    p5.pop();

    /*----------  TREBLE  ----------*/
    p5.push();
    p5.stroke("#03dac6");
    p5.scale(scaleTreble);
    p5.line(mapTreble, radius / 2, radius, radius);
    p5.pop();
  }
}
