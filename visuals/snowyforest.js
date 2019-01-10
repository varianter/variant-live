export const Metadata = {
    creators: ['Anders Njøs Slinde'],
    url: 'https://github.com/andersns'
};

let snowflakes = []; // array to hold snowflake objects
let snowFlakesmax = 600;
let time = 0;

export default function draw(p5, { bass, treble, mid, level }) {
    let t = p5.frameCount / 60;

    if (p5.millis() > time + 300) {
        snowflakes.push(new snowflake(p5));
        time = p5.millis();
    }

    for (let flake of snowflakes) {
        flake.update(t);
        flake.display(bass);
    }

    let scaleTreble = p5.map(treble, 0, 255, 0.2, 0.4);
    let scaleLevel = p5.map(level, 0, 255, 0, 1);
    let scaleMid = p5.map(mid, 0, 255, 0, 1);

    tree(p5, 1, p5.width * 0.4, treble, scaleLevel, scaleMid);
    tree(p5, 0.8, p5.width * 0.3, treble, scaleLevel, scaleMid);
    tree(p5, 1, p5.width * 0.2, treble, scaleLevel, scaleMid);
    tree(p5, 0.7, p5.width * 0.1, treble, scaleLevel, scaleMid);
    tree(p5, 1, 0, treble, scaleLevel, scaleMid);
    tree(p5, 0.9, p5.width * -0.1, treble, scaleLevel, scaleMid);
    tree(p5, 1, p5.width * -0.2, treble, scaleLevel, scaleMid);
    tree(p5, 0.6, p5.width * -0.3, treble, scaleLevel, scaleMid);
    tree(p5, 1, p5.width * -0.4, treble, scaleLevel, scaleMid);
}

function tree(p5, relativeHeight, offset, treble, scaleLevel, scaleHeight) {
    let branchCount = 18;

    let halfHeight = p5.height / 2;
    let minHeight = p5.height * 0.3;
    let scaledHeight = p5.height * 0.6 * scaleHeight;

    let x1 = 0 + offset;
    let y1 = p5.height / 2;

    let x2 = 0 + offset;
    let y2 = halfHeight - minHeight - scaledHeight * relativeHeight;
    p5.push();
    p5.fill('brown');
    p5.stroke('brown');

    let scaleTrunkStroke = p5.map(treble, 0, 255, 4, 35);
    p5.strokeWeight(scaleTrunkStroke);
    p5.line(x1, y1, x2, y2);
    p5.pop();

    p5.push();
    p5.fill('#4e7501');
    p5.stroke('#4e7501');
    let scalebranchStroke = p5.map(treble, 0, 255, 4, 35);
    p5.strokeWeight(scalebranchStroke);
    let scaleBranches = p5.map(treble, 0, 255, 0.2, 0.4);
    branch(p5, x2, y2, 15, branchCount, scaleBranches);
    branch(p5, x2, y2, -15, branchCount, scaleBranches);

    p5.pop();
}

function branch(p5, x1, y1, angle, depth, scaleLength) {
    let length = 70 * (20 - depth) * scaleLength;
    let newx2 = x1 + length * p5.sin(angle);
    let newy2 = y1 - 60 * p5.cos(angle);
    p5.line(x1, y1, newx2, newy2);
    if (depth > 1) {
        branch(p5, x1, y1 + 33, angle, depth - 1, scaleLength);
    }
}

function snowflake(p5) {
    this.halfScreen = p5.width / 2;
    this.posX = 0;
    this.posY = -(p5.height / 2);
    this.initialangle = p5.random(0, 2 * p5.PI);
    this.size = 1;

    this.radius = p5.sqrt(p5.random(p5.pow(p5.width, 2)));

    this.update = function(time) {
        let w = 0.03; // speed
        let angle = w * time + this.initialangle;
        this.posX = -(p5.width / 2) + this.radius * p5.sin(angle);

        this.posY += p5.pow(this.size, 0.5);

        // Remove snowflakes past the screen
        if (this.posY > p5.height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function(bass) {
        p5.push();
        p5.fill('#fff');
        p5.stroke('#fff');
        p5.strokeWeight(35);
        p5.ellipse(this.posX, this.posY, 2 + p5.pow(bass / 100, 4));
        p5.pop();
    };
}
