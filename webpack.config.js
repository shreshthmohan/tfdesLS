// where the entry point is
// where output final bundle file

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

//const output_path = // so that it works across OSes



module.exports = (env) => {
    console.log('env: ' + env);
    const isProd = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
    return {
        //entry: './src/playground/hoc.js',
        entry: './src/app.js', 
        output: {
            path: path.join(__dirname, 'public', 'dist'), // need to give an absolute path
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                test: /\.s?css$/

            }
            ]
        },
        devtool: isProd ? 'source-map' :'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
}
