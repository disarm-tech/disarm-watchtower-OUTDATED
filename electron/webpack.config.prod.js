const path = require('path');
const { optimize } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const destinationPath = path.join(__dirname, '..', 'dist', 'electron');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    stats: 'minimal',
    devtool: 'source-map',
    context: path.join(__dirname, '..'),
    bail: true,
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.d.ts'],
        alias: {
            '@shared': path.join(__dirname, '..', 'shared'),
            '@electron': path.join(__dirname, 'src'),
        },
    },
    entry: {
        app: path.join(__dirname, 'src', 'app.ts'),
    },
    target: 'node',
    output: {
        path: destinationPath,
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: require('os').cpus().length,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|webp|svg)$/i,
                oneOf: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: true,
                        },
                    },
                ],
            },
        ],
    },
    externals: [nodeExternals()],
    plugins: [new optimize.OccurrenceOrderPlugin(), new CleanWebpackPlugin()],
};
