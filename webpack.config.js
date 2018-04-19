import webpack from 'webpack';

import config from './config';

export default {
    devtool: 'source-map',
    noInfo: false,
    target: 'web',
    module: { // Careful on loader ordering
        loaders: [
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    output: {
        path: null,
        filename: "bundle.js",
        // publicPath: `http://${config.host}:${config.port}/`,
        publicPath: '/',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
