import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const mainSet = () => {
  return {
    input: './src/js/p5Bundle.js',
    output: {
      file: './public/js/modules/p5Main.bundle.js',
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs()],
  };
};

const erudaSet = () => {
  return {
    input: './src/js/erudaBundle.js',
    output: {
      file: './public/js/modules/eruda.bundle.js',
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs()],
  };
};

export default [mainSet(), erudaSet()];
