const path = require('path');
const {
    series,
    src,
    dest,
    parallel,
    watch
} = require("gulp");
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const webpack = require("webpack-stream");
const sourcemaps = require('gulp-sourcemaps');
// const proxy = require('http-proxy-middleware');
const proxy = require('http-proxy-middleware')
function defaultTask(cb) {
    // place code for your default task here
    console.log(0);
    cb();
}
function webServer(){
    return connect.server({
        name: 'Dist App',
        root: './dist',
        port: 8000,
        livereload: true,
        middleware : () => {
            return [
                proxy('/api',{
                    target: 'https://www.missevan.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                })
            ]
        }
    });
}
function copyHtml() {
    return src('./src/*.html')
    .pipe(dest('./dist/'))
    .pipe(connect.reload())
}
function copylibs(){
    return src('./src/libs/**/*')
    .pipe(dest('./dist/libs'))

}
function copyAssets() {
    return src('./src/assets/**/*')
      .pipe(dest('./dist/assets'))
  }
// sass 打包
function packSass(){
    return src(['./src/styles/**/*.scss','!./src/styles/yo/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/styles'))
    .pipe(connect.reload())
}
// js 模块化
function packJs(){
    return src('./src/scripts/app.js')
    .pipe(sourcemaps.init())
    .pipe(webpack({
        mode : 'development',
        entry : './src/scripts/app.js',
        output : {
            path : path.resolve(__dirname,'./dist'),
            filename : 'app.js'
        },
        module:{
            rules : [
                {
                    test : /\.html$/,
                    loader: 'string-loader'
                },
                {
                    test:/\.art$/,
                    loader:'art-template-loader'
                }
            ]
        }

    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/scripts'))
    .pipe(connect.reload());
}
// watch
function watchChange(){
    watch('./src/*.html',series(copyHtml))
    watch('./src/libs/*',series(copylibs))
    watch('./src/**/*',series(packJs))
    watch('./src/**/*.scss',series(packSass))
    watch('./src/assets/*', series(copyAssets))
}

exports.default = series(parallel(copyHtml,copylibs,copyAssets,packSass,packJs),parallel(webServer,watchChange));
