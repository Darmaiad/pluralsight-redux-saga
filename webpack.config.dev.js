import webpack from 'webpack';
import path from 'path';

import config from './webpack.config';

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
            {
                test: /(\.css)$/, loaders: ['style', 'css'],
            },
            ...config.module.loaders,
        ],
    },
    plugins: [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        ...config.output,
        path: path.resolve(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run prod`.
    },
    watch: true,
};
