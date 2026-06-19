// 3.3.2 自分のノイズを作る

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 100);

    p.background(255);
    p.strokeWeight(5);

    p.stroke(0, 30);
    p.line(20, p.height / 2, p.width - 20, p.height / 2);

    p.stroke(20, 50, 70);

    const xstep = 1;
    let lastx = -999;
    let lasty = -999;
    let angle = 0;
    let y = p.height / 2;

    for (let x = 20; x <= p.width - 20; x += xstep) {
      const rad = p.radians(angle);
      y = p.height / 2 + p.sin(rad) * 40;
      if (lastx > -999) {
        p.line(x, y, lastx, lasty);
      }
      lastx = x;
      lasty = y;
      angle++;
    }
  };
};

new p5(sketch);
