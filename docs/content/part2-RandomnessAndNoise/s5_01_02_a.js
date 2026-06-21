const title = '5.1.2 ノイズの視覚化';

const sketch = (p) => {
  let xstart, xnoise, ynoise;

  p.setup = () => {
    // put setup code here
    p.createCanvas(300, 300);

    p.background(255);
    xstart = p.random(10);
    xnoise = xstart;
    ynoise = p.random(10);

    for (let y = 0; y <= p.height; y += 5) {
      ynoise += 0.1;
      xnoise = xstart;
      for (let x = 0; x <= p.width; x += 5) {
        xnoise += 0.1;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }
  };

  function drawPoint(x, y, noiseFactor) {
    const len = 10 * noiseFactor;
    p.rect(x, y, len, len);
  }
};

new p5(sketch);
