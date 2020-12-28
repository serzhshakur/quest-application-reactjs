import {CleanWebpackPlugin} from "clean-webpack-plugin";
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin"

const config: webpack.Configuration = {
    entry: [
        path.resolve(__dirname, 'src/index.tsx'),
    ],
    output: {
        filename: 'index_bundle.js',
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ]
            }
        ]
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/assets/icon.png'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["dist"],
        }),
        new webpack.DefinePlugin({
            '__API_HOST': JSON.stringify(process.env.QUESTS_API_HOST)
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

export default config;
