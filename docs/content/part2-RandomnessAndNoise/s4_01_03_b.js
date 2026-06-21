// 4.1.3 ノイズの多いらせん

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);

    p.background(255);
    p.strokeWeight(0.5);

    const centx = p.width / 2;
    const centy = p.height / 2;

    let x, y;
    for (let i = 0; i < 100; i++) {
      let lastx = -999;
      let lasty = -999;
      let radiusNoise = p.random(10);
      let radius = 10;
      p.stroke(p.random(20), p.random(50), p.random(70), 80);

      const startangle = Math.trunc(p.random(360));
      const endangle = 360 * 4 + Math.trunc(p.random(360 * 4));
      const anglestep = 5 + Math.trunc(p.random(3));

      for (let ang = startangle; ang <= endangle; ang += anglestep) {
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
    }
  };
};

new p5(sketch);
