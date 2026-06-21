// 5.2 ノイズ・アニメーション

const sketch = (p) => {
  let xstart, xnoise, ystart, ynoise;
  let xstartNoise, ystartNoise;

  p.setup = () => {
    // put setup code here
    p.createCanvas(300, 300);

    p.background(255);
    p.frameRate(24);

    xstartNoise = p.random(20);
    ystartNoise = p.random(20);
    xstart = p.random(10);
    ystart = p.random(10);
  };
  p.draw = () => {
    p.background(255);

    xstartNoise += 0.01;
    ystartNoise += 0.01;
    xstart += p.noise(xstartNoise) * 0.5 - 0.25;
    ystart += p.noise(ystartNoise) * 0.5 - 0.25;

    xnoise = xstart;
    ynoise = ystart;

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
    p.push();
    p.translate(x, y);
    p.rotate(noiseFactor * p.radians(360));
    p.stroke(0, 150);
    p.line(0, 0, 20, 0);

    p.pop();
  }
};

new p5(sketch);
