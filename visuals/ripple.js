export const Metadata = {
  creators: ["Jonas Follesø"],
  url: "https://www.blueye.no"
};

var isInit = false;
let width = 70;
let height = 0;
let pixelSize = 0;
let halfPixelSize = 0.0;
let current = [];
let previous = [];
let dampening = 0.65;

let rippleTimer = 0;
var fadeTimer = 0;
let colorIndex = 0;
let colors = []

export default function draw(p5, { bass, treble, mid, level }) {

  // Initialize
  if (isInit == false) {
    isInit = true;
    colors = [
      p5.color(255, 19, 104),
      p5.color(66, 63, 135),
      p5.color(37, 217, 197),
      p5.color(254, 196, 189)
    ];
    colorIndex = 0;
    rippleTimer = p5.millis();
    fadeTimer = p5.millis();

    pixelSize = p5.width / width;
    halfPixelSize = pixelSize / 2;
    var ratio = p5.height / p5.width;
    height = parseInt(width * ratio);
    for (var x = 0; x < width; ++x) {
      for (var y = 0; y < height; ++y) {
        let index = x + y *  width;
        current[index] = 0.0;
        previous[index] = 0.0;
      }
    }
  }

  // Control frame rate
  if (p5.millis() - rippleTimer < 17) {
    return;
  }
  rippleTimer = p5.millis();

  let mapLevel = p5.map(level, 0, 1, 0, 100)
  dampening = p5.map(bass, 0, 255, 0.45, 0.65);

  // Insert new ripple
  if (mapLevel > 14.0) {
    let rX = parseInt(p5.random(6, width - 6));
    let rY = parseInt(p5.random(6, height - 6)); 
    current[rX + rY * width] = 255;
  }

  // Start rotation
  if ((p5.millis() > 15000 && p5.millis() < 30000) || p5.millis() > 60000 ) {
    p5.rotateZ(level);
    p5.scale(1.0 + level);
    p5.rotateY(0);
    if (p5.millis() > 75000) {
      p5.scale(p5.map(level, 0, 1, 0.5, 1.8));
    }
  } else if (p5.millis() > 30000) {
    p5.rotateZ(p5.millis() / 1000);
    p5.rotateY(p5.millis() / 1000);
  }


  // Translate origo to upper left
  p5.translate(-halfPixelSize + (p5.width / 2) * -1, -halfPixelSize + (p5.height / 2) * -1);  
  p5.noStroke();
  
  // Select next color to fade towards
  let duration = p5.millis() - fadeTimer;
  if (duration >= 1000) {
    fadeTimer = p5.millis();
    duration = 0;
    if (colorIndex == colors.length - 1) {
      colorIndex = 0;
    } else {
      colorIndex++;
    }
  }

  // Select and mix colors
  let color1 = colors[colorIndex];
  let color2 = colorIndex == colors.length - 1 ? colors[0] : colors[colorIndex + 1];
  let color = p5.lerpColor(color1, color2, p5.map(duration, 0, 5000, 0.0, 1.0));
  
  // 2D Ripple algorithm: https://www.youtube.com/watch?v=BZUdGqeOD0w
  for (var x = 1; x < width-1; ++x) {
    for (var y = 1; y < height-1; ++y) {
      let index = x + y * width;

      current[index] = (
        previous[(x-1) + y * width] +
        previous[(x+1) + y * width] +
        previous[x + (y-1) * width] +
        previous[x + (y+1) * width]) / 2 - current[index];
        
      current[index] = current[index] * dampening;

      if (current[index] > 0.0) {
        p5.fill(p5.color(color.levels[0], color.levels[2], color.levels[3], current[index]*255));
        let eX = x + (x*pixelSize);
        let eY = y + (y*pixelSize);
        p5.ellipse(eX, eY, pixelSize);
      }
    }
  }

  let temp = previous;
  previous = current;
  current = temp;
}