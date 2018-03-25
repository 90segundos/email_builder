'use strict';

/* ---------------------[ packages ]----------------------- */

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    juice = require('gulp-juice'),
    clean_css = require('gulp-clean-css');

/* ---------------------[ directories ]----------------------- */

var directories = {
  'pug_watch':  ['pug/**/*.*'],
  'pug_src':    ['pug/*.pug'],
  'pug_dest':  'html',
  'sass_watch': ['scss/**/*.*'],
  'sass_src':   ['scss/*/*.scss'],
  'sass_dest': 'css',
  'css_src': ['css/**/*.css'],
  'css_dest': '../css',
  'juice_watch': ['css/**/*.css','html/*.html'],
  'juice_src': ['html/*.html'],
  'juice_dest': '../build'
}

/* ---------------------[ postcss plugins ]----------------------- */

var juice_options = {
  removeStyleTags:false
};

/* ---------------------[ tasks ]----------------------- */

// pug
gulp.task('compile_pug', function buildHTML() {
  return gulp.src(directories.pug_src)
  .pipe(pug({
    'pretty':true,
    'compileDebug': true
  }))
  .pipe(gulp.dest(directories.pug_dest))
});

// sass
gulp.task('compile_sass', function () {
  return gulp.src(directories.sass_src)
    .pipe(sass({sourceComments:1}).on('error', sass.logError))
    .pipe(clean_css())
    .pipe(gulp.dest(directories.sass_dest));
});

// juice
gulp.task('juice', function(){
  gulp.src(directories.juice_src)
    .pipe(juice(juice_options))
    .pipe(gulp.dest(directories.juice_dest));
});

// watch
gulp.task('watch', function () {
  gulp.watch(directories.pug_watch, ['compile_pug']);
  gulp.watch(directories.sass_watch, ['compile_sass']);
  gulp.watch(directories.juice_watch, ['juice']);
});

/* ---------------------[ task collections ]----------------------- */

// default
gulp.task('default', ['compile_pug', 'compile_sass', 'juice', 'watch']);
