// 3.1 デタラメさとそうでもないこと

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 100);

    p.background(255);
    p.strokeWeight(5);

    p.stroke(0, 30);
    p.line(20, p.height / 2, p.width - 20, p.height / 2);

    p.stroke(20, 50, 70);
    const randx = p.random(p.width);
    const randy = p.random(p.height);
    p.line(20, p.height / 2, randx, randy);
  };
};

new p5(sketch);
