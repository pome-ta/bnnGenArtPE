// リスト i.1 24行のコードによるジェネラティブ・システム

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(2000, 2000, p.WEBGL);
    p.background(150);
    p.stroke(0, 50);
    p.fill(255, 200);

    let xstart = p.random(10);
    let ynoise = p.random(10);

    for (let y = -(p.height / 8); y <= p.height / 8; y += 3) {
      ynoise += 0.02;
      let xnoise = xstart;
      for (let x = -(p.width / 8); x <= p.width / 8; x += 3) {
        xnoise += 0.02;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }
  };

  p.draw = () => {
    // put drawing code here
  };

  const drawPoint = (x, y, noiseFactor) => {
    p.push();
    p.translate(x * noiseFactor * 4, y * noiseFactor * 4, -y);
    let edgeSize = noiseFactor * 26;
    p.ellipse(0, 0, edgeSize, edgeSize);
    p.pop();
  };
};

new p5(sketch);
