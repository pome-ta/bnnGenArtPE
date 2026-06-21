const title = '5.1.1 ノイズグリッドを作る';

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(300, 300);

    p.background(255);
    const xstart = p.random(10);
    let xnoise = xstart;
    let ynoise = p.random(10);

    for (let y = 0; y <= p.height; y++) {
      ynoise += 0.01;
      xnoise = xstart;
      for (let x = 0; x <= p.width; x++) {
        xnoise += 0.01;
        const alph = Math.trunc(p.noise(xnoise, ynoise) * 255);
        p.stroke(0, alph);
        p.line(x, y, x + 1, y + 1);
      }
    }
  };
};

new p5(sketch);
