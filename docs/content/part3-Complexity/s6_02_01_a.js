const title = '6.2.1 クラスとインスタンス';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  const _num = 10;

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);
    windowFlexSize();

    p.background(255);
    p.strokeWeight(1);
    p.fill(150, 50);
    mouseReleased();

    cnvs?.mouseReleased(mouseReleased);
  };

  p.draw = () => {};

  function mouseReleased() {
    drawCircles();
  }

  function drawCircles() {
    for (let i = 0; i < _num; i++) {
      const x = p.random(w);
      const y = p.random(h);
      const radius = p.random(100) + 10;
      p.noStroke();
      p.ellipse(x, y, radius * 2, radius * 2);
      p.stroke(0, 150);
      p.ellipse(x, y, 10, 10);
    }
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
