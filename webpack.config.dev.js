import webpack from 'webpack';
import path from 'path';

import config from './webpack.config';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
};

export default {
    ...config,
    devServer: {
        inline: true,
        color: true,
    },
    entry: {
        "index": [
            'babel-regenerator-runtime',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            path.resolve(__dirname, 'src/index'),
        ],
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                exclude: [
                    /(node_modules)/,
                ],
            },
            { // When there is a linting error webpack will not load the page
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            ...config.module.loaders,
        ],
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        ...config.output,
        path: path.resolve(__dirname, "dist"),
    },
    watch: true,
};

// export default {
//     devtool: 'source-map',
//     noInfo: false,
//     target: 'web',
//     devServer: {
//         inline: true,
//         color: true,
//     },
//     entry: {
//         "index": [
//             'babel-regenerator-runtime',
//             'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
//             path.resolve(__dirname, 'src/index'),
//         ],
//     },
//     module: {
//         loaders: [
//             {
//                 loader: "babel-loader",
//                 exclude: [
//                     /(node_modules)/,
//                 ],
//             },
//             { // When there is a linting error webpack will not load the page
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "eslint-loader",
//             },
//             {
//                 test: /(\.css)$/, loaders: ['style', 'css'],
//             },
//             {
//                 test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
//                 loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
//             },
//         ],
//     },
//     plugins: [
//         new webpack.DefinePlugin(GLOBALS),
//         new webpack.HotModuleReplacementPlugin(),
//     ],
//     output: {
//         path: path.resolve(__dirname, "dist"),
//         publicPath: 'http://localhost:9000/',
//         filename: "bundle.js",
//     },
//     watch: true,
// };
