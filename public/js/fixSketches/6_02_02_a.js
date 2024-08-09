const title = '6.2.2 ローカルな知識(衝突判定)';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

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
      this.x = p.random(w);
      this.y = p.random(h);
      this.radius = p.random(100 * setupRatio) + 10;
      this.#linecol = [p.random(255), p.random(255), p.random(255)];
      this.#fillcol = [p.random(255), p.random(255), p.random(255)];
      this.#alph = p.random(255);
      
      
      const _move = 3;

      this.#xmove = p.random(_move) - _move/2;
      this.#ymove = p.random(_move) - _move/2;
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

      this.x = this.x > w + this.radius ? 0 - this.radius : this.x;
      this.x = this.x < 0 - this.radius ? w + this.radius : this.x;

      this.y = this.y > h + this.radius ? 0 - this.radius : this.y;
      this.y = this.y < 0 - this.radius ? h + this.radius : this.y;
      
      let touching = false;
      
      for (let i = 0; i < _circleArr.length; i++) {
        const otherCirc = _circleArr[i];
        if (otherCirc !== this) {
          const dis = p.dist(this.x, this.y, otherCirc.x, otherCirc.y);
          
          if ((dis - this.radius - otherCirc.radius) < 0) {
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
      _circleArr = [..._circleArr, thisCirc]; //.filter((c) => c);
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
