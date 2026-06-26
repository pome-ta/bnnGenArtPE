// 8.2.1 幹と枝

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

    constructor(lev, ind, ex, why) {
      this.#level = lev;
      this.#index = ind;
      this.updateMe(ex, why);
    }

    updateMe(ex, why) {
      this.#x = ex;
      this.#y = why;
      this.#endx = this.#x + 150;
      this.#endy = this.#y + 15;
    }

    drawMe() {
      p.line(this.#x, this.#y, this.#endx, this.#endy);
      p.ellipse(this.#x, this.#y, 5, 5);
    }
  }

  p.setup = () => {
    // put setup code here
    p.createCanvas(750, 500);

    p.background(255);
    p.noFill();
    newTree();
  };

  p.draw = () => {
    // put drawing code here
  };

  function newTree() {
    _trunk = new Branch(1, 0, p.width / 2, 50);
    _trunk.drawMe();
  }
};

new p5(sketch);
