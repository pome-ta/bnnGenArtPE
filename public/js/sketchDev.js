import './p5Setup.js';

let myp5;

const sketch = (p) => {
  let cnvs, w, h;

  p.setup = () => {
    // put setup code here
    windowSizeUpDate();
  };

  p.draw = () => {
    // put drawing code here
    p.background(220);
  };

  p.windowResized = () => {
    windowSizeUpDate();
  };

  function windowSizeUpDate() {
    const sizeRatio = 0.92;
    w = p.windowWidth * sizeRatio;
    h = p.windowHeight * sizeRatio;
    if (!cnvs) {
      cnvs = p.createCanvas(w, h);
    }

    p.resizeCanvas(w, h);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const canvasId = 'p5Canvas';
  const canvasTag = document.querySelector(`#${canvasId}`);

  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), {
    passive: false,
  });

  // --- start
  myp5 = new p5(sketch, canvasId);
});
