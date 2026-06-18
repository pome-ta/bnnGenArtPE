const title = '2.4.3 for ループ';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();

    p.background(180);
    p.strokeWeight(4);
    p.strokeCap(p.SQUARE);

    for (let hy = 10; hy <= h - 15; hy += 10) {
      // if (hy > 255) {
      //   break;
      // }
      p.stroke(0, 255 - hy);
      p.line(10, hy, w - 20, hy);
      p.stroke(255, hy);
      p.line(10, hy + 4, w - 20, hy + 4);
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
