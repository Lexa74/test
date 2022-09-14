module.exports = {
    entry: ['./script.js', './style.styl'],
    output: {
        filename: 'bundle.js',
        path: require('path').resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                loader: "stylus-loader", // compiles Styl to CSS
            },
        ],
    },
}       