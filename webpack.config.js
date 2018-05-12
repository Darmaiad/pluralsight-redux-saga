import webpack from 'webpack';
import config from './config';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.PORT': JSON.stringify(process.env.PORT), 
};

Object.keys(config).map((key) => {
    if ((typeof config[key]) === 'string') {
        GLOBALS[key] = JSON.stringify(config[key]);
    } else {
        GLOBALS[key] = config[key];
    }
});

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
        new webpack.DefinePlugin(
            GLOBALS,
        ),
    ],
    output: {
        path: null,
        filename: "bundle.js",
        publicPath: '/',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    node: {
        fs: 'empty',
    },
};
