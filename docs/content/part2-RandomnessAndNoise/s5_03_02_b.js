const title = '5.3.2 3次元ノイズ';

const sketch = (p) => {
  let xstart, ystart, zstart, xnoise, ynoise, znoise;
  let sideLength = 200;
  const spacing = 5;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);

    p.background(0);
    p.frameRate(24);
    p.noStroke();

    xstart = p.random(10);
    ystart = p.random(10);
    zstart = p.random(10);

    sideLength *= setupRatio;
  };

  p.draw = () => {
    p.background(0);

    xstart += 0.01;
    ystart += 0.01;
    zstart += 0.01;

    xnoise = xstart;
    ynoise = ystart;
    znoise = zstart;

    p.translate(p.width / 2 / 2, p.height / 2 / 2, -p.width / 2);
    p.rotateZ(p.frameCount * 0.1);
    p.rotateY(p.frameCount * 0.1);

    for (let z = 0; z <= sideLength; z += spacing) {
      znoise += 0.1;
      ynoise = ystart;

      for (let y = 0; y <= sideLength; y += spacing) {
        ynoise += 0.1;
        xnoise = xstart;
        for (let x = 0; x <= sideLength; x += spacing) {
          xnoise += 0.1;
          drawPoint(x, y, z, p.noise(xnoise, ynoise, znoise));
        }
      }
    }
  };

  function drawPoint(x, y, z, noiseFactor) {
    p.push();
    p.translate(-x, -y, z);
    //p.translate(p.height / 2, 20, -p.width / 2);
    const grey = noiseFactor * 255;

    p.fill(grey, 10);
    p.box(spacing, spacing, spacing);
    p.pop();
  }
};

new p5(sketch);
