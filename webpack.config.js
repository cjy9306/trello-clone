const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
	mode,
	entry: {
		main: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	devServer: {
		publicPath: '/',
		contentBase: path.resolve(__dirname, 'dist'),
		port: 3000,
		stats: 'errors-only',
		hot: true,
		inline: true,
		writeToDisk: true,
		historyApiFallback: true,
	},
	node: { fs: 'empty' }, // 모듈 시스템 (commonjs 등)을 사용하기 위해 추가하는 라이브러리, 다른 라이브러리에 디펜던시가 있어 추가함
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					publicPath: './',
					name: '[name].[ext]?[hash]',
					limit: 20000, // 2kb
				},
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									chrome: '79',
									ie: '11',
								},
								// polyfill 라이브러리 사용
								useBuiltIns: 'usage',
								corejs: {
									version: 3, // 3 latest
								},
							},
						],
						'@babel/preset-react',
					],
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({}), // 전역변수 설정 플러그인
		new CleanWebpackPlugin({}), // 빌드시 이전 dist 폴더를 삭제함
		...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css' })] : []),	// css 파일을 <style>태그가 아니라 파일로 따로 입력하기 위함
		new CopyPlugin([
			{
				// axios는 빌드할 필요가 없기 때문에, 이미 빌드된 min.js를 /dist에 복사만 하면됨
				from: './node_modules/axios/dist/axios.min.js',
				to: './axios.min.js',
			},
		]),
		new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            inject: true,
            filename: path.join(__dirname, './dist/index.html'),
		}),	
		new Dotenv()
	],
	optimization: {
		minimizer:
			mode === 'production'
				? [
						new OptimizeCSSAssetsPlugin(), // css 공백 최소화
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true, // 빌드시 console.log() 같은 부분 삭제
								},
							},
						}),
				  ]
				: [],
		splitChunks: {
			// 각 컴포넌트의 중복되는 컴포넌트를 따로 빼내서 빌드함
			// chunks: 'all',
		},
	},
	// axios는 이미 빌드되어 있는 라이브러리이기 때문에, 빌드시 빌드과정에 포함되지 않음
	externals: {
		axios: 'axios',
	},
};
