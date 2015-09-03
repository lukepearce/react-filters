module.exports = {
  entry: "./app.js",
  output: {
    filename: "public_html/assets/js/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};