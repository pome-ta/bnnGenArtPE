const title = '3.3.1 Processing でのパーリンノイズ';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 100);
    windowFlexSize();

    p.background(255);
    p.strokeWeight(5);

    p.stroke(0, 30);
    p.line(20, h / 2, w - 20, h / 2);

    p.stroke(20, 50, 70);
    const step = 10;

    let lastx = -999;
    let lasty = -999;
    let ynoise = p.random(10);
    let y;

    for (let x = 20; x <= w - 20; x += step) {
      y = 10 + p.noise(ynoise) * 80;
      if (lastx > -999) {
        p.line(x, y, lastx, lasty);
      }
      lastx = x;
      lasty = y;
      ynoise += 0.1;
    }
  };

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
