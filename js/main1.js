var mic, pieces, radius, fft, mapMouseX, mapMouseY, currentVisual, analyzer;
var colorPalette = ["#000", "#03dac6", "#6200ee", "#ff0166", "#728d0d"];

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentVisual = "visual1";

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  analyzer = new p5.Amplitude();

  document.onkeydown = changeVisuals;
}

function changeVisuals(e) {
  const allowedKeys = ["1", "2", "3", "4", "5"];
  if (allowedKeys.find(key => key === e.key)) {
    currentVisual = "visual" + e.key;
  }
}

function draw() {
  background(colorPalette[0]);

  noFill();

  fft.analyze();

  var data = {
    bass: fft.getEnergy("bass"),
    treble: fft.getEnergy("treble"),
    mid: fft.getEnergy("mid"),
    level: analyzer.getLevel()
  };

  switch (currentVisual) {
    case "visual1":
      visual1(data);
      break;
    case "visual2":
      visual2(data);
      break;
    case "visual3":
      visual3(data);
      break;
    case "visual4":
      visual4(data);
      break;
    case "visual5":
      visual5(data);
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function visual1({ bass, treble, mid, amplitude }) {
  var mapMid = map(mid, 0, 255, -radius, radius);
  var scaleMid = map(mid, 0, 255, 1, 1.5);

  var mapTreble = map(treble, 0, 255, -radius, radius);
  var scaleTreble = map(treble, 0, 255, 1, 1.5);

  var mapbass = map(bass, 0, 255, -100, 800);
  var scalebass = map(bass, 0, 255, 0, 0.8);

  mapMouseX = map(mouseX, 0, width, 4, 10);
  mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

  pieces = mapMouseX;
  radius = mapMouseY;

  translate(windowWidth / 2, windowHeight / 2);

  strokeWeight(1);

  for (i = 0; i < pieces; i += 0.5) {
    rotate(TWO_PI / pieces);

    /*----------  BASS  ----------*/
    push();
    strokeWeight(5);
    stroke(colorPalette[1]);
    scale(scalebass);
    rotate(frameCount * -0.5);
    line(mapbass, radius / 2, radius, radius);
    line(-mapbass, -radius / 2, radius, radius);
    pop();

    /*----------  MID  ----------*/
    push();
    strokeWeight(0.5);
    stroke(colorPalette[2]);
    scale(scaleMid);
    line(mapMid, radius / 2, radius, radius);
    line(-mapMid, -radius / 2, radius, radius);
    pop();

    /*----------  TREMBLE  ----------*/
    push();
    stroke(colorPalette[3]);
    scale(scaleTreble);
    line(mapTreble, radius / 2, radius, radius);
    line(-mapTreble, -radius / 2, radius, radius);
    pop();
  }
}

function visual2({ bass, treble, mid }) {
  var mapbass = map(bass, 0, 255, -100, 800);
  var scalebass = map(bass, 0, 255, 0.5, 1.2);

  var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
  var scaleMid = map(mid, 0, 255, 1, 1.5);

  var mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
  var scaleTreble = map(treble, 0, 255, 1, 1.5);

  mapMouseX = map(mouseX, 0, width, 2, 0.1);
  mapMouseY = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);

  pieces = mapMouseX;
  radius = mapMouseY;

  var mapScaleX = map(mouseX, 0, width, 1, 0);
  var mapScaleY = map(mouseY, 0, height, 0, 1);

  translate(width / 2, height / 2);

  for (i = 0; i < pieces; i += 0.01) {
    rotate(TWO_PI / pieces);

    /*----------  BASS  ----------*/
    push();
    strokeWeight(1);
    stroke(colorPalette[1]);
    scale(scalebass);
    rotate(frameCount * -0.5);
    line(mapbass, radius / 2, radius, radius);
    line(-mapbass, -radius / 2, radius, radius);
    pop();

    /*----------  MID  ----------*/
    push();
    strokeWeight(1);
    stroke(colorPalette[2]);
    line(mapMid, radius, radius * 2, radius * 2);
    pop();

    /*----------  TREMBLE  ----------*/
    push();
    stroke(colorPalette[3]);
    scale(scaleTreble);
    line(mapTreble, radius / 2, radius, radius);
    pop();
  }
}

function visual3({ bass, treble, mid }) {
  var mapMid = map(mid, 0, 255, -radius, radius);
  var scaleMid = map(mid, 0, 255, 1, 1.5);

  var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
  var scaleTreble = map(treble, 0, 255, 0.5, 2);

  var mapbass = map(bass, 0, 255, 0, 200);
  var scalebass = map(bass, 0, 255, 0, 0.8);

  mapMouseX = map(mouseX, 0, width, 100, 200);
  mapMouseScale = map(mouseX, 0, width, 0.35, 0.2);
  mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

  pieces = 9;
  radius = 200;

  translate(windowWidth / 2, windowHeight / 2);

  for (i = 0; i < pieces; i += 1) {
    rotate(TWO_PI / pieces);

    noFill();

    /*----------  BASS  ----------*/
    push();
    strokeWeight(8);
    stroke(colorPalette[1]);
    scale(scalebass + mapMouseScale);
    rotate(-frameCount * 0.05);
    point(mapbass, radius / 2);
    stroke(colorPalette[2]);
    strokeWeight(2.2);
    line(mapMouseX, mouseY, radius, radius);
    pop();

    /*----------  MID  ----------*/
    push();
    stroke(colorPalette[3]);
    strokeWeight(4);
    rotate(-frameCount * 0.01);
    point(mapMid, radius);
    pop();

    /*----------  TREMBLE  ----------*/
    push();
    stroke(colorPalette[4]);
    strokeWeight(4);
    scale(scaleTreble);
    rotate(frameCount * 0.01);
    point(-100, radius / 2);
    point(100, radius / 2);
    pop();
  }
}

function visual4({ bass, treble, mid, level }) {
  var _mapBassX = map(mouseX, 0, width, 400, 1200);
  for (var b = 0; b < bass; b++) {
    var _mapScale = map(b, 0, bass, 0, 3);
    push();
    noFill();
    stroke(colorPalette[1]);
    rotate(b * frameCount);
    strokeWeight(_mapScale);
    bezier(_mapBassX - b, 20, 10, 20, 100, 50, mouseY, mouseY);
    pop();
  }

  /*----------  MID  ----------*/
  for (var m = 0; m < mid; m += 20) {
    var angle = m * 3 * random();
    strokeWeight(1);
    push();

    fill(random(100, 255), random(100, 255), random(100, 255), random(0, 255));
    fill(colorPalette[2]);
    rotate(angle * 5);
    scale(level / 2);

    rect(mouseX + m * 10, mouseY + m * 50, m * 7, m * 7);

    pop();
  }

  /*----------  TREMBLE  ----------*/
  for (var j = 5; j < treble; j += 20) {
    var angleT = j * 3 * random();
    strokeWeight(1);
    push();
    fill(colorPalette[3]);
    rotate(angleT * 5);
    scale(level / 4);

    rect(mouseX * j + 10, mouseY * j, 200 * j, j * 5);
    pop();
  }
}

function visual5({ bass, mid, treble }) {
  var mapMid = map(mid, 0, 255, -100, 200);
  var scaleMid = map(mid, 0, 255, 1, 1.5);

  var mapTreble = map(treble, 0, 255, 200, 350);
  var scaleTreble = map(treble, 0, 255, 0, 1);

  var mapbass = map(bass, 0, 255, 50, 200);
  var scalebass = map(bass, 0, 255, 0.05, 1.2);

  mapMouseX = map(mouseX, 0, width, 1, 50);
  mapMouseXbass = map(mouseX, 0, width, 1, 5);
  mapMouseY = map(mouseY, 0, height, 2, 6);

  pieces = 20;
  radius = 100;

  for (i = 0; i < pieces; i += 0.1) {
    rotate(TWO_PI / (pieces / 2));

    noFill();

    /*----------  BASS  ----------*/
    push();
    stroke(colorPalette[1]);
    rotate(frameCount * 0.002);
    strokeWeight(0.5);
    polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 3);
    pop();

    /*----------  MID  ----------*/
    push();
    stroke(colorPalette[2]);
    strokeWeight(0.2);
    polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
    pop();

    /*----------  TREMBLE  ----------*/
    push();
    stroke(colorPalette[3]);
    strokeWeight(0.6);
    scale(mouseX * 0.0005);
    rotate(mouseX * 0.002);
    polygon(mapTreble + i / 2, mapTreble - i / 2, (mapMouseY * i) / 2, 3);
    pop();
  }

  function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = x + cos(a) * radius;
      var sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
