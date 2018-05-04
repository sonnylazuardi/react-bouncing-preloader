var path = require("path");
module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2" // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./index.js"),
        exclude: /(node_modules|bower_components|build|example)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react-native"]
          }
        }
      }
    ]
  },
  externals: {
    react: "commonjs react" // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
