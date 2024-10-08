const title = '8.4.2 探求';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  let pentagon;
  const _maxlevels = 4;
  let _strutFactor = 0.2;
  let _strutNoise;

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
    #pointArr = Array(5);
    #rootBranch;

    constructor(startAngle) {
      const centX = w / 2;
      const centY = h / 2;
      let count = 0;
      const _400 = 400 * setupRatio;
      for (let i = 0; i < 360; i += 72) {
        const x = centX + _400 * p.cos(p.radians(startAngle + i));
        const y = centY + _400 * p.sin(p.radians(startAngle + i));
        this.#pointArr[count] = new PointObj(x, y);
        count++;
      }
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
        this.#myBranches = [...this.#myBranches, childBranch];
        for (let k = 0; k < this.#outerPoints.length; k++) {
          let nextk = k - 1;
          if (nextk < 0) {
            nextk += this.#outerPoints.length;
          }
          const newPoints = [
            this.#projPoints[k],
            this.#midPoints[k],
            this.#outerPoints[k],
            this.#midPoints[nextk],
            this.#projPoints[nextk],
          ];
          const childBranch = new Branch(this.#level + 1, k + 1, newPoints);
          this.#myBranches = [...this.#myBranches, childBranch];
          // this.#myBranches = this.#myBranches.concat(childBranch);
        }
      }
    }

    drawMe() {
      p.strokeWeight(5 * setupRatio - this.#level);
      // draw outer shape
      for (let i = 0; i < this.#outerPoints.length; i++) {
        let nexti = i + 1;
        if (nexti === this.#outerPoints.length) {
          nexti = 0;
        }
        p.line(
          this.#outerPoints[i].x,
          this.#outerPoints[i].y,
          this.#outerPoints[nexti].x,
          this.#outerPoints[nexti].y
        );

        for (let k = 0; k < this.#myBranches.length; k++) {
          this.#myBranches[k].drawMe();
        }
      }
      // p.strokeWeight(0.5);
      // p.fill(255, 150);
      // const _15 = 15 * setupRatio;
      // for (let j = 0; j < this.#midPoints.length; j++) {
      //   p.ellipse(this.#midPoints[j].x, this.#midPoints[j].y, _15, _15);
      //   p.line(
      //     this.#midPoints[j].x,
      //     this.#midPoints[j].y,
      //     this.#projPoints[j].x,
      //     this.#projPoints[j].y
      //   );
      //   p.ellipse(this.#projPoints[j].x, this.#projPoints[j].y, _15, _15);
      // }
    }

    calcMidPoints() {
      const mpArray = Array(this.#outerPoints.length);
      for (let i = 0; i < this.#outerPoints.length; i++) {
        let nexti = i + 1;
        if (nexti === this.#outerPoints.length) {
          nexti = 0;
        }
        const thisMP = this.calcMidPoint(
          this.#outerPoints[i],
          this.#outerPoints[nexti]
        );
        mpArray[i] = thisMP;
      }
      return mpArray;
    }

    calcMidPoint(end1, end2) {
      let mx, my;
      if (end1.x > end2.x) {
        mx = end2.x + (end1.x - end2.x) / 2;
      } else {
        mx = end1.x + (end2.x - end1.x) / 2;
      }
      if (end1.y > end2.y) {
        my = end2.y + (end1.y - end2.y) / 2;
      } else {
        my = end1.y + (end2.y - end1.y) / 2;
      }
      return new PointObj(mx, my);
    }

    calcStrutPoints() {
      const strutArray = Array(this.#midPoints.length);
      for (let i = 0; i < this.#midPoints.length; i++) {
        let nexti = i + 3;
        if (nexti >= this.#midPoints.length) {
          nexti -= this.#midPoints.length;
        }
        const thisSP = this.calcProjPoint(
          this.#midPoints[i],
          this.#outerPoints[nexti]
        );
        strutArray[i] = thisSP;
      }
      return strutArray;
    }

    calcProjPoint(mp, op) {
      let px, py;
      let adj, opp;
      if (op.x > mp.x) {
        opp = op.x - mp.x;
      } else {
        opp = mp.x - op.x;
      }

      if (op.y > mp.y) {
        adj = op.y - mp.y;
      } else {
        adj = mp.y - op.y;
      }

      if (op.x > mp.x) {
        px = mp.x + opp * _strutFactor;
      } else {
        px = mp.x - opp * _strutFactor;
      }

      if (op.y > mp.y) {
        py = mp.y + adj * _strutFactor;
      } else {
        py = mp.y - adj * _strutFactor;
      }
      return new PointObj(px, py);
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(1000, 1000);
    windowFlexSize();
    // _strutFactor *= setupRatio;
    _strutNoise = p.random(10);
  };

  p.draw = () => {
    // put drawing code here
    p.background(255);
    _strutNoise += 0.01;
    _strutFactor = p.noise(_strutNoise) * 3 - 1;

    pentagon = new FractalRoot(p.frameCount);
    pentagon.drawShape();
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
