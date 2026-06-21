const title = '5.3.3 球を描く間違った方法';

const sketch = (p) => {
  let radius = 100;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300, p.WEBGL);

    p.background(255);
    p.frameRate(24);
    p.stroke(0);
  };

  p.draw = () => {
    p.background(255);

    //p.translate(-p.width/2, -p.height/2, 0);
    p.rotateY(p.frameCount * 0.02);
    p.rotateX(p.frameCount * 0.01);

    let s = 0;
    let t = 0;
    let lastx = 0;
    let lasty = 0;
    let lastz = 0;

    while (t < 180) {
      s += 18;
      t += 1;
      let radianS = p.radians(s);
      let radianT = p.radians(t);

      const thisx = 0 + radius * p.cos(radianS) * p.sin(radianT);
      const thisy = 0 + radius * p.sin(radianS) * p.sin(radianT);
      const thisz = 0 + radius * p.cos(radianT);

      if (lastx !== 0) {
        p.line(thisx, thisy, thisz, lastx, lasty, lastz);
      }

      lastx = thisx;
      lasty = thisy;
      lastz = thisz;
    }
  };
};

new p5(sketch);
