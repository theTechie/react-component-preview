var path = require('path');
var webpack = require('webpack');

var baseSrcPath = '/Users/gagan/Documents/gagan/pp_source/main_service/frontend/harmony'  // NOTE: read this from config ?

// TODO: problems to solve
// 1. src/pp/modules/root/less
// 2. src/fonts (modified pp-common-font.less)

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
            modules: ['', 'node_modules', 'bower_components', path.resolve(baseSrcPath) + '/src', path.resolve(baseSrcPath) + '/src/pp/core/less', path.resolve(baseSrcPath) + '/src/pp/modules/root/less'],
            extensions: ['', '.js', '.jsx', '.less']
        },
        module: {
            preLoaders: [
                {
                    test: /\.less$/,
                    loader: path.resolve(__dirname + '/loaders/addtilde')
                }
            ],
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['react-hot', 'babel?cacheDirectory'],
                    exclude: /node_modules/
                },
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                {
                    test: /\.(png|jpg|jpeg|gif|woff|ttf)$/,
                    loader: 'file-loader',
                    //include: path.join(path.resolve(baseSrcPath), 'src/fonts')
                }
            ]
        }
    }
}
