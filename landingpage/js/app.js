import p5 from "p5";

import render from "./visualisation";
import "p5/lib/addons/p5.dom";

function env(p) {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background("#fff");
    p.noFill();
    render(p);
  };
}
new p5(env, document.getElementById("canvas"));
