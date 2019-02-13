import { join } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';

import { main, module, devDependencies } from './package.json';

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
    ...Object.keys(devDependencies)
  ],
  plugins: [
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    commonjs(),
    filesize()
  ]
};
