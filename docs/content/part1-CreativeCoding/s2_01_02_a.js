// 2.1.2 ハロー・ワールド

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.noSmooth();
    p.ellipse(25, 25, 50, 50);
  };
};

new p5(sketch);
