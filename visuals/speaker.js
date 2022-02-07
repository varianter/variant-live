import { Color } from "p5";

export const Metadata = {
    creators: ["Mats"],
    url: "https://www.variant.no"
  };
  
    const purple = '#423D89'

  export default function draw(p5, { bass, treble, mid, level }) {
    p5.background(purple);
    let mapBass = p5.map(bass, 0, 255, 0, 100);
    let mapTreble = p5.map(treble, 0, 255, 50, 300);
    let mapMid = p5.map(mid, 0, 255, 0, 100);

    let v = new p5.createVector(p5.noise(10), p5.noise(100), p5.noise(50));
    p5.rotate((p5.frameCount / 500), v);

    let step = 2 * Math.PI / 150;
    let h = 0; 
    let k = 0;
    let r = 250;

    let step2 = 2 * Math.PI / 150;
    let r2 = 300;

    let step3 = 2 * Math.PI / 150;
    let r3 = 350;
    
    p5.push();
    let v2 = new p5.createVector(0, 0, 2 * mapBass);
    p5.translate(v2);
    let c4 = p5.color(153 + (0.2 * mapBass), 97 + (0.1 * mapBass), 29);
    p5.stroke(c4);
    p5.circle(0, 0, 100 + mapBass / 3);
    p5.pop();

    for (let theta = 0;  theta < 2 * Math.PI;  theta += step) {
        p5.push();
        let v = new p5.createVector(0, 0, 0.7 * mapBass);
        p5.translate(v);
        p5.rotate((p5.frameCount / 1000));
        let x = h + r * Math.cos(theta);
        let y = k - r * Math.sin(theta);
        let c = p5.color(mapBass, mapBass, mapBass * 2);
        p5.stroke(c);
        p5.fill(c);
        p5.circle(x + (0.1 * p5.random(-mapBass, mapBass)), y + (0.1 * p5.random(-mapBass, mapBass)), p5.random(mapBass, 10 * mapBass) / 25);
        p5.pop();
    }

    for(let theta = 0;  theta < 2 * Math.PI;  theta += step2) {
        p5.push();
        let v = new p5.createVector(0, 0, 0.4 * mapBass);
        p5.translate(v);
        p5.rotate(-(p5.frameCount / 10));
        let x = h + r2 * Math.cos(theta);
        let y = k - r2 * Math.sin(theta);
        let c = p5.color(mapTreble, 220, mapTreble * 2.1);
        p5.stroke(c);
        p5.fill(c);
        p5.circle(x, y, p5.random(mapTreble, 10 * mapTreble) / 100);
        p5.pop();
    }

    for(let theta = 0;  theta < 2 * Math.PI;  theta += step3) {
        p5.push();
        let v = new p5.createVector(0, 0, 0.2 * mapBass);
        p5.translate(v);
        p5.rotate((p5.frameCount / 10));
        let x = h + r3 * Math.cos(theta);
        let y = k - r3 * Math.sin(theta);
        let c = p5.color(mapMid, 220, mapMid * 2.1);
        p5.stroke(c);
        p5.fill(c);
        if (mapBass >= 50) {
            p5.circle(x, y, p5.random(mapBass, 10 * mapBass) / 50);
        }
        else {
            p5.circle(x + (0.05 * p5.random(-mapMid, mapMid)), y + (0.05 * p5.random(-mapMid, mapMid)), p5.random(mapMid, 10 * mapMid) / 75);
        }
        p5.pop();
    }

    
    

  }