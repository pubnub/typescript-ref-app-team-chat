module.exports = {
  stories: ["../src/**/*.stories.@(tsx|mdx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs",
    "@storybook/addon-controls"
  ],
  typescript: {
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => {
        /**
         * This influences auto-generation of prop tables in the Docs pages
         * In this case I'm omitting props extended from node_modules packages,
         * and internal ones without the decscription doc-comment for cleaner look
         * Storybook v6 is required for this to work
         */
        if (prop.parent && /node_modules/.test(prop.parent.fileName))
          return false;
        if (!prop.description) return false;
        return true;
      }
    }
  }
};
