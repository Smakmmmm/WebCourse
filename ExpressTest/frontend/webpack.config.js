const path = require("path");

module.exports = {
    devtool: "source-map",

    target: ["web", "es5"],

    entry: "./javascripts/script.js",

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "../public")
    }
};