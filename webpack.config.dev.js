import webpack from 'webpack';
import path from 'path';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
};

export default {
    debug: true,
    devServer: {
        inline: true,
        color: true,
    },
    devtool: 'source-map',
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
                query: {
                    presets: ['env', 'react'],
                    plugins: ['transform-object-rest-spread'],
                },
            },
            { // When there is a linting error webpack will not load the page
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /(\.css)$/, loaders: ['style', 'css'],
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
            },
        ],
    },
    noInfo: false,
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
    ],
    stats: {
        colors: true,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: 'http://localhost:9000/',
        filename: "bundle.js",
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    target: 'web', // The default target
    watch: true,
};
