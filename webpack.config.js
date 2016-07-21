var path = require('path');
var webpack = require('webpack');

module.exports = {
    //context: path.join(__dirname, 'src/js'),
    entry: [
        //'webpack-dev-server/client?http://localhost:3000',
        //'webpack/hot/only-dev-server',
        './src/js/entry'
    ],
    output: {
        path: path.join(__dirname, 'dist/js'),
        publicPath: "/dist/",
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    resolve: {
        root: path.resolve(__dirname, 'src/js'),
        extensions: ['', '.js'],
        modulesDirectories: ["/src/js", "/src/lib", "node_modules", "bower_components"]
    },

    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                //loaders: [ 'react-hot-loader', 'babel-loader' ],
                include: [path.resolve(__dirname, "src/js")],
                exclude: ["/src/lib", "node_modules", "bower_components"],
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    },

    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()
    ]
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('c/client?http://localhost:9090');
        sources.push('webpack/hot/only-dev-server');
    }
}

