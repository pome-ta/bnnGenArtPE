const title = '4.1.4 自分のノイズを作る。ふたたび';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    windowFlexSize();

    p.background(255);
    p.strokeWeight(5);

    let radius = 100;
    const centx = w / 2;
    const centy = h / 2;

    p.stroke(0, 30);
    p.noFill();
    p.ellipse(centx, centy, radius * 2, radius * 2);

    p.stroke(20, 50, 70);
    p.strokeWeight(1);

    let x, y;
    let noiseval = p.random(10);
    let radVariance, thisRadius, rad;

    p.beginShape();
    p.fill(20, 50, 70, 50);
    for (let ang = 0; ang <= 360; ang += 1) {
      noiseval += 0.1;
      radVariance = 30 * customNoise(noiseval);

      thisRadius = radius + radVariance;
      rad = p.radians(ang);
      x = centx + thisRadius * p.cos(rad);
      y = centy + thisRadius * p.sin(rad);

      p.curveVertex(x, y);
    }
    p.endShape();
  };

  function customNoise(value) {
    const retValeu = p.pow(p.sin(value), 3);
    return retValeu;
  }

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
