const title = '4.1.2 円をらせんに変える';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();

    p.background(255);
    p.strokeWeight(5);

    let radius = 100;
    const centx = w / 2;
    const centy = h / 2;

    p.stroke(0, 30);
    p.noFill();
    p.ellipse(centx, centy, radius * 2, radius * 2);

    p.stroke(20, 50, 70);

    radius = 10;
    let x, y;
    let lastx = -999;
    let lasty = -999;
    for (let ang = 0; ang <= 360 * 4; ang += 5) {
      radius += 0.5;
      const rad = p.radians(ang);
      x = centx + radius * p.cos(rad);
      y = centy + radius * p.sin(rad);
      if (lastx > -999) {
        p.line(x, y, lastx, lasty);
      }
      lastx = x;
      lasty = y;
      lasty = y;
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
