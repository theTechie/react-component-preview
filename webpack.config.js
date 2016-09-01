var path = require('path');
var webpack = require('webpack');

var baseSrcPath = '/Users/gagan/Documents/gagan/pp_source/main_service/frontend/harmony'  // NOTE: read this from config ?

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
        resolve: {
            root: path.resolve(baseSrcPath + '/src'),
            modules: ['', 'node_modules', 'bower_components', 'src/pp/core/less/', path.resolve(baseSrcPath + '/src')],
            extensions: ['', '.js', '.jsx', '.less']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['react-hot', 'babel'],
                    include: [path.join(__dirname, 'src'), path.resolve(sourcePath)].concat(['', 'node_modules', 'bower_components', 'src/pp/core/less/', path.resolve(baseSrcPath + '/src')]),
                    exclude: /node_modules/
                },
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'file-loader' }
            ]
        }
    }
}
