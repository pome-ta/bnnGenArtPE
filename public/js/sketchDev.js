const title = '2.2.1 関数、パラメータ、色値';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;
  
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();
    //p.background(230, 230, 230);
    p.background('blue');
    p.stroke(130, 0, 0);
    p.strokeWeight(4);
    p.line(w/2 - 70, h/2 - 70, w/2 + 70, h/2 + 70);
    p.line(w/2 + 70, h/2 - 70, w/2 - 70, h/2 + 70);
    p.fill(255, 150);
    p.ellipse(w/2, h/2, 50, 50);
    
    //console.log(p)
  };
  
  p.windowResized = () => {
    console.log('r')
    //windowFlexSize();
    //p.resizeCanvas(w, h);
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
