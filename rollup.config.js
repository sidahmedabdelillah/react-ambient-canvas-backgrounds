import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

import postcss from 'rollup-plugin-postcss'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.js', '.ts', '.jsx', '.tsx']

export default {
  input: [
    './src/index.ts',
  ],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      },
      {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    postcss(),
    terser(),
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
    }),
  ],
  external: ['react', 'react-dom'],
}
// {
//   file: packageJson.main,
//   format: "cjs",
//   sourcemap: true,
//   globals: GLOBAL_DEPENDENCIES,
// },
// {
//   file: packageJson.module,
//   format: "esm",
//   sourcemap: true,
//   globals: GLOBAL_DEPENDENCIES,
// }
