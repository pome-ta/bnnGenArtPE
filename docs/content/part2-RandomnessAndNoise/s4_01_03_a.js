// 4.1.3 ノイズの多いらせん

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);

    p.background(255);
    p.strokeWeight(5);

    let radius = 100;
    const centx = p.width / 2;
    const centy = p.height / 2;

    p.stroke(0, 30);
    p.noFill();
    p.ellipse(centx, centy, radius * 2, radius * 2);

    p.stroke(20, 50, 70);

    radius = 10;
    let x, y;
    let lastx = -999;
    let lasty = -999;
    let radiusNoise = p.random(10);
    for (let ang = 0; ang <= 360 * 4; ang += 5) {
      radiusNoise += 0.05;
      radius += 0.5;
      const thisRadius = radius + p.noise(radiusNoise) * 200 - 100;
      const rad = p.radians(ang);
      x = centx + thisRadius * p.cos(rad);
      y = centy + thisRadius * p.sin(rad);
      if (lastx > -999) {
        p.line(x, y, lastx, lasty);
      }
      lastx = x;
      lasty = y;
    }
  };
};

new p5(sketch);
