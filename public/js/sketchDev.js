const title = '8.2.1 幹と枝';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  let _numChildren = 3;
  let _maxLevels = 3;
  let _trunk;

  class Branch {
    #level;
    #index;
    #x;
    #y;
    #endx;
    #endy;

    constructor(lev, ind, ex, why) {
      this.#level = lev;
      this.#index = ind;
      this.updateMe(ex, why);
    }

    updateMe(ex, why) {
      this.#x = ex;
      this.#y = why;
      this.#endx = this.#x + 150 * setupRatio;
      this.#endy = this.#y + 15 * setupRatio;
    }

    drawMe() {
      p.line(this.#x, this.#y, this.#endx, this.#endy);
      p.ellipse(this.#x, this.#y, 5 * setupRatio, 5 * setupRatio);
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(750, 500);
    windowFlexSize();

    p.background(255);
    p.noFill();
    newTree();
  };

  p.draw = () => {
    // put drawing code here
  };

  function newTree() {
    _trunk = new Branch(1, 0, w / 2, 50 * setupRatio);
    _trunk.drawMe();
  }


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
