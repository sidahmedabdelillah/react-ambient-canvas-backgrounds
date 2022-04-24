import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { babel } from '@rollup/plugin-babel';

const packageJson = require("./package.json");

const GLOBAL_DEPENDENCIES = {
  'react': 'React',
  'react-dom': 'ReactDOM',
};

const RESOLVE_PLUGIN_OPTIONS = {
  extensions: ['.js']
};



export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      globals: GLOBAL_DEPENDENCIES,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      globals: GLOBAL_DEPENDENCIES,
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss()
  ]
};
