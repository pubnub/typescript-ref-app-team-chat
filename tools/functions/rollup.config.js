const replace = require("@rollup/plugin-replace");
const typescript = require("@rollup/plugin-typescript");
const { terser } = require("rollup-plugin-terser");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const safe = require("./rollup-plugin-safe-functions");
const path = require("path");

module.exports = (options, env) => {
  const projectPath = (relative) => path.resolve(options.rootDir, relative);
  return {
    output: {
      // neccessary to allow wrapping all the output
      format: "cjs",
    },
    // modules provided by the functions environment
    external: [
      "xhr",
      "kvstore",
      "advanced_math",
      "crypto",
      "utils",
      "codec/auth",
      "codec/base64",
      "codec/query_string",
      "pubnub",
      "vault",
    ],
    plugins: (options.allowNodeModules
      ? // bundle node_modules
        [nodeResolve(), commonjs(), json()]
      : []
    ).concat([
      // replace environment variables
      replace(env),
      replace({"process.env": "({})"}),
      // minify
      options.optimize && terser(),
      // process typescript files
      options.typescript &&
        typescript({
          tsconfig: projectPath("tsconfig.json"),
        }),
      // workaround top-level function call restriction
      safe(),
    ]),
  };
};
