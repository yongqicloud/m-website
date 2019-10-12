const path = require('path');
const {
    series,
    src,
    dest,
    parallel,
    watch
} = require("gulp");
const sass = require('gulp-sass');
const webpack = require("webpack-stream");
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

const buildPath = '../../build';

function copyHtml() {
    return src([`${buildPath}/rev/**/*.json`,'../*.html'])
    .pipe(revCollector())
    .pipe(dest(buildPath))
}
function copylibs(){
    return src('../libs/**/*')
    .pipe(dest(`${buildPath}/libs`))
}
function copyAssets() {
    return src('../assets/**/*')
      .pipe(dest(`${buildPath}/assets`))
  }
// sass 打包
function packSass(){
    return src('../styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(`${buildPath}/styles`))
    .pipe(rev.manifest())
    .pipe(dest(`${buildPath}/rev/styles`))
}
// js 模块化
function packJs(){
    return src('../scripts/app.js')
    .pipe(sourcemaps.init())
    .pipe(webpack({
        mode : 'production',
        entry : '../scripts/app.js',
        output : {
            path : path.resolve(__dirname,buildPath),
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
    .pipe(rev())
    .pipe(dest(`${buildPath}/scripts`))
    .pipe(rev.manifest())
    .pipe(dest(`${buildPath}/rev/scripts`))
}
// watch


exports.default = series(parallel(copylibs,copyAssets,packSass,packJs),copyHtml);
