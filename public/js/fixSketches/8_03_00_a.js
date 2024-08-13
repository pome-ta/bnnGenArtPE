const title = '8.3 指数的成長';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  let _numChildren = 6;
  let _maxLevels = 6;
  let _trunk;

  class Branch {
    #level;
    #index;
    #x;
    #y;
    #endx;
    #endy;

    #strokeW;
    #alph;
    #len;
    #lenChange;
    #rot;
    #rotChange;

    #children = [];

    constructor(lev, ind, ex, why) {
      this.#level = lev;
      this.#index = ind;

      this.#strokeW = (1 / this.#level) * (10 * setupRatio);
      this.#alph = 255 / this.#level;
      this.#len = (1 / this.#level) * p.random(500 * setupRatio);
      this.#rot = p.random(360);
      const change = 5 * setupRatio;
      this.#lenChange = p.random(10) - change;
      this.#rotChange = p.random(10) - change;

      this.updateMe(ex, why);

      if (this.#level < _maxLevels) {
        this.#children = Array(_numChildren);
        for (let x = 0; x < _numChildren; x++) {
          this.#children[x] = new Branch(
            this.#level + 1,
            x,
            this.#endx,
            this.#endy
          );
        }
      }
    }

    updateMe(ex, why) {
      this.#x = ex;
      this.#y = why;

      this.#rot += this.#rotChange;
      if (this.#rot > 360) {
        this.#rot = 0;
      } else if (this.#rot < 0) {
        this.#rot = 360;
      }

      this.#len -= this.#lenChange;
      if (this.#len < 0) {
        this.#lenChange *= -1;
      } else if (this.#len > 500 * setupRatio) {
        this.#lenChange *= -1;
      }

      const radian = p.radians(this.#rot);

      this.#endx = this.#x + this.#len * p.cos(radian);
      this.#endy = this.#y + this.#len * p.sin(radian);

      for (let i = 0; i < this.#children.length; i++) {
        this.#children[i].updateMe(this.#endx, this.#endy);
      }
    }

    drawMe() {
      if (this.#level > 1) {
        p.strokeWeight(this.#strokeW);
        p.stroke(0, this.#alph);
        p.fill(255, this.#alph);
        p.line(this.#x, this.#y, this.#endx, this.#endy);
        p.ellipse(this.#x, this.#y, this.#len / 12, this.#len / 12);
      }
      for (let i = 0; i < this.#children.length; i++) {
        this.#children[i].drawMe();
      }
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
    p.background(255);
    _trunk.updateMe(w / 2, h / 2);
    _trunk.drawMe();
  };

  function newTree() {
    _trunk = new Branch(1, 0, w / 2, h / 2);
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
