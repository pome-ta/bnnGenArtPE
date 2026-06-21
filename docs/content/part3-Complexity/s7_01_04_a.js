const title = '7.1.4 ブライアンの脳';

const sketch = (p) => {
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

      //this.#nextState = p.round(p.random(2));
      this.#nextState = p.floor(p.random(2));
      this.state = this.#nextState;
      this.#neighbours = [];
    }

    addNeighbour(cell) {
      this.#neighbours = [...this.#neighbours, cell];
    }

    calcNextState() {
      if (this.state === 0) {
        let firingCount = 0;
        for (let i = 0; i < this.#neighbours.length; i++) {
          if (this.#neighbours[i].state === 1) {
            firingCount += 1;
          }
        }
        if (firingCount === 2) {
          this.#nextState = 1;
        } else {
          this.#nextState = this.state;
        }
      } else if (this.state === 1) {
        this.#nextState = 2;
      } else if (this.state === 2) {
        this.#nextState = 0;
      }
    }

    drawMe() {
      this.state = this.#nextState;
      p.stroke(0);
      if (this.state === 1) {
        p.fill(0);
      } else if (this.state === 2) {
        p.fill(150);
      } else {
        p.fill(255);
      }

      //p.fill(this.state ? 0 : 255);
      p.ellipse(this.#x, this.#y, _cellSize, _cellSize);
    }
  }

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);

    p.frameRate(12);

    // _cellSize *= setupRatio;

    _numX = p.floor(p.width / _cellSize);
    _numY = p.floor(p.height / _cellSize);
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
    _cellArray = Array(_numX)
      .fill()
      .map((_) => [...Array(_numY)]);

    for (let x = 0; x < _numX; x++) {
      for (let y = 0; y < _numY; y++) {
        const newCell = new Cell(x, y);
        _cellArray[x][y] = newCell;
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
};

new p5(sketch);
