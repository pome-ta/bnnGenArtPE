const title = '7.1.1 枠組みをセットアップ';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  let _cellArray = [];
  let _cellSize = 10;
  let _numX, _numY;
  
  class Cell {
    #x;
    #y;
    #state;
    #nextState;
    #neighbours = [];
    constructor(ex, why) {
      this.#x = ex * _cellSize;
      this.#y = why * _cellSize;
    }
  }

  
  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);
    windowFlexSize();
    
    _cellSize *= setupRatio;
    
    _numX = p.floor(w / _cellSize);
    _numY = p.floor(h / _cellSize);
    restart();


    
  };

  p.draw = () => {
    p.background(200);
    
  };

  function restart() {
    
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
