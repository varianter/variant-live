export const Metadata = {
  creators: ["Marius Krakeli"],
  url: "https://www.variant.no"
};

export default function draw(p5, { bass, treble, mid, amplitude }) {
  p5.randomSeed(700);

  let pieces = 9;
  let radius = 200;

  let mapMid = p5.map(mid, 0, 255, -radius, radius);
  let scaleTreble = p5.map(treble, 0, 255, 0.5, 2);

  let mapbass = p5.map(bass, 0, 255, 0, 200);
  let scalebass = p5.map(bass, 0, 255, 0, 0.8);

  let mapMouseScale = p5.map(p5.random(0, p5.width), 0, p5.width, 0.35, 0.2);

  for (let i = 0; i < pieces; i += 1) {
    p5.rotate(p5.TWO_PI / pieces);

    p5.noFill();

    /*----------  BASS  ----------*/
    p5.push();
    p5.strokeWeight(8);
    p5.stroke("#6200ee");
    p5.scale(scalebass + mapMouseScale);
    p5.rotate(-p5.frameCount * 0.05);
    p5.point(mapbass, radius / 2);
    p5.stroke("#ff0166");
    p5.strokeWeight(2.2);
    p5.pop();

    /*----------  MID  ----------*/
    p5.push();
    p5.stroke("#ff0166");
    p5.strokeWeight(4);
    p5.rotate(-p5.frameCount * 0.01);
    p5.point(mapMid, radius);
    p5.pop();

    /*----------  TREBLE  ----------*/
    p5.push();
    p5.stroke("#03dac6");
    p5.strokeWeight(4);
    p5.scale(scaleTreble);
    p5.rotate(p5.frameCount * 0.01);
    p5.point(-100, radius / 2);
    p5.point(100, radius / 2);
    p5.pop();
  }
}
