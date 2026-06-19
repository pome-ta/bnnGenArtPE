const title = '5.2 ノイズ・アニメーション';

const sketch = (p) => {
  let xstart, xnoise, ystart, ynoise;

  p.setup = () => {
    // put setup code here
    p.createCanvas(300, 300);

    p.background(0);
    p.frameRate(24);

    xstart = p.random(10);
    ystart = p.random(10);
  };
  p.draw = () => {
    p.background(0);

    xstart += 0.01;
    ystart += 0.01;

    xnoise = xstart;
    ynoise = ystart;

    for (let y = 0; y <= h; y += 5) {
      ynoise += 0.1;
      xnoise = xstart;
      for (let x = 0; x <= w; x += 5) {
        xnoise += 0.1;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }
  };

  function drawPoint(x, y, noiseFactor) {
    p.push();
    p.translate(x, y);
    p.rotate(noiseFactor * p.radians(540));
    p.noStroke();
    const edgeSize = noiseFactor * 35;
    const grey = 150 + noiseFactor * 120;
    const alph = 150 + noiseFactor * 120;
    p.fill(grey, alph);
    p.ellipse(0, 0, edgeSize, edgeSize / 2);
    p.pop();
  }
};

new p5(sketch);
