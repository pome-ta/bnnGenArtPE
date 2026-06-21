// 5.3.2 3次元ノイズ

const sketch = (p) => {
  let xstart, xnoise, ystart, ynoise;
  const sphereDetail = 8; // xxx: `sphereDetail`

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);

    p.background(0);
    p.frameRate(24);
    p.noStroke();

    xstart = p.random(10);
    ystart = p.random(10);
  };

  p.draw = () => {
    p.background(0);

    xstart += 0.01;
    ystart += 0.01;

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

    p.translate(x - p.width / 2, p.width / 2 - y - p.height / 2, -y * 4);
    const sphereSize = noiseFactor * 35;
    const grey = p.height / 2 + noiseFactor * 120;
    const alph = p.height / 2 + noiseFactor * 120;
    p.fill(grey, alph);
    p.sphere(sphereSize, sphereDetail, sphereDetail);

    p.pop();
  }
};

new p5(sketch);
