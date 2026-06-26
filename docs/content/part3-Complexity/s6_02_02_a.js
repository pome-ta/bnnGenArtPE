// 6.2.2 ローカルな知識（衝突判定）

const sketch = (p) => {
  const _num = 10;
  let _circleArr = [];

  class Circle {
    x;
    y;
    radius;
    #linecol;
    #fillcol;
    #alph;
    #xmove;
    #ymove;

    constructor() {
      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.radius = p.random(100) + 10;
      this.#linecol = [p.random(255), p.random(255), p.random(255)];
      this.#fillcol = [p.random(255), p.random(255), p.random(255)];
      this.#alph = p.random(255);

      const _move = 3;

      this.#xmove = p.random(_move) - _move / 2;
      this.#ymove = p.random(_move) - _move / 2;
    }

    drawMe() {
      p.noStroke();
      p.fill(...this.#fillcol, this.#alph);
      p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
      p.stroke(...this.#linecol, 150);
      p.noFill();
      p.ellipse(this.x, this.y, 10, 10);
    }

    updateMe() {
      this.x += this.#xmove;
      this.y += this.#ymove;

      this.x = this.x > p.width + this.radius ? 0 - this.radius : this.x;
      this.x = this.x < 0 - this.radius ? p.width + this.radius : this.x;

      this.y = this.y > p.height + this.radius ? 0 - this.radius : this.y;
      this.y = this.y < 0 - this.radius ? p.height + this.radius : this.y;

      let touching = false;

      for (let i = 0; i < _circleArr.length; i++) {
        const otherCirc = _circleArr[i];
        if (otherCirc !== this) {
          const dis = p.dist(this.x, this.y, otherCirc.x, otherCirc.y);

          if (dis - this.radius - otherCirc.radius < 0) {
            touching = true;
            break;
          }
        }
      }

      if (touching) {
        this.#alph = this.#alph > 0 ? this.#alph - 1 : this.#alph;
      } else {
        this.#alph = this.#alph < 255 ? this.#alph + 2 : this.#alph;
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
