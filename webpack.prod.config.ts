import path from 'path';
import {Configuration, DefinePlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = {
    entry: [
        'regenerator-runtime/runtime',
        './src/index.tsx'
    ],
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["dist"]
            }
        ),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__API_HOST': JSON.stringify(process.env.QUESTS_API_HOST_PROD)
        }),
        new HtmlWebpackPlugin(
            {
                template: 'src/index.html',
                favicon: 'src/assets/icon.png',
                minify: {
                    collapseWhitespace: true,
                    preserveLineBreaks: true,
                    removeComments: true,
                },

            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
    ],
    devServer: {
        historyApiFallback: true,
    }
}

export default config;
