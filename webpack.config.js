let path                = require('path')
let webpack             = require('webpack')
let config              = require('./config')
let StringReplacePlugin = require('string-replace-webpack-plugin')
let HtmlWebpackPlugin   = require('html-webpack-plugin')
let ExtractTextPlugin   = require('extract-text-webpack-plugin')

const publicPath = process.env.PUBLIC_PATH || '/'
const dist = process.env.DIST_DIRECTORY || 'dist'

let plugins = [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ExtractTextPlugin({ filename: 'css/main.css', allChunks: true })
]

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            compress: { drop_console: true }
        })
    )
} else {
    let WebpackNotifierPlugin = require('webpack-notifier')
    plugins.push(new WebpackNotifierPlugin())
}

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, dist),
        filename: 'js/[name].js',
        publicPath : publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react', 'stage-2']
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[hash].[ext]',
                            context: 'src/',
                            publicPath: publicPath
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { sourceMap: true }
                        }, {
                            loader: "sass-loader",
                            options: { sourceMap: true }
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: StringReplacePlugin.replace({
                            replacements: [
                                {
                                    pattern: /\$\{([a-z][a-z0-9_]*)\}/ig,
                                    replacement: function (match, p) {
                                        return config.hasOwnProperty(p) ? config[p] : match
                                    }
                                }
                            ]
                        })
                    }
                ]
            }
        ]
    },
    resolve: { alias: { app: path.resolve('src') } },
    stats: { colors: true },
    devtool: 'source-map',
    plugins: plugins,
    devServer: { historyApiFallback: true }
}
