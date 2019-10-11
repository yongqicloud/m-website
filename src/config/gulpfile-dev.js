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
const proxy = require('http-proxy-middleware');


const devPath = '../../dev';
function defaultTask(cb) {
    // place code for your default task here
    console.log(0);
    cb();
}
function webServer(){
    return connect.server({
        name: 'Dist App',
        root: devPath,
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
    return src('../*.html')
    .pipe(dest(devPath))
    .pipe(connect.reload())
}
function copylibs(){
    return src('../libs/**/*')
    .pipe(dest(`${devPath}/libs`))

}
function copyAssets() {
    return src('../assets/**/*')
      .pipe(dest(`${devPath}/assets`))
  }
// sass 打包
function packSass(){
    return src(['../styles/*.scss','!./src/styles/yo/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(`${devPath}/styles`))
    .pipe(connect.reload())
}
// js 模块化
function packJs(){
    return src('../scripts/app.js')
    .pipe(sourcemaps.init())
    .pipe(webpack({
        mode : 'development',
        entry : '../scripts/app.js',
        output : {
            path : path.resolve(__dirname,devPath),
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
    .pipe(dest(`${devPath}/scripts`))
    .pipe(connect.reload());
}
// watch
function watchChange(){
    watch('../*.html',series(copyHtml))
    watch('../libs/*',series(copylibs))
    watch('../**/*',series(packJs))
    watch('../**/*.scss',series(packSass))
    watch('../assets/*', series(copyAssets))
}

exports.default = series(parallel(copyHtml,copylibs,copyAssets,packSass,packJs),parallel(webServer,watchChange));
