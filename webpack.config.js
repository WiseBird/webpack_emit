const path = require('path');
const webpack = require('webpack');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// function isExternal(module) {
//     let userRequest = module.userRequest;
//
//     if (typeof userRequest !== 'string') {
//         return false;
//     }
//
//     return userRequest.indexOf('node_modules') >= 0;
// }

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: './[name]-[chunkhash].js',
        library: '[name]',
        libraryTarget: "var",
    },
    resolve: {
        modules: [
            "../node_modules",
        ],
        extensions: [
            '.ts',
            '.js',
            '.html',
            '.scss',
        ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                }],
            },
            {
                test: /\.(css|scss)/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                }),
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            filename: "index.html",
        }),
        new NamedModulesPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin("[name]-[contenthash].css"),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["vendor"],
        //     minChunks: isExternal
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["manifest"],
        //     minChunks: Infinity
        // }),
    ],
    devServer: {
        contentBase: './bundle',
    },
};