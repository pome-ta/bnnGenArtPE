// 2.4.3 for ループ

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);

    p.background(180);
    p.strokeWeight(4);
    p.strokeCap(p.SQUARE);

    for (let hy = 10; hy <= p.height - 15; hy += 10) {
      if (hy > 255) {
        break;
      }
      p.stroke(0, 255 - hy);
      p.line(10, hy, p.width - 20, hy);
      p.stroke(255, hy);
      p.line(10, hy + 4, p.width - 20, hy + 4);
    }
  };
};

new p5(sketch);
