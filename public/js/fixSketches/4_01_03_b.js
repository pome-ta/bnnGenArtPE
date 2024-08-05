const title = '4.1.3 ノイズの多いらせん';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();

    p.background(255);
    p.strokeWeight(0.5);

    const centx = w / 2;
    const centy = h / 2;

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

  function customRandom() {
    const retValue = 1 - p.pow(p.random(1), 5);
    return retValue;
  }

  function windowFlexSize() {
    const isInitialize =
      typeof setupWidth === 'undefined' || typeof setupHeight === 'undefined';
    [setupWidth, setupHeight] = isInitialize
      ? [p.width, p.height]
      : [setupWidth, setupHeight];

    const sizeRatio = 0.92;
    const windowWidth = p.windowWidth * sizeRatio;
    const windowHeight = p.windowHeight * sizeRatio;

    const widthRatio = windowWidth < setupWidth ? windowWidth / setupWidth : 1;
    const heightRatio =
      windowHeight < setupHeight ? windowHeight / setupHeight : 1;

    const setupRatio = Math.min(widthRatio, heightRatio);
    w = setupWidth * setupRatio;
    h = setupHeight * setupRatio;

    p.resizeCanvas(w, h);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.title = title ? title : document.title;

  const canvasId = 'p5Canvas';
  const canvasTag = document.querySelector(`#${canvasId}`);
  canvasTag.style.backgroundColor = 'darkgray';

  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), {
    passive: false,
  });
  // --- start
  new p5(sketch, canvasId);
});
