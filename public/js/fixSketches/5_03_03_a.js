const title = '5.3.3 球を描く間違った方法';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;
  
  let radius = 100;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);
    windowFlexSize();
    
    radius *= setupRatio;
    
    p.background(255);
    p.frameRate(24);
    p.stroke(0);
    
  };

  p.draw = () => {
    p.background(255);
    
    //p.translate(-w/2, -h/2, 0);
    p.rotateY(p.frameCount * 0.02);
    p.rotateX(p.frameCount * 0.01);
    
    let s = 0;
    let t = 0;
    let lastx = 0;
    let lasty = 0;
    let lastz = 0;
    
    while (t < 180) {
      s += 18;
      t += 1;
      let radianS = p.radians(s);
      let radianT = p.radians(t);
      
      const thisx = 0 + (radius * p.cos(radianS) * p.sin(radianT));
      const thisy = 0 + (radius * p.sin(radianS) * p.sin(radianT));
      const thisz = 0 + (radius * p.cos(radianT));
      
      if (lastx !== 0) {
        p.line(thisx, thisy, thisz, lastx, lasty, lastz);
      }
      
      lastx = thisx;
      lasty = thisy;
      lastz = thisz;
    }
    
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
