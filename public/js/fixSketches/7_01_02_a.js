const title = '7.1.2 ゲーム・オブ・ライフ';

const sketch = (p) => {
  let w, h;
  let setupWidth, setupHeight, setupRatio;

  let _cellArray = [];
  let _cellSize = 10;
  let _numX, _numY;
  
  class Cell {
    #x;
    #y;
    state;
    #nextState;
    #neighbours = [];
    
    constructor(ex, why) {
      this.#x = ex * _cellSize;
      this.#y = why * _cellSize;
      
      this.#nextState = p.random(2) > 1 ? true : false;
      this.state = this.#nextState;
      this.#neighbours = [];
    }
    
    addNeighbour(cell) {
      this.#neighbours = [...this.#neighbours, cell];
    }
    
    calcNextState() {
      let liveCount = 0;
      
      for (let i = 0; i < this.#neighbours.length; i++) {
        liveCount += this.#neighbours[i].state ? 1 : 0;
      }
      
      if (this.state) {
        this.#nextState = (liveCount === 2) || (liveCount === 3) ? true : false;
      } else {
        this.#nextState = liveCount === 3 ? true : false;
      }
    }
    
    drawMe() {
      this.state = this.#nextState;
      p.stroke(0);
      p.fill(this.state ? 0 : 255);
      p.ellipse(this.#x, this.#y, _cellSize, _cellSize)
    }
  }

  
  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);
    windowFlexSize();
    //p.frameRate(12);
    
    _cellSize *= setupRatio;
    
    _numX = p.floor(w / _cellSize);
    _numY = p.floor(h / _cellSize);
    restart();
    
    cnvs.mouseReleased(mouseReleased);
    
  };

  p.draw = () => {
    p.background(200);
    for (let x = 0; x < _numX; x++) {
      for (let y = 0; y < _numY; y++) {
        _cellArray[x][y].calcNextState();
      }
    }
    
    p.translate(_cellSize / 2, _cellSize / 2);
    
    for (let x = 0; x < _numX; x++) {
      for (let y = 0; y < _numY; y++) {
        _cellArray[x][y].drawMe();
      }
    }
    
  };
  
  

  function restart() {
    _cellArray = Array(_numX).fill().map((_) => [...Array(_numY)]);
    
    for (let x = 0; x < _numX; x++) {
      for (let y = 0; y < _numY; y++) {
        const newCell = new Cell(x, y);
        _cellArray[x][y] = newCell
      }
    }
    for (let x = 0; x < _numX; x++) {
      for (let y = 0; y < _numY; y++) {
        let above = y - 1;
        let below = y + 1;
        let left = x - 1;
        let right = x + 1;
        
        above = above < 0 ? _numY - 1 : above;
        below = below === _numY ? 0 : below;
        left = left < 0 ? _numX - 1 : left;
        right = right === _numX ? 0 : right;
        
        _cellArray[x][y].addNeighbour(_cellArray[left][above]);
        _cellArray[x][y].addNeighbour(_cellArray[left][y]);
        _cellArray[x][y].addNeighbour(_cellArray[left][below]);
        _cellArray[x][y].addNeighbour(_cellArray[x][below]);
        _cellArray[x][y].addNeighbour(_cellArray[right][below]);
        _cellArray[x][y].addNeighbour(_cellArray[right][y]);
        _cellArray[x][y].addNeighbour(_cellArray[right][above]);
        _cellArray[x][y].addNeighbour(_cellArray[x][above]);
      }
    }
    
  }
  
  function mouseReleased() {
    restart();
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
