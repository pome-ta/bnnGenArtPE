// 6.2.1 クラスとインスタンス

const sketch = (p) => {
  const _num = 10;
  let _circleArr = [];

  class Circle {
    #x;
    #y;
    #radius;
    #linecol;
    #fillcol;
    #alph;
    #xmove;
    #ymove;

    constructor() {
      this.#x = p.random(p.width);
      this.#y = p.random(p.height);
      this.#radius = p.random(100) + 10;
      this.#linecol = p.color(p.random(255), p.random(255), p.random(255));
      this.#fillcol = p.color(p.random(255), p.random(255), p.random(255));
      this.#alph = p.random(255);
      this.#xmove = p.random(10) - 5;
      this.#ymove = p.random(10) - 5;
    }

    drawMe() {
      p.noStroke();
      p.fill(
        p.red(this.#fillcol),
        p.green(this.#fillcol),
        p.blue(this.#fillcol),
        this.#alph,
      );
      p.ellipse(this.#x, this.#y, this.#radius * 2, this.#radius * 2);
      p.stroke(
        p.red(this.#fillcol),
        p.green(this.#fillcol),
        p.blue(this.#fillcol),
        150,
      );
      p.noFill();
      p.ellipse(this.#x, this.#y, 10, 10);
    }

    updateMe() {
      this.#x += this.#xmove;
      this.#y += this.#ymove;

      if (this.#x > p.width + this.#radius) {
        this.#x = 0 - this.#radius;
      }
      if (this.#x < 0 - this.#radius) {
        this.#x = p.width + this.#radius;
      }
      if (this.#y > p.height + this.#radius) {
        this.#y = 0 - this.#radius;
      }
      if (this.#y < 0 - this.#radius) {
        this.#y = p.height + this.#radius;
      }

      this.drawMe();
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);

    p.background(255);
    p.strokeWeight(1);
    p.fill(150, 50);

    cnvs.mouseReleased(mouseReleased);
    drawCircles();
  };

  p.draw = () => {
    p.background(255);
    for (let i = 0; i < _circleArr.length; i++) {
      const thisCirc = _circleArr[i];
      thisCirc.updateMe();
    }
  };

  function mouseReleased() {
    drawCircles();
  }

  function drawCircles() {
    for (let i = 0; i < _num; i++) {
      const thisCirc = new Circle();
      thisCirc.drawMe();
      _circleArr = [..._circleArr, thisCirc]; //.filter((c) => c);
    }
  }
};

new p5(sketch);
