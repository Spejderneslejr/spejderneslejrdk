/* eslint-env node */

// Get modules.
var gulp = require('gulp');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var bourbon = require('bourbon').includePaths;

// Sass.
function sassCompile() {
  return gulp.src('./sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [bourbon, 'node_modules/bourbon-neat/app/assets/stylesheets', 'node_modules/neat-omega/core'],
      outputStyle: 'expanded'
    }).on('error', notify.onError(function (error) {
      return 'SASS error: ' + error.message;
    })))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('./css'));
}

// Sass watch.
function sassWatch() {
  gulp.watch('./sass/**/*.scss', sassCompile);
}

// JsHint.
function jshintCheck ()  {
  return gulp.src(['gulpfile.js', './js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}

// JsHint watch.
function jshintWatch () {
  gulp.watch(['gulpfile.js', './js/*.js'], jshint);
}

// Register workers.
var defaultTasks =  gulp.parallel (jshintCheck, sassCompile, jshintWatch, sassWatch);

exports.sass = sassCompile;
exports.default = defaultTasks;
