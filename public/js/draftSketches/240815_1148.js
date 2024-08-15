const title = '4.2 ケーススタディ:Wave Clock';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;
  
  let _angle = p.PI / 2;
  let _radius = 320;

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(720, 720);
    windowFlexSize();
    
    p.frameRate(30);

    p.background(211);  // lightgray
    p.noFill();
    
    _radius *= setupRatio;
    
  };

  p.draw = () => {
    // put drawing code here
    p.background(211, 24);  // lightgray
    _angle -= 3;
    _angle -= _angle > 360 ? 360 : 0;
    _angle += _angle < 0 ? 360 : 0;
    
    const _center = p.noise(_angle) * 48 * setupRatio;
    const centerx = w / 2 - _center;
    const centery = h / 2;
    
    const rad = p.radians(_angle);
    const x1 = centerx + (_radius * p.cos(rad));
    const y1 = centery + (_radius * p.sin(rad));
    
    const opprad = rad + p.PI;
    const x2 = centerx + (_radius * p.cos(opprad));
    const y2 = centery + (_radius * p.sin(opprad));
    
    p.stroke(8, 60);
    
    p.strokeWeight(0.8);
    p.line(x1, y1, x2, y2);

    
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

