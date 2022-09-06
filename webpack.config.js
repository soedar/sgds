const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "sgds": './src/sgds.js',
    "sgds.helpers": './src/sgds.helpers.js',
    "sgds.containers": './src/sgds.containers.js',
    "sgds.grid": './src/sgds.grid.js',
    "sgds.positions": './src/sgds.positions.js',
    "assets/js/bundle": './src/sgds.bundle.js',
    "assets/js/vendor": './src/sgds.vendor.js'
  },
  devtool: 'source-map',
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        // sass -> css -> extract to dist/css
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      }
    ]
      
  },
  // minimiser only runs in --mode=production
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: "assets/uncompressed_images/", 
          to: "assets/img/",
        }
      ],
   
    }),
  ],
};