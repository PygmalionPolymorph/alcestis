const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    allowedHosts: [
      '192.168.69.69',
      'peach',
    ],
    host: '0.0.0.0',
  },
};
