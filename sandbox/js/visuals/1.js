export default function draw(p5, { bass, treble, mid, amplitude }) {
  let pieces = 0;
  let radius = 0;

  let mapMouseX = p5.map(p5.mouseX, 0, p5.width, 4, 10);
  let mapMouseY = p5.map(p5.mouseY, 0, p5.height, p5.windowHeight / 4, p5.windowHeight);

  let mapMid = p5.map(mid, 0, 255, -radius, radius);
  let scaleMid = p5.map(mid, 0, 255, 1, 1.5);

  let mapTreble = p5.map(treble, 0, 255, -radius, radius);
  let scaleTreble = p5.map(treble, 0, 255, 1, 1.5);

  let mapbass = p5.map(bass, 0, 255, -100, 800);
  let scalebass = p5.map(bass, 0, 255, 0, 0.8);

  pieces = mapMouseX;
  radius = mapMouseY;

  p5.strokeWeight(1);

  for (let i = 0; i < pieces; i += 0.5) {
    p5.rotate(p5.TWO_PI / pieces);

    /*----------  BASS  ----------*/
    p5.push();
    p5.strokeWeight(5);
    p5.stroke("#03dac6");
    p5.scale(scalebass);
    p5.rotate(p5.frameCount * -0.5);
    p5.line(mapbass, radius / 2, 0, radius, radius, 0);
    p5.line(-mapbass, -radius / 2, 0, radius, radius, 0);
    p5.pop();

    /*----------  MID  ----------*/
    p5.push();
    p5.strokeWeight(0.5);
    p5.stroke("#6200ee");
    p5.scale(scaleMid);
    p5.line(mapMid, radius / 2, 0, radius, radius, 0);
    p5.line(-mapMid, -radius / 2, 0, radius, radius, 0);
    p5.pop();

    /*----------  TREMBLE  ----------*/
    p5.push();
    p5.stroke("#ff0166");
    p5.scale(scaleTreble);
    p5.line(mapTreble, radius / 2, radius, radius);
    p5.line(-mapTreble, -radius / 2, radius, radius);
    p5.pop();
  }
}
