const title = 'Perlin noise';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  const div = 64;
  const mul = 0.05;
  const amp = 100;

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(720, 720);
    windowFlexSize();

    // p.background(211); // lightgray
    //p.colorMode(p.HSB, 360.0, 100.0, 100.0, 100.0);

    const cx = w / 2;
    const cy = h / 2;
    p.push();
    p.stroke(128, 60);
    p.line(0, cy, w, cy);
    p.pop();

    p.noFill();

    const step = w / div;
    p.beginShape();
    for (let i = 0; i <= div; i++) {
      const x = i * step;
      const noisey = (p.noise(i * mul) - 0.5) * amp;
      //const y = p.noise(i * mul) * h;
      const y = cy + noisey;
      //p.ellipse(x, cy + noisey, 2, 2);
      p.vertex(x, y);
      p.ellipse(x, y, 2, 2);
    }
    p.endShape();

    p.noLoop();
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
  //p5.disableFriendlyErrors = true;
});
