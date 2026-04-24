const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    devtool: "source-map",

    target: ["web", "es5"],

    entry: "./javascripts/script.js",

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "../public")
    },

    plugins: [
        new CleanWebpackPlugin()
    ]
};