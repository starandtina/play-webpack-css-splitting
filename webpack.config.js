var webpack = require('webpack')
var cssnano = require('cssnano')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    posts: './posts',
    post: './post',
    about: './about',
    vendor: ['bootstrap', 'bootstrap/dist/css/bootstrap.css']
  },
  output: {
    path: 'dist',
    filename: '[name].[hash:5].js',
    chunkFilename: "[id].chunk.js"
  },
  resolve: {
    modulesDirectories: ['.', 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&-minimize!postcss')
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot|svg)(\?.*)?$/,
        loader: 'url?name=fonts/[name].[ext]&limit=10000'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new ExtractTextPlugin('[name].[contenthash:5].css')
  ],
  postcss: [
    // http://cssnano.co/optimisations/
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ]
}
