const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[contenthash].js',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [new TsconfigPathsPlugin({})],
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
        new Dotenv(),
        new BundleAnalyzer(),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3000,
        open: true,
    },
};
