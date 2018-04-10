export default {
    devtool: 'source-map',
    noInfo: false,
    target: 'web',
    devServer: {},
    module: { // Careful on loader ordering
        loaders: [
            {
                test: /(\.css)$/, loaders: ['style', 'css'],
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
            },
        ],
    },
    plugins: [
    ],
    output: {
        path: null,
        filename: "bundle.js",
        // path: path.resolve(__dirname, "dist"),
        publicPath: 'http://localhost:9000/',
    },
};
