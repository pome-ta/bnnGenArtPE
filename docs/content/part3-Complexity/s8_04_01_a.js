const title = '8.4.1 組み立て';

const sketch = (p) => {
  let pentagon;
  const _maxlevels = 5;

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

    constructor() {
      const centX = p.width / 2;
      const centY = p.height / 2;
      let count = 0;
      const _400 = 400 * setupRatio;
      for (let i = 0; i < 360; i += 72) {
        const x = centX + _400 * p.cos(p.radians(i));
        const y = centY + _400 * p.sin(p.radians(i));
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

    constructor(lev, n, points) {
      this.#level = lev;
      this.#num = n;
      this.#outerPoints = points;
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
          this.#outerPoints[nexti].y,
        );
      }
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(1000, 1000);

    pentagon = new FractalRoot();
    pentagon.drawShape();
  };

  p.draw = () => {
    // put drawing code here
  };
};

new p5(sketch);
