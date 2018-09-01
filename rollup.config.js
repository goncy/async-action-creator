import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

const PACKAGE_NAME = process.env.PACKAGE_NAME;
const ENTRY_FILE = "./src/index.js";
const OUTPUT_DIR = "./dist";

export default [
  {
    input: ENTRY_FILE,
    output: {
      file: `${OUTPUT_DIR}/${PACKAGE_NAME}.umd.js`,
      format: "umd",
      name: PACKAGE_NAME
    },
    plugins: [resolve(), babel(), commonjs()]
  },

  {
    input: ENTRY_FILE,
    output: {
      file: `${OUTPUT_DIR}/${PACKAGE_NAME}.min.js`,
      format: "umd",
      name: PACKAGE_NAME
    },
    plugins: [resolve(), babel(), commonjs(), uglify()]
  },

  {
    input: ENTRY_FILE,
    output: {
      file: `${OUTPUT_DIR}/${PACKAGE_NAME}.cjs.js`,
      format: "cjs"
    },
    plugins: [babel()]
  },

  {
    input: ENTRY_FILE,
    output: {
      file: `${OUTPUT_DIR}/${PACKAGE_NAME}.esm.js`,
      format: "es"
    },
    plugins: [babel()]
  }
];
