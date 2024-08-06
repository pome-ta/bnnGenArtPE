const title = '5.3.1 3 次元空間で描く';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  let xstart, xnoise, ystart, ynoise;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);
    windowFlexSize();
    p.background(255);
    p.stroke(0, 30);
    p.strokeWeight(1);
  };

  p.draw = () => {
    p.background(255);
    
    //p.push();
    //const detail = Math.trunc(24 * p.frameCount % 24 );
    const _sin = p.sin(p.frameCount / 64);
    const detail = Math.trunc(14 + (10 * _sin));
    //console.log(p.sin(p.frameCount % 24))
    //console.log(_sin)
    //p.rotateX(p.frameCount * 0.01);
    p.rotateY(p.frameCount * 0.02);
    p.rotateZ(p.frameCount * 0.01);
    p.sphere(100, detail, detail);
    //p.pop();
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

