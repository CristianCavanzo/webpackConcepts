const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [
            new TsconfigPathsPlugin({
                /* options: see below */
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [MiniCSSExtract.loader, 'css-loader'],
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[contenthash][ext]',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[contenthash][ext]',
                },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html',
        }),
        new MiniCSSExtract({
            filename: 'assets/[name].[contenthash].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CSSMinimizerPlugin()],
    },
};
