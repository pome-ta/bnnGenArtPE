// 6.2.1 クラスとインスタンス
const sketch = (p) => {
  const _num = 10;

  class Circle {
    #x;
    #y;
    #radius;
    #linecol;
    #fillcol;
    #alph;

    constructor() {
      this.#x = p.random(p.width);
      this.#y = p.random(p.height);
      this.#radius = p.random(100) + 10;
      this.#linecol = p.color(p.random(255), p.random(255), p.random(255));
      this.#fillcol = p.color(p.random(255), p.random(255), p.random(255));
      this.#alph = p.random(255);
    }

    drawMe() {
      p.noStroke();
      p.fill(this.#fillcol, this.#alph);
      p.ellipse(this.#x, this.#y, this.#radius * 2, this.#radius * 2);
      p.stroke(this.#linecol, 150);
      p.noFill();
      p.ellipse(this.#x, this.#y, 10, 10);
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);

    p.background(255);
    p.strokeWeight(1);
    p.fill(150, 50);
    mouseReleased();

    cnvs?.mouseReleased(mouseReleased);
  };

  p.draw = () => {};

  function mouseReleased() {
    drawCircles();
  }

  function drawCircles() {
    for (let i = 0; i < _num; i++) {
      const thisCirc = new Circle();
      thisCirc.drawMe();
    }
  }
};

new p5(sketch);
