// 2.2.1 関数、パラメータ、色値

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    p.background(230, 230, 230);
    p.stroke(130, 0, 0);
    p.strokeWeight(4);
    p.line(p.width / 2 - 70, p.height / 2 - 70, p.width / 2 + 70, p.height / 2 + 70);
    p.line(p.width / 2 + 70, p.height / 2 - 70, p.width / 2 - 70, p.height / 2 + 70);
    p.fill(255, 150);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);
  };
};

new p5(sketch);
