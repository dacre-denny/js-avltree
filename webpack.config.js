var path = require("path");

module.exports = {
    entry: {
        tree: "./src/tree.js",
        demo: "./demo/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    }
};