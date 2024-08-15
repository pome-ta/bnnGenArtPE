const title = '';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;
  
  let radius = 480;
  let corner = 4;

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(720, 720);
    windowFlexSize();
    
    p.frameRate(30);

    p.background(150);  // lightgray
    p.noFill();
    
    radius *= setupRatio;
    
    const [_volume, _interval] = corner > 1 ? [corner, 360 / corner] : [360, 1];
    const index = [...Array(_volume)].map((_, i) => i * _interval);
    
    [...index].forEach(ang => {
      
    });
    

    
    
    
    
  };

  p.draw = () => {
    // put drawing code here
    
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
