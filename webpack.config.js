var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {//入口文件
        app: __dirname + '/src/index.js',
        vendors: ['moment']
    },
    output: {//输出文件
        path: __dirname + '/dist',
        publicPath: '',
        filename: 'assets/app.bundle.js',
        chunkFilename: "assets/app.bundle.js"
    },
    stats: {//控制台打印配置
        color: true,
        reasons: false
    },
    // 生成sourcemap
    //devtool: ['sourcemap'],
    //文件路径的指向
    resolve: {
        extensions: ['', '.js', 'jsx'],
        //配置别名,在项目中可以缩短引用资源require('styles/main.css')相当于require('src/styles/main.css')
        alias: {
            styles: __dirname + "/src/styles"
        }
    },
    module: {
        loaders: [//加载器
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
            }, {
                test: /\.css$/,
                // loader: "style!css"
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {//加载json
                test: /\.json$/, loader: "json"
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192&name=images/[name].[ext]'
            }, {//处理sass
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }
        ]
    },
    plugins: [
        
        new ExtractTextPlugin("assets/[name].css"),

        new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/vendor.js'),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']	
        }),     
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:"jquery",
			"window.jQuery":"jquery"
		}),
        new HtmlWebpackPlugin({
            title: 'web日历组件',
            favicon: __dirname + '/favicon.ico',
            filename: 'index.html',	
            template: __dirname + '/index.html',	
            inject: true,	
            hash: true,	
            minify: {	
                removeComments: true,	
                collapseWhitespace: true	
            }
        })
    ]
}
	

//编译文件          {webpack    }
//编译并且压缩文件   {webpack  -p}
