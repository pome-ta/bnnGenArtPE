const title = '8.2.1 幹と枝';

const sketch = (p) => {
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
    #children = [];

    constructor(lev, ind, ex, why) {
      this.#level = lev;
      this.#index = ind;
      this.updateMe(ex, why);

      if (this.#level < _maxLevels) {
        this.#children = Array(_numChildren);
        for (let x = 0; x < _numChildren; x++) {
          this.#children[x] = new Branch(
            this.#level + 1,
            x,
            this.#endx,
            this.#endy,
          );
        }
      }
    }

    updateMe(ex, why) {
      this.#x = ex;
      this.#y = why;

      this.#endx = this.#x + this.#level * (p.random(100) - 50 * setupRatio);
      this.#endy = this.#y + 50 * setupRatio + this.#level * p.random(50);
    }

    drawMe() {
      p.strokeWeight(_maxLevels - this.#level + 1);
      p.line(this.#x, this.#y, this.#endx, this.#endy);
      p.ellipse(this.#x, this.#y, 5 * setupRatio, 5 * setupRatio);
      for (let i = 0; i < this.#children.length; i++) {
        this.#children[i].drawMe();
      }
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(750, 500);

    p.background(255);
    p.noFill();
    newTree();
  };

  p.draw = () => {
    // put drawing code here
  };

  function newTree() {
    _trunk = new Branch(1, 0, p.width / 2, 50 * setupRatio);
    _trunk.drawMe();
  }
};

new p5(sketch);
