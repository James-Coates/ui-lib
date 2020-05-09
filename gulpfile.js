'use strict';

import gulp from 'gulp';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import Browser from 'browser-sync';
import webpack from 'webpack-stream';

import { webpackConfig } from './webpack.config';

const browser = Browser.create();

function clean() {
  return del(['dist']);
}

function html() {
  return gulp.src('./src/*.html').pipe(gulp.dest('./dist'));
}

function styles() {
  return gulp
    .src('./src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(browser.stream());
}

function js() {
  return gulp
    .src('./src/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browser.stream());
}

function serve(done) {
  browser.init({
    server: {
      baseDir: './dist',
      port: '3000',
    },
  });
  done();
}

function reload(done) {
  browser.reload();
  done();
}

function watch() {
  gulp.watch('./src/*.html', gulp.series(html, reload));
  gulp.watch('./src/styles/**/*.scss', gulp.series(styles, reload));
  gulp.watch('./src/**/*.js', gulp.series(js, reload));
}

const build = gulp.parallel(html, styles, js);

const dev = gulp.series(clean, build, serve, watch);

export default dev;
