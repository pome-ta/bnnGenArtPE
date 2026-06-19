// 2.4.2 痕跡を残す

const sketch = (p) => {
  let diam = 10;
  let centX, centY;

  p.setup = () => {
    // put setup code here
    p.createCanvas(500, 300);
    p.frameRate(24);
    p.background(180);

    centX = p.width / 2;
    centY = p.height / 2;
    p.stroke(0);
    p.strokeWeight(1);
    p.fill(255, 50);
    //p.noFill();
    p.fill(255, 50);
  };

  p.draw = () => {
    if (diam <= 400) {
      //p.background(180);
      p.ellipse(centX, centY, diam, diam);
      diam += 10;
    }
  };
};

new p5(sketch);
