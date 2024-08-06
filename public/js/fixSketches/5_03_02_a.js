const title = '5.3.2 3次元ノイズ';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  let xstart, xnoise, ystart, ynoise;
  const sphereDetail = 8; // xxx: `sphereDetail`

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);
    windowFlexSize();

    p.background(0);
    p.frameRate(24);
    p.noStroke();

    xstart = p.random(10);
    ystart = p.random(10);
  };
  p.draw = () => {
    p.background(0);

    xstart += 0.01;
    ystart += 0.01;

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
    p.translate(x - (w / 2), (w / 2) - y - (h / 2), -y * 4);
    const sphereSize = noiseFactor * 35;
    const grey = (h / 2) + noiseFactor * 120;
    const alph = (h / 2) + noiseFactor * 120;
    p.fill(grey, alph);
    p.sphere(sphereSize, sphereDetail, sphereDetail);
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

