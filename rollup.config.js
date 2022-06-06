import { join } from 'path';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

import { main, module, peerDependencies, devDependencies } from './package.json';

export default {
  input: join(__dirname, 'src', 'index.ts'),
  output: [
    {
      file: join(__dirname, main),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: join(__dirname, module),
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(peerDependencies),
    ...Object.keys(devDependencies)
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    commonjs(),
    filesize()
  ]
};
