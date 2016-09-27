"use strict";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('./package.json')

var loaders = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public)/,
		loader: 'babel',
	},
	{
		test: /\.eot(\?.*)?$/,
		loader: "file"
	},
	{
		test: /\.(woff|woff2)(\?.*)?$/,
		loader: "url?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?.*)?$/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?.*)?$/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif(\?.*)?$/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg(\?.*)?$/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png(\?.*)?$/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	},
	{
		test: /\.scss$/,
		exclude: /node_modules/,
		loader: ExtractTextPlugin.extract("style", 
			[
				'css',
				'sass',
				'sass-resources'
			])
	}
];

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
	entry: {
		common: Object.keys(pkg.dependencies),
		vendor: [
			'bootstrap-loader/extractStyles',
			`webpack-dev-server/client?http://${HOST}:${PORT}`,
			'webpack/hot/dev-server',
		],
		bundle: './app/main.jsx',
	},
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'static'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss']
	},
	module: {
		preLoaders: [
	      { test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/ }
    	],
		loaders
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("[name].css"),
		new webpack.optimize.CommonsChunkPlugin("common", "common.js"),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			_: 'lodash',
		})
	],
	devServer: {
		contentBase: "./static",
		hot: true,
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	sassResources: [
		path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/*.scss'),
		path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss'),
		path.join(__dirname, 'app/style/_variables.scss'),
	]
};
