// Path is in Node for free and will make simple resolving of directories no
// matter which part of your file system your library lives in
const path = require('path');

// Webpack is just a bunch of keys on module.exports!
module.exports = {
    // This is where our app starts. This is why we have done all this importing
    // and exporting, to get to here
    entry: './src/index.js',

    module: {
        // rules takes an array, each item containing the respective rules
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {

                test: /\.(css|scss)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                ],
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                    },
                },
            },
        ],
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        "styled-components": {
            commonjs: "styled-components",
            commonjs2: "styled-components",
            amd: "styled-components",
        },
    },
    // Here we define explicitly the file types we intend to deal with
    resolve: {
        extensions: ['.scss', '.js', '.json', '.png', '.gif', '.jpg', '.svg'],
    },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '',
        filename: 'web-components-common.js',
        // This field determines how things are importable when installed from other
        // sources. UMD may not be correct now and there is an open issue to fix this,
        // but until then, more reading can be found here:
        // https://webpack.js.org/configuration/output/#output-librarytarget
        libraryTarget: 'umd',
    },
};
