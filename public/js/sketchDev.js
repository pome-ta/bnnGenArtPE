const title = '5.3.1 3 次元空間で描く';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  let xstart, xnoise, ystart, ynoise;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);
    windowFlexSize();
  };

  p.draw = () => {
    p.background(255);
    p.push();
    p.translate(0, 0, 300);
    p.sphere(100, 9, 9);
    p.pop();
  };

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
