const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['env', 'react', 'stage-2'] }
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: { loader: 'css-loader', options: { minimize: true } }
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__API_HOST': JSON.stringify(process.env.QUESTS_API_HOST_PROD)
        }),
        new HtmlWebpackPlugin(
            {
                template: 'src/index.html',
                favicon: 'src/assets/icon.png'
            }
        ),
        new ExtractTextPlugin({
            filename: 'styles.bundle.css',
            allChunks: true
        }),
    ],
    devServer: {
        historyApiFallback: true,
    }
};