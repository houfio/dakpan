const { join } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ]
  },
  externals: [
    nodeExternals()
  ],
  entry: './src',
  output: {
    filename: 'index.umd.js',
    path: join(__dirname, 'lib')
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
};
