require("dotenv").config()
const webpack = require("webpack")
// const withImages = require("next-images")
// module.exports = withImages()
// const HtmlWebpackPlugin = require("html-webpack-plugin") //installed via npm
// const withSass = require("@zeit/next-sass")
// const withCSS = require("@zeit/next-css")

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    return config
  },
}
// module.exports = {
//   module: {
//     rules: [{ test: /\.txt$/, use: "raw-loader" }],
//   },
//   plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
// }

// module.exports = {
//   webpackConfig: {
//     module: {
//       rules: [
//         // Babel loader, will use your project’s .babelrc
//         {
//           test: /\.jsx?$/,
//           exclude: /node_modules/,
//           loader: "babel-loader",
//         },
//         // Other loaders that are needed for your components
//         {
//           test: /\.css$/,
//           loader: "style-loader!css-loader?modules",
//         },
//         {
//           test: /\.(jpg|png|svg)$/,
//           use: {
//             loader: "url-loader",
//             options: {
//               limit: 25000,
//             },
//           },
//         },
//       ],
//     },
//   },
// }

// module.exports = withCSS(
//   withSass({
//     webpack(config, options) {
//       config.module.rules.push({
//         test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//         use: {
//           loader: "url-loader",
//           options: {
//             limit: 100000,
//           },
//         },
//       })
//       return config
//     },
//   })
// )
