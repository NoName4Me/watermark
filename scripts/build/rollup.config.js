import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import pkg from '../../package.json';
const reactRelatedPkgs = Object.keys(pkg.peerDependencies);

export default {
  external: [...reactRelatedPkgs],
  input: path.resolve(process.cwd(), 'src/index.ts'),
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es', // the preferred format
    },
    {
      file: pkg.browser,
      format: 'iife',
      name: 'Watermark', // the global which can be used in a browser
    },
  ],
  plugins: [typescript(), resolve(), commonjs(), terser()],
};
