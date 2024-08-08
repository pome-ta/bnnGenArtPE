const title = '6.2.1 クラスとインスタンス';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

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
      this.#x = p.random(w);
      this.#y = p.random(h);
      this.#radius = p.random(100) + 10;
      this.#linecol = p.color(p.random(255), p.random(255), p.random(255));
      this.#fillcol = p.color(p.random(255), p.random(255), p.random(255));
      this.#alph = p.random(255);
      this.#xmove = p.random(10) - 5;
      this.#ymove = p.random(10) - 5;
    }

    drawMe() {
      p.noStroke();
      p.fill(this.#fillcol, this.#alph);
      p.ellipse(this.#x, this.#y, this.#radius * 2, this.#radius * 2);
      p.stroke(this.#linecol, 150);
      p.noFill();
      p.ellipse(this.#x, this.#y, 10, 10);
    }

    updateMe() {
      this.#x += this.#xmove;
      this.#y += this.#ymove;

      if (this.#x > w + this.#radius) {
        this.#x = 0 - this.#radius;
      }
      if (this.#x < 0 - this.#radius) {
        this.#x = w + this.#radius;
      }
      if (this.#y > h + this.#radius) {
        this.#y = 0 - this.#radius;
      }
      if (this.#y < 0 - this.#radius) {
        this.#y = h + this.#radius;
      }

      this.drawMe();
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);
    windowFlexSize();

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
      _circleArr = [..._circleArr, thisCirc];//.filter((c) => c);
    }
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
