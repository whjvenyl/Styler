const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: './src/code.ts',

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
            // options: { transpileOnly: true }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [new CleanWebpackPlugin()]
});
