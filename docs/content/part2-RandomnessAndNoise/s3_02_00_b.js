// 3.2 変化の繰り返し

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 100);

    p.background(255);
    p.strokeWeight(5);

    p.stroke(0, 30);
    p.line(20, p.height / 2, p.width - 20, p.height / 2);

    let y = p.height / 2;
    const step = 20;
    const xstep = 10;
    let ystep = 10;
    let lastx = step;
    let lasty = y;

    p.stroke(20, 50, 70);

    for (let x = step; x <= p.width - step; x += xstep) {
      ystep = p.random(step) - 10; // range -10 to 10
      y += ystep;
      p.line(x, y, lastx, lasty);
      lastx = x;
      lasty = y;
    }
  };
};

new p5(sketch);
