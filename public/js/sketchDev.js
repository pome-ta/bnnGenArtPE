const title = '5.3.2 3次元ノイズ';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  let xstart, ystart, zstart, xnoise, ynoise, znoise;
  let sideLength = 200;
  const spacing = 5;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);
    windowFlexSize();

    p.background(0);
    p.frameRate(24);
    p.noStroke();

    xstart = p.random(10);
    ystart = p.random(10);
    zstart = p.random(10);

    sideLength *= setupRatio;
  };

  p.draw = () => {
    p.background(0);

    xstart += 0.01;
    ystart += 0.01;
    zstart += 0.01;

    xnoise = xstart;
    ynoise = ystart;
    znoise = zstart;

    p.translate(0, -h / 16, -w / 2);
    p.rotateZ(p.frameCount * 0.1);
    p.rotateY(p.frameCount * 0.1);
    

    for (let z = 0; z <= sideLength; z += spacing) {
      znoise += 0.1;
      ynoise = ystart;

      for (let y = 0; y <= sideLength; y += spacing) {
        ynoise += 0.1;
        xnoise = xstart;
        for (let x = 0; x <= sideLength; x += spacing) {
          xnoise += 0.1;
          drawPoint(x, y, z, p.noise(xnoise, ynoise, znoise));
        }
      }
    }
  };

  function drawPoint(x, y, z, noiseFactor) {
    p.push();
    p.translate(-x, -y, z);
    //p.translate(h / 2, 20, -w / 2);
    const grey = noiseFactor * 255;

    p.fill(grey, 10);
    p.box(spacing, spacing, spacing);
    //p.sphere(spacing, spacing, spacing);
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

      setupRatio = Math.min(widthRatio, heightRatio);
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
