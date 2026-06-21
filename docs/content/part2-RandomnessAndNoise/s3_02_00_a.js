// 3.2 変化の繰り返し

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 100);

    p.background(255);
    p.strokeWeight(5);

    p.stroke(0, 30);
    p.line(20, p.height / 2, p.width - 20, p.height / 2);

    const steps = 10;
    let lastx = -999;
    let lasty = -999;
    let y = p.height / 2;
    const borderx = 20;
    const bordery = 10;
    p.stroke(20, 50, 70);

    for (let x = borderx; x <= p.width - borderx; x += steps) {
      y = bordery + p.random(p.height - 2 * bordery);
      if (lastx > -999) {
        p.line(x, y, lastx, lasty);
      }
      lastx = x;
      lasty = y;
    }
  };
};

new p5(sketch);
