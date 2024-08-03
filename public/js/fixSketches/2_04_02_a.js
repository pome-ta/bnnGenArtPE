const title = '2.4.2 痕跡を残す';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;
  
  let diam = 10;
  let centX, centY;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();
    p.frameRate(24);
    p.background(180);
    
    centX = w / 2;
    centY = h / 2;
    p.stroke(0);
    p.strokeWeight(1);
    p.fill(255, 50);
    p.noFill();
  };
  
  p.draw = () => {
    
    if (diam <= 400) {
      //p.background(180);
      p.ellipse(centX, centY, diam, diam);
      diam += 10;
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
