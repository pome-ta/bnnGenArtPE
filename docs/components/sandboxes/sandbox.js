import * as Babel from '@babel/standalone';

const MAX_LOOP_DURATION_MS = 300;

window.__triggerLoopError = () => {
  console.warn('[sandbox.js] Infinite loop prevented!');
  document.getElementById('loop-error-overlay')?.remove();

  const warningDiv = document.createElement('div');
  warningDiv.id = 'loop-error-overlay';
  Object.assign(warningDiv.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    color: 'white',
    padding: '0.8rem 1.2rem',
    'background-color': 'rgba(220, 53, 69, 0.4)',
    'font-size': '0.72rem',
    'box-sizing': 'border-box',
    'z-index': '9999',
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'clearInterval',
  });

  warningDiv.innerHTML = `
  <span><strong>⚠️: </strong>高負担処理または無限ループの可能性があるため、実行を停止</span>
    <button id="close-loop-error" style="background: none; border: none; color: white; cursor: pointer; font-size: 1rem; padding: 0;"> ✕ </button>
  `;

  document.body.appendChild(warningDiv);

  document.getElementById('close-loop-error').addEventListener('click', () => {
    warningDiv.remove();
  });

  throw new Error('Error: Infinite loop detected!');
};

// ---  無限ループ保護用 Babel プラグイン (AST解析と書き換え) ---
const loopProtectPlugin = function ({ types: t }) {
  return {
    visitor: {
      Loop(path) {
        if (path.node._loopProtectProcessed) {
          return;
        }
        path.node._loopProtectProcessed = true;
        const dateNowExpr = t.callExpression(
          t.memberExpression(t.identifier('Date'), t.identifier('now')),
          [],
        );

        // ループ開始時間を記録
        const startVar = path.scope.generateUidIdentifier('loopStart');
        path.insertBefore(
          t.variableDeclaration('const', [
            t.variableDeclarator(startVar, dateNowExpr),
          ]),
        );

        // 指定時間を超えたら window.__triggerLoopError() を呼び出す
        const checkStatement = t.ifStatement(
          t.binaryExpression(
            '>',
            t.binaryExpression('-', dateNowExpr, startVar),
            t.numericLiteral(MAX_LOOP_DURATION_MS),
          ),
          t.blockStatement([
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier('window'),
                  t.identifier('__triggerLoopError'),
                ),
                [],
              ),
            ),
          ]),
        );

        if (!t.isBlockStatement(path.node.body)) {
          path.node.body = t.blockStatement([path.node.body]);
        }

        path.node.body.body.unshift(checkStatement);
      },
    },
  };
};

// --- p5 Wrapper ---
const P5_ORIGINAL = window.p5;
const P5_INSTANCES = new Set();

function WrappedP5(...args) {
  const instance = new P5_ORIGINAL(...args);
  P5_INSTANCES.add(instance);
  return instance;
}

WrappedP5.prototype = P5_ORIGINAL.prototype;
WrappedP5.prototype.constructor = WrappedP5;
Object.setPrototypeOf(WrappedP5, P5_ORIGINAL);
window.p5 = WrappedP5;

// --- Run Sketch ---
function runSketch(code) {
  P5_INSTANCES.forEach((instance) => instance.remove?.());
  P5_INSTANCES.clear();

  let safeCode = code;
  try {
    // Babelを使ってコードにループ保護を差し込む
    const output = Babel.transform(code, {
      plugins: [loopProtectPlugin],
    });
    safeCode = output.code;
  } catch (err) {
    // 構文エラー時はそのまま流す
    console.warn(
      '[sandbox.js] Babel transform failed, running original code.',
      err,
    );
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = `
    {
      ${safeCode}
    }
  `;
  document.body.appendChild(script);

  if (P5_INSTANCES.size === 0) {
    try {
      new window.p5();
    } catch (err) {
      console.warn('[sandbox.js] p5 init error (Global Mode):', err);
    }
  }
  document.body.removeChild(script);
}

// --- Message Handlers ---
const messageHandlers = {
  loadSketch: (data) => {
    if (typeof data.code === 'string') {
      runSketch(data.code);
    }
  },
  setLoop: (data) => {
    if (typeof data.isLoop === 'boolean') {
      P5_INSTANCES.forEach((instance) => {
        data.isLoop ? instance.loop?.() : instance.noLoop?.();
      });
    }
  },
};

window.addEventListener('message', (e) => {
  const data = e.data;
  if (!data || typeof data !== 'object' || !data.type) {
    return;
  }

  const handler = messageHandlers[data.type];
  handler
    ? handler(data)
    : console.warn('[sandbox.js] Unknown message type:', data.type);
});

// --- Canvas Size Observer ---
const reportSize = (canvas) => {
  window.parent.postMessage(
    {
      type: 'resize',
      width: canvas.width,
      height: canvas.height,
    },
    '*',
  );
};

const domObserver = new MutationObserver((mutations, obs) => {
  const addedElements = mutations
    .flatMap((m) => Array.from(m.addedNodes))
    .filter((node) => node.nodeType === Node.ELEMENT_NODE);

  for (const node of addedElements) {
    const canvas =
      node.nodeName === 'CANVAS' ? node : node.querySelector('canvas');
    if (!canvas) {
      continue;
    }

    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';

    reportSize(canvas);

    const sizeObserver = new MutationObserver(() => reportSize(canvas));
    sizeObserver.observe(canvas, {
      attributes: true,
      attributeFilter: ['width', 'height'],
    });

    obs.disconnect();
    return;
  }
});

domObserver.observe(document.body, { childList: true, subtree: true });
