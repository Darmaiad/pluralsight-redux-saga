import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './webpack.config';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
};

export default {
    ...config,
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },
    entry: './src/index',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run prod`.
        publicPath: 'http://localhost:9000/',
        // publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
            ...config.module.loaders,
        ],
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.IgnorePlugin(/redux-immutable-state-invariant|redux-logger/),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ],
};

// export default {
//     devtool: 'source-map',
//     noInfo: false,
//     target: 'web',
//     devServer: {
//         contentBase: path.resolve(__dirname, 'dist'),
//     },
//     entry: './src/index',
//     output: {
//         path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
//         publicPath: 'http://localhost:9000/',
//         // publicPath: '/',
//         filename: 'bundle.js',
//     },
//     plugins: [
//         new webpack.DefinePlugin(GLOBALS),
//         new webpack.optimize.OccurrenceOrderPlugin(),
//         new webpack.IgnorePlugin(/redux-immutable-state-invariant|redux-logger/),
//         new ExtractTextPlugin('styles.css'),
//         new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.UglifyJsPlugin(),
//     ],
//     module: {
//         loaders: [
//             { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
//             { test: /(\.css)$/, loader: ExtractTextPlugin.extract('css?sourceMap') },
//             {
//                 test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
//                 loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
//             },
//         ],
//     },
// };
