// 6.2.1 クラスとインスタンス

const sketch = (p) => {
  const _num = 10;

  p.setup = () => {
    // put setup code here
    const cnvs = p.createCanvas(500, 300);

    p.background(255);
    p.strokeWeight(1);
    p.fill(150, 50);
    mouseReleased();

    cnvs?.mouseReleased(mouseReleased);
  };

  p.draw = () => {};

  function mouseReleased() {
    drawCircles();
  }

  function drawCircles() {
    for (let i = 0; i < _num; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const radius = p.random(100) + 10;
      p.noStroke();
      p.ellipse(x, y, radius * 2, radius * 2);
      p.stroke(0, 150);
      p.ellipse(x, y, 10, 10);
    }
  }
};

new p5(sketch);
