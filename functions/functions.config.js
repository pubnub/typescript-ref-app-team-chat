// eslint-disable-next-line @typescript-eslint/no-var-requires
const HandlerTypes = require("../tools/functions/handlerTypes.js");

module.exports = {
  // project root directory
  rootDir: "./",
  // relative to rootDir
  sourceDir: "./src",
  buildDir: "./build",
  // minify the build
  optimize: true,
  // allow typescript files
  typescript: true,
  // resolve imports from node_modules
  allowNodeModules: true,
  // functions to build
  functions: [
    {
      name: "Message Transformer",
      run: HandlerTypes.beforePublish,
      // relative to sourceDir
      source: "transformPublishedMessages.ts",
      // relative to buildDir
      build: "transformPublishedMessages.js",
      subscribeTo: "*",
    },
  ],
};
