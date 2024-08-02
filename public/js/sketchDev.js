import './p5Setup.js';


const title = '2.1.2 ハロー・ワールド';


const sketch = (p) => {
  let cnvs, w, h;

  p.setup = () => {
    // put setup code here
    p.ellipse(25, 25, 50, 50);
  };

};

document.addEventListener('DOMContentLoaded', () => {
  document.title = title ? title : document.title;
  const canvasId = 'p5Canvas';
  const canvasTag = document.querySelector(`#${canvasId}`);
  canvasTag.style.backgroundColor = 'darkgray';

  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), {
    passive: false,
  });

  // --- start
  new p5(sketch, canvasId);
});
