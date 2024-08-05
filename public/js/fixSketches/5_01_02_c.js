const title = '5.1.2 ノイズの視覚化';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  let xstart, xnoise, ynoise;

  p.setup = () => {
    // put setup code here
    p.createCanvas(300, 300);
    windowFlexSize();

    p.background(0);
    xstart = p.random(10);
    xnoise = xstart;
    ynoise = p.random(10);

    for (let y = 0; y <= h; y += 5) {
      ynoise += 0.1;
      xnoise = xstart;
      for (let x = 0; x <= w; x += 5) {
        xnoise += 0.1;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }
  };

  function drawPoint(x, y, noiseFactor) {
    p.push();
    p.translate(x, y);
    p.rotate(noiseFactor * p.radians(540));
    const edgeSize = noiseFactor * 35;
    const grey = 150 + noiseFactor * 120;
    const alph = 150 + noiseFactor * 120;
    p.noStroke();
    p.fill(grey, alph);
    p.ellipse(0, 0, edgeSize, edgeSize / 2);
    p.pop();
  }

  function windowFlexSize(isFullSize = false) {
    const isInitialize =
      typeof setupWidth === 'undefined' || typeof setupHeight === 'undefined';
    [setupWidth, setupHeight] = isInitialize
      ? [p.width, p.height]
      : [setupWidth, setupHeight];

    const sizeRatio = 0.92;
    const windowWidth = p.windowWidth * sizeRatio;
    const windowHeight = p.windowHeight * sizeRatio;
    if (isFullSize) {
      w = windowWidth;
      h = windowHeight;
    } else {
      const widthRatio =
        windowWidth < setupWidth ? windowWidth / setupWidth : 1;
      const heightRatio =
        windowHeight < setupHeight ? windowHeight / setupHeight : 1;

      const setupRatio = Math.min(widthRatio, heightRatio);
      w = setupWidth * setupRatio;
      h = setupHeight * setupRatio;
    }

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
