export const Metadata = {
  creators: ["Marius Krakeli"],
  url: "https://www.variant.no"
};

let shapes = [];

for (let i = 0; i < 50; i++) {
  shapes.push({
    xVal: 0,
    yVal: 0
  });
}

export default function draw(p5, { bass, treble, mid, level }) {
  let mapBass = p5.map(bass, 0, 255, -100, 800);
  p5.background("#000000");
  p5.strokeWeight(3);

  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].xVal === 0) shapes[i] = generateShape(p5);
    let shape = shapes[i];
    p5.push();
    p5.stroke(...shape.color);

    if (level > 0.42 && level < 0.45) {
      p5.rotateY(p5.random(5));
    } else if (level > 0.45) {
      p5.rotateX(p5.random(5));
    }

    if (shape.shape === "triangle") {
      p5.triangle(
        shape.xVal - shape.size / 2 - mapBass * 0.01,
        shape.yVal + shape.size / 2 + mapBass * 0.01,
        shape.xVal,
        shape.yVal - shape.size / 2 - mapBass * 0.01,
        shape.xVal + shape.size / 2 + mapBass * 0.01,
        shape.yVal + shape.size / 2 + mapBass * 0.01
      );
    } else if (shape.shape === "rectangle") {
      p5.rect(
        shape.xVal,
        shape.yVal,
        shape.size + mapBass * 0.01,
        shape.size + mapBass * 0.01
      );
    } else if (shape.shape === "cross") {
      p5.line(
        shape.xVal - shape.size / 2 - mapBass * 0.01,
        shape.yVal - shape.size / 2 - mapBass * 0.01,
        shape.xVal + shape.size / 2 + mapBass * 0.01,
        shape.yVal + shape.size / 2 + mapBass * 0.01
      );
      p5.line(
        shape.xVal + shape.size / 2 + mapBass * 0.01,
        shape.yVal - shape.size / 2 - mapBass * 0.01,
        shape.xVal - shape.size / 2 - mapBass * 0.01,
        shape.yVal + shape.size / 2 + mapBass * 0.01
      );
    } else {
      p5.ellipse(
        shape.xVal,
        shape.yVal,
        shape.size + mapBass * 0.01,
        shape.size + mapBass * 0.01
      );
    }

    shape.xVal =
      shape.xVal > p5.width / 2
        ? 0
        : shape.xVal + (shape.xSpeed + mapBass * 0.015);
    shape.yVal = shape.yPositive ? shape.yVal + 1 : shape.yVal - 1;
    p5.pop();
  }

  function generateShape(p5) {
    let yPositive = p5.random(100) > 50 ? true : false;
    let size = p5.random(5, 30);
    return {
      xVal: -(p5.width / 2) - size,
      color: [p5.random(255), p5.random(255), p5.random(255)],
      xSpeed: p5.random(5),
      yPositive: yPositive,
      size: size,
      yVal: yPositive
        ? p5.random(-(p5.height / 2), 0)
        : p5.random(0, p5.height / 2),
      shape: getShape(p5.random(4))
    };

    function getShape(x) {
      if (x < 1) {
        return "triangle";
      } else if (x > 1 && x < 2) {
        return "rectangle";
      } else if (x > 2 && x < 3) {
        return "cross";
      } else {
        return "ellipse";
      }
    }
  }
}
