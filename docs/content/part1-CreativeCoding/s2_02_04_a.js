// 2.2.4 塗りつぶし、アルファ値、描画の順序

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    p.background(230, 230, 230);

    const centX = p.width / 2;
    const centY = p.height / 2;
    p.stroke(130, 0, 0);
    p.strokeWeight(4);

    p.line(centX - 70, centY - 70, centX + 70, centY + 70);
    p.line(centX + 70, centY - 70, centX - 70, centY + 70);

    p.stroke(0, 125);
    p.strokeWeight(6);
    p.fill(255, 150);
    p.ellipse(centX, centY, 50, 50);
  };
};

new p5(sketch);
