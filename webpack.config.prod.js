import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './webpack.config';

export default {
    ...config,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },
    entry: './src/index',
    output: {
        ...config.output,
        path: __dirname + '/dist',
    },
    module: {
        loaders: [
            { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
            ...config.module.loaders,
        ],
    },
    plugins: [
        ...config.plugins,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.IgnorePlugin(/redux-immutable-state-invariant|redux-logger/),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ],
};
