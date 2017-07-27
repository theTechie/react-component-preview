var path = require('path')
var webpack = require('webpack')

module.exports = function(component_to_render, sourcePath) {
	return {
		devtool: 'eval',
		entry: [
			'./node_modules/react-hot-loader/patch',
			'./node_modules/webpack-dev-server/client?http://localhost:3000', // TODO: read port from package settings
			'./node_modules/webpack/hot/only-dev-server',
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
			new webpack.NoEmitOnErrorsPlugin()
		],
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: ['react-hot-loader/webpack', 'babel-loader'],
					include: [
						path.join(__dirname, 'src'),
						path.resolve(sourcePath)
					],
					exclude: /node_modules/
				},
				{ test: /\.less$/, loader: 'style!css!less' },
				{ test: /\.css$/, loader: 'style-loader!css-loader' },
				{ test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'file-loader' }
			]
		}
	}
}
