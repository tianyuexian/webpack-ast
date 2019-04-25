let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.css$/,use:['style-loader','css-loader']
      },
      {
        test: /\js$/, use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [ // babel-plugin-import
              ['import', { "libraryName": "antd", style: "css" }]
            ]
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ]
}