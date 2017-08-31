const path = require('path');
const webpack = require('webpack');
// const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const OptimizeJsPlugin = require('optimize-js-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// let postcssLoader = {
//         loader: 'postcss-loader',
//         options: {
//             plugins: () => [
//             require('autoprefixer')({browsers: 'last 3 Chrome versions'}),
//         ],
//     },
// };

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
        filename: './bundle.[name].js',
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
                test: /.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                }],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            filename: "bundle.html",
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["vendor"],
        //     minChunks: isExternal
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["manifest"],
        //     minChunks: Infinity
        // }),
    ]
};