// 5.3.1 3次元空間で描く

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(500, 300, p.WEBGL);
    //p.sphereDetail(40);
  };

  p.draw = () => {
    p.background(255);

    // Processingの translate(width/2, height/2, 0) は不要
    p.sphere(100);
  };
};

new p5(sketch);
