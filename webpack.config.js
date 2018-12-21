var path = require("path");

module.exports = {
    entry: "./src/tree.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
};