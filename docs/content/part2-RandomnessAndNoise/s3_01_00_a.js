// 3.1 デタラメさとそうでもないこと

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 100);

    p.background(255);
    p.strokeWeight(5);

    p.stroke(20, 50, 70);
    p.line(20, 50, 480, 50);
  };
};

new p5(sketch);
