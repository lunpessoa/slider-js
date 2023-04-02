const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PORT = 8080;

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.html'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.json$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/json/[name]_[hash][ext]',
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name]_[hash][ext]',
        },
      },
      {
        test: /\.html$/i,
        exclude: path.resolve(__dirname, '../public/index.html'),
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: 'SliderJS',
      scriptLoading: 'defer',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, '../dist'),
      },
    ],
    port: PORT,
    hot: true,
    liveReload: true,
  },
};
