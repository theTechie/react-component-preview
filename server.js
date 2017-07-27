var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

var component_to_render = process.argv[2]
var sourcePath = process.argv[3]

if (component_to_render === undefined) {
	throw new Error('You need to specify which component to render!')
}

if (sourcePath === undefined) {
	throw new Error('You need to specify the source path!')
}

var webConfig = config(component_to_render, sourcePath)

new WebpackDevServer(webpack(webConfig), {
	publicPath: webConfig.output.publicPath,
	hot: true,
	historyApiFallback: true
}).listen(3000, 'localhost', function(err, result) {
	if (err) {
		return console.log(err)
	}
	console.log('Listening at http://localhost:3000/')
})
