var path = require('path');
var webpack = require('webpack');

module.exports = function(component_to_render, sourcePath) {
    return {
      devtool: 'eval',
      entry: [
        'webpack-dev-server/client?http://localhost:3000', // TODO: read port from package settings
        'webpack/hot/only-dev-server',
        './src/index'
      ],
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __COMPONENT_TO_RENDER: JSON.stringify(component_to_render)
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoErrorsPlugin()
      ],
      module: {
        loaders: [{
          test: /\.js?$/,
          loaders: ['react-hot', 'babel'],
          include: [path.join(__dirname, 'src'), sourcePath],
          exclude: /node_modules/,
      },
      {
          test: /\.less/,
          loader: 'style!css!less'
        }]
      }
    }
}
