const title = '5.2 ノイズ・アニメーション';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  let xstart, xnoise, ystart, ynoise;
  let xstartNoise, ystartNoise;

  p.setup = () => {
    // put setup code here
    p.createCanvas(300, 300);
    windowFlexSize();

    p.background(255);
    p.frameRate(24);

    xstartNoise = p.random(20);
    ystartNoise = p.random(20);
    xstart = p.random(10);
    ystart = p.random(10);
  };
  p.draw = () => {
    p.background(255);

    xstartNoise += 0.01;
    ystartNoise += 0.01;
    xstart += p.noise(xstartNoise) * 0.5 - 0.25;
    ystart += p.noise(ystartNoise) * 0.5 - 0.25;

    xnoise = xstart;
    ynoise = ystart;

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
    p.rotate(noiseFactor * p.radians(360));
    p.stroke(0, 150);
    p.line(0, 0, 20, 0);

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
