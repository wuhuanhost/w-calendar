// Karma configuration
// Generated on Thu Jun 30 2016 13:24:02 GMT+0800 (中国标准时间)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        //测试框架
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        //测试时候需要加载的js文件
        files: [
            'test/**/*.test.js',
            'test/**/*.js',
        ],

        // list of files to exclude
        //不包括的文件
        exclude: [
            "node_modules",
            "logs"
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // preprocessors: {
        // },
webpack: {
      resolve: {
        root: __dirname + "/src"
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: [/node_modules/, __dirname + "xxx/xxx/lib"],
          loader: "babel-loader",
          query: {
            compact: false,
            presets: ["es2015"],
            plugins: ["es6-promise"]
          }
        }]
      }
    },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['progress'],
        reporters: ['progress', 'coverage'],//报表列表

        preprocessors: { 
			'test/**/*.js':   ['webpack','coverage'],
			'test/**/*.test.js':   ['webpack'],
			},//预处理器
        //打印报表
        coverageReporter: {
            type: 'html',
            dir: 'coverage'   //报表目录
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,//如果为true,运行测试之后退出浏览器

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity

    })
}
