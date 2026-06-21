// 4.1.4 自分のノイズを作る。ふたたび

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);

    p.background(255);
    p.strokeWeight(5);

    let radius = 100;
    const centx = p.width / 2;
    const centy = p.height / 2;

    p.stroke(0, 30);
    p.noFill();
    p.ellipse(centx, centy, radius * 2, radius * 2);

    p.stroke(20, 50, 70);
    p.strokeWeight(1);

    let x, y;
    let noiseval = p.random(10);
    let radVariance, thisRadius, rad;

    p.beginShape();
    p.fill(20, 50, 70, 50);
    for (let ang = 0; ang <= 360; ang += 1) {
      noiseval += 0.1;
      radVariance = 30 * customNoise(noiseval);

      thisRadius = radius + radVariance;
      rad = p.radians(ang);
      x = centx + thisRadius * p.cos(rad);
      y = centy + thisRadius * p.sin(rad);

      // p.curveVertex(x, y);
      p.splineVertex(x, y);
    }
    p.endShape();
  };

  function customNoise(value) {
    const count = Math.trunc(value % 12);
    const retValeu = p.pow(p.sin(value), count);
    return retValeu;
  }
};

new p5(sketch);
