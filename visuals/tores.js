export const Metadata = {
  creators: ["tore"],
  url: "https://www.variant.no"
};

let maxBass = 0;

let bassX = -300;
let midX = 0;
let trebleX = 300;

let lastBass = 0;
let lastTreble = 0;
let lastMid = 0;

 let img ;

export default function draw(p5, { bass, treble, mid, level }) {
  
  let top = p5.height / 2;
  let right = p5.width / 2;
  let left = p5.width / -2;

  
  let addBar = (pos, height) => {
    // top right
    p5.push();
    p5.fill(150,102,153);
    p5.translate(height/2 + right - 10, pos - top + 20);
    p5.box(height,20,0);
    p5.pop();
    // top left
    p5.push();
    p5.fill(150,102,153);
    p5.translate(height/-2 + left + 10, pos - top + 20);
    p5.box(height,20,0);
    p5.pop();
  }

  addBar(0, -bass);
  addBar(30, -mid);
  addBar(60, -treble);

  let addCircle = (x, y) => {
    p5.push();
    p5.stroke(50);
    p5.fill(150,102,153);
    p5.ellipse(x, -y, 50, 50);
    p5.pop();
    //body

    p5.push();
    p5.stroke(255);
    p5.fill(150,102,153);
    p5.line(x, -y+25, x, -y+100);
    p5.pop();

    const maxValue = 250;
    let handHeight = ((y / maxValue) * 40) -10

    //right arm
    p5.push();
    p5.stroke(255);
    p5.fill(150,102,153);
    p5.line(x, -y+25, x+40, -y+handHeight+20);
    p5.pop();

    //left arm
    p5.push();
    p5.stroke(255);
    p5.fill(150,102,153);
    p5.line(x, -y+25, x-40, -y+handHeight+20);
    p5.pop();

    //right leg
    p5.push();
    p5.stroke(255);
    p5.fill(150,102,153);
    p5.line(x, -y+100, x+20, -y+100+50);
    p5.pop();

    //left leg
    p5.push();
    p5.stroke(255);
    p5.fill(150,102,153);
    p5.line(x, -y+100, x-20, -y+100+50);
    p5.pop();
    
  }
  
  let calculateX = (newValue, lastValue, oldX) => {
    let move = newValue - lastValue;
    if (move < 0) {move = 0; }
    move = move * p5.random(-1, 1); 
    let x = oldX + move;
    if (x > p5.width/2) { x = 0 - p5.width/2; }
    if (x < 0-p5.width/2) { x = 0 - p5.width/2; }
    return x;
  };
  
  
  
  let trebleMove = treble - lastTreble ;
  trebleX = calculateX(treble, lastTreble, trebleX);
  addCircle(trebleX, treble);
  
  let midMove = mid - lastMid ;
  midX = calculateX(mid, lastMid, midX);
  addCircle(midX, mid);
  
  let bassMove = bass - lastBass ;
  bassX = calculateX(bass, lastBass, bassX);
  addCircle(bassX, bass);

  lastBass = bass;
  lastMid = mid;
  lastTreble = treble;

  if (bass > maxBass) {maxBass = bass;}
 }


