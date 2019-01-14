export const Metadata = {
  creators: ["Jacob Berglund"],
  url: "https://www.variant.no"
};

const numberOfTiles = 12;
const numberOfRows = 13;
const tileSegments = 360 / numberOfTiles;
const tileSize = window.innerWidth / numberOfTiles;

const purple = '#423D89'
const pink = '#FF0166'
const beige = '#EDE8D7'
const teal = '#03DAC6'

export default function draw(p5, { bass, treble, mid, level }) {
  p5.background(purple);

  let mapMid = p5.map(mid, 0, 255, 20, 200);
  let scaleMid = p5.map(mid, 0, 255, 1, 1.9);

  let mapTreble = p5.map(treble, 0, 255, 20, 50);
  let scaleTreble = p5.map(treble, 0, 255, 1, 1.9);

  let mapBass = p5.map(bass, 0, 255, 50, 150);
  let scaleBass = p5.map(bass, 0, 255, -50, -150);

  p5.noStroke();

  let r = (p5.width/1);
  

  for (let j = 1; j < numberOfRows; j++) {
    p5.push();
    p5.translate(0, 0, (j) * -500);

    p5.rotateZ(p5.frameCount * 0.005);

    for (let i = 0; i < tileSegments; i++) {

      let x = r * p5.sin( 2 * p5.PI * (i/tileSegments));
      let y = r * p5.cos( 2 * p5.PI * (i/tileSegments));
      let dy = (p5.height/2 - p5.height/2 ) - y;
      let dx = (p5.width/2 - p5.width/2) - x;
      let angle = p5.atan2( dy, dx );
      p5.push();
      p5.translate(x, y);

      p5.rotateZ(angle);
      p5.fill(pink);
      p5.rotateZ(-mapBass * 0.009);
      p5.plane(tileSize * 0.2 , tileSize * (mapMid * 0.01));
      p5.translate(scaleBass, scaleBass);
      
      p5.fill(teal);
      p5.scale(mapMid * 0.005);
      p5.plane(tileSize * 0.1, mapBass * 1.5);

      p5.pop();
    }
    p5.pop();

    p5.fill(beige);
    p5.ellipse(0, 0, mapBass)
  }
}
