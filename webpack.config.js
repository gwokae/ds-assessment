let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let src = path.resolve(__dirname, './client');

module.exports = {
	entry: ['whatwg-fetch', path.resolve(src, 'index.js')],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: path.resolve(src, 'index.html') })],
	devtool: 'source-map',
	devServer: {
		port: 6612,
		host: '0.0.0.0'
	}
};
