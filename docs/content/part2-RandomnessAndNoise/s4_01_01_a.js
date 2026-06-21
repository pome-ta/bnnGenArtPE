const title = '4.1.1 初めて円を描く';

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();

    p.background(255);
    p.strokeWeight(5);

    const radius = 100;
    const centx = p.width / 2;
    const centy = p.height / 2;

    p.stroke(0, 30);
    p.noFill();
    p.ellipse(centx, centy, radius * 2, radius * 2);

    p.stroke(20, 50, 70);
    let x, y;
    let lastx = -999;
    let lasty = -999;
    for (let ang = 0; ang <= 360; ang += 5) {
      const rad = p.radians(ang);
      x = centx + radius * p.cos(rad);
      y = centy + radius * p.sin(rad);
      p.point(x, y);
    }
  };
};

new p5(sketch);
