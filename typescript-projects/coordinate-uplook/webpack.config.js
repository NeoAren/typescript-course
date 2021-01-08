const path = require('path');

module.exports = {
   mode: 'development',
   entry: './src/index.ts',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         { test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' }
      ]
   },
   devtool: 'inline-source-map',
   devServer: {
      contentBase: './public',
      publicPath: '/dist/',
      open: true
   },
   resolve: {
      extensions: ['.ts', '.js']
   }
};
