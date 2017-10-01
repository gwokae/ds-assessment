const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');
const simpleApiMiddleware = require('./simpleApiMiddleware');

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
	stats: {
		colors: true,
	},
	before(app) {
		app.use(simpleApiMiddleware);
	},
});

const { host = '0.0.0.0', port = 6612 } = webpackConfig.devServer;
server.listen(port, host, () => {
	console.log(`Starting server on http://${host}:${port}`);
});
