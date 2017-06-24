const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		index: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: PRODUCTION ? '[name].[hash].js' : '[name].js',
	},
	module: {
		loaders: [
			{
				test: /\.pug$/,
				use: ['pug-loader'],
			},
			{
				test: /\.css$/,
				use: PRODUCTION
					? ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: 'css-loader',
						})
					: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 2048,
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			PRODUCTION: JSON.stringify(PRODUCTION),
		}),
		new ExtractTextPlugin(
			PRODUCTION ? '[name].[contenthash].css' : '[name].css'
		),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: false,
			minify: PRODUCTION
				? {
						collapseWhitespace: true,
						removeComments: true,
						useShortDoctype: true,
					}
				: false,
			template: './src/index.pug',
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
	].concat(
		PRODUCTION
			? [new webpack.optimize.UglifyJsPlugin()]
			: [new webpack.HotModuleReplacementPlugin()]
	),
	devServer: {
		allowedHosts: ['.localtunnel.me'],
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
		port: 8080,
		publicPath: '/',
		stats: {
			colors: true,
		},
	},
};
