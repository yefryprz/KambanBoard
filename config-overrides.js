const { alias } = require("react-app-rewire-alias");
const path = require("path");

module.exports = function override(config, env) {
  alias({
    "@src": path.resolve(__dirname, "src"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@views": path.resolve(__dirname, "src/views"),
    "@components": path.resolve(__dirname, "src/components"),
    "@store": path.resolve(__dirname, "src/redux"),
    "@utility": path.resolve(__dirname, "src/utility"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
  })(config);

  return config;
};
