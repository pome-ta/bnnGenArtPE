const title = 'performance | 8.4.1 組み立て';

let startTime = performance.now();

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  let pentagon;
  const _maxlevels = 6;
  const _corner = 9;
  let _strutFactor = 0.48;

  class PointObj {
    #x;
    #y;

    constructor(ex, why) {
      this.#x = ex;
      this.#y = why;
    }

    get x() {
      return this.#x;
    }

    get y() {
      return this.#y;
    }
  }

  class FractalRoot {
    #pointArr = [];
    #rootBranch;

    constructor() {
      const centX = w / 2;
      const centY = h / 2;
      const _400 = 480 * setupRatio;

      const step = _corner > 1 ? 360 / _corner : 1;
      this.#pointArr = [...Array(_corner).keys()].map((i) => {
        const ang = i * step;
        const x = centX + _400 * Math.cos(p.radians(ang));
        const y = centY + _400 * Math.sin(p.radians(ang));
        return new PointObj(x, y);
      });

      this.#rootBranch = new Branch(0, 0, this.#pointArr);
    }

    drawShape() {
      this.#rootBranch.drawMe();
    }
  }

  class Branch {
    #level;
    #num;
    #outerPoints = [];
    #midPoints = [];
    #projPoints = [];
    #myBranches = [];

    constructor(lev, n, points) {
      this.#level = lev;
      this.#num = n;
      this.#outerPoints = points;

      this.#midPoints = this.calcMidPoints();
      this.#projPoints = this.calcStrutPoints();

      if (this.#level + 1 < _maxlevels) {
        const childBranch = new Branch(this.#level + 1, 0, this.#projPoints);

        const length = this.#outerPoints.length;

        const lowerBranches = [...Array(length).keys()].map((k) => {
          let nextk = k - 1;
          nextk += nextk < 0 ? length : 0;
          const newPoints = [
            this.#projPoints[k],
            this.#midPoints[k],
            this.#outerPoints[k],
            this.#midPoints[nextk],
            this.#projPoints[nextk],
          ];
          return new Branch(this.#level + 1, k + 1, newPoints);
        });

        this.#myBranches = [childBranch, ...lowerBranches];
      }
    }

    drawMe() {
      p.strokeWeight((5 * setupRatio - this.#level) * 0.4);
      p.stroke(60, 128);
      // draw outer shape
      const length = this.#outerPoints.length;
      for (let i = 0; i < length; i++) {
        const nexti = i + 1 === length ? 0 : i + 1;
        p.line(
          this.#outerPoints[i].x,
          this.#outerPoints[i].y,
          this.#outerPoints[nexti].x,
          this.#outerPoints[nexti].y
        );
      }

      for (let k = 0; k < this.#myBranches.length; k++) {
        this.#myBranches[k].drawMe();
      }
    }

    calcMidPoints() {
      const length = this.#outerPoints.length;
      return [...Array(length).keys()].map((i) => {
        const nexti = i + 1 === length ? 0 : i + 1;
        return this.calcMidPoint(
          this.#outerPoints[i],
          this.#outerPoints[nexti]
        );
      });
    }

    calcMidPoint(end1, end2) {
      const mx =
        end1.x > end2.x
          ? end2.x + (end1.x - end2.x) / 2
          : end1.x + (end2.x - end1.x) / 2;
      const my =
        end1.y > end2.y
          ? end2.y + (end1.y - end2.y) / 2
          : end1.y + (end2.y - end1.y) / 2;

      return new PointObj(mx, my);
    }

    calcStrutPoints() {
      const length = this.#midPoints.length;
      return [...Array(length).keys()].map((i) => {
        const nexti = i + 3 >= length ? i + 3 - length : i + 3;
        return this.calcProjPoint(this.#midPoints[i], this.#outerPoints[nexti]);
      });
    }

    calcProjPoint(mp, op) {
      const opp = op.x > mp.x ? op.x - mp.x : mp.x - op.x;
      const adj = op.y > mp.y ? op.y - mp.y : mp.y - op.y;
      const px =
        op.x > mp.x ? mp.x + opp * _strutFactor : mp.x - opp * _strutFactor;
      const py =
        op.y > mp.y ? mp.y + adj * _strutFactor : mp.y - adj * _strutFactor;

      return new PointObj(px, py);
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(1000, 1000);
    windowFlexSize();
    //_strutFactor *= setupRatio;

    p.background(211); // lightgray

    pentagon = new FractalRoot();
    pentagon.drawShape();
    p.noLoop();

    const endTime = performance.now();
    console.log(endTime - startTime);
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
  p5.disableFriendlyErrors = true;
});
