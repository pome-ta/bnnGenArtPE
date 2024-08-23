const title = 'Perlin noise';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  const div = 64;
  const mul = 0.1;
  const amp = 100;

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(720, 720);
    windowFlexSize();

    //p.background(211); // lightgray
    p.colorMode(p.HSB, 1.0, 1.0, 1.0, 1.0);
    p.background(0, 0, 211 / 255);
    //p.noFill();
    p.noStroke();
    //p.noLoop();
  };

  p.draw = () => {
    // put drawing code here

    const cx = w / 2;
    const cy = h / 2;

    const step = w / div;
    const size = step / 1;

    const s = p.millis() / 1000;

    for (let _y = 0; _y <= div; _y++) {
      for (let _x = 0; _x <= div; _x++) {
        const x = _x * step;
        const y = _y * step;

        //const hNoise = p.noise((_x + s) * mul, (_y + s) * mul, s * mul);
        //const hNoise = p.noise(_x * mul, _y * mul, s * mul);
        const hNoise = p.noise((_x + s) * mul, (_y + s) * mul, s * mul);

        //p.fill(hNoise);
        //p.fill(hNoise, 1, 1);
        p.ellipse(x, y, size * hNoise, size * hNoise);
      }
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
  //p5.disableFriendlyErrors = true;
});

