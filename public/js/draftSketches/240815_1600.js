const title = 'いい感じの多角形';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;
  
  let radius = 320;
  const corner = 16;
  const angStep = corner > 1 ? 360 / corner : 1;

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(720, 720);
    windowFlexSize();
    
    p.frameRate(30);

    p.background(150);  // lightgray
    p.noFill();
    
    radius *= setupRatio;
    
    const centX = w / 2;
    const centY = h / 2;
    
    const loopIndex = [...Array(corner > 1 ? corner : 360).keys()];
    
    [...loopIndex].forEach(i => {
      const sAng = i * angStep;
      const eAng = (i + 1) * angStep;
      
      const sx = centX + (radius * p.cos(p.radians(sAng)));
      const sy = centY + (radius * p.sin(p.radians(sAng)));
      
      const ex = centX + (radius * p.cos(p.radians(eAng)));
      const ey = centY + (radius * p.sin(p.radians(eAng)));
      
      p.line(sx, sy, ex, ey);
      
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

