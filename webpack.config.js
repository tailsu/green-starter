"use strict";
var webpack = require('webpack');
var path = require('path');

var loaders = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public)/,
		loader: 'babel',
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file"
	},
	{
		test: /\.(woff|woff2)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	},
	{
		test: /\.(png|woff|woff2|eot|ttf|svg)$/,
		loader: 'url-loader?limit=100000'
	},
	{
		test: /\.scss$/,
		exclude: /node_modules/,
		loaders: [
			'style?sourceMap',
			'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
			'sass'
		]
	}
];

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
	entry: [
		'bootstrap-loader',
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		'webpack/hot/dev-server',
		'./app/main.jsx'
	],
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js'
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
	devServer: {
		contentBase: "./static",
		hot: true,
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
};
