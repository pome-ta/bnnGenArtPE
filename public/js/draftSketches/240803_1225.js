const title = 'canvas size flex test';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;
  
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();
    console.log(p);
  };
  
  p.windowResized = () => {
    windowFlexSize();
  };
  
  function windowFlexSize() {
    const isInitialize = typeof setupWidth === 'undefined' ||  typeof setupHeight === 'undefined';
    [setupWidth, setupHeight] = isInitialize ? [p.width, p.height] : [setupWidth, setupHeight];
    
    const sizeRatio = 0.92;
    const windowWidth = p.windowWidth * sizeRatio;
    const windowHeight = p.windowHeight * sizeRatio;
    
    const widthRatio = windowWidth < setupWidth ? windowWidth / setupWidth : 1;
    const heightRatio = windowHeight < setupHeight ? windowHeight / setupHeight : 1;
  
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

