var gulp = require('gulp');
var config = require('./gulpconfig');
// Global
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runsequence = require('run-sequence');
var browsersync = require('browser-sync');
var del = require('del');
// HTML
var uncss = require('gulp-uncss');
var htmlmin = require('gulp-htmlmin');
// CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
// JS
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
// IMAGES
var imagemin = require('gulp-imagemin');

var reload = browsersync.reload;

gulp.task('html', function () {
  return gulp.src(config.src + '/*.html')
    // .pipe(htmlmin({
    //   collapseWhitespace: true
    // }))
    .pipe(gulp.dest(config.dist))
});

gulp.task('styles', function () {
  return gulp.src(config.styles.path.input)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: config.styles.autoprefixer
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.path.output))
});

gulp.task('scripts', function () {
  return gulp.src(config.scripts.path.input)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify({
      preserveComment: 'license'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.path.ouput))
});

gulp.task('lint', function () {
  return gulp.src(config.scripts.path.linter)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

gulp.task('images', function(){
  return gulp.src(config.images.path.input)
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    optimizationLevel: 4,
    multipass: true
  }))
  .pipe(gulp.dest(config.images.path.ouput))
});


gulp.task('clean', function () {
  return del(config.delete, {
    dot: true
  })
});

gulp.task('copy', function(){
  return gulp.src(config.copy)
  .pipe(gulp.dest(config.dist))
});

gulp.task('default', ['clean', 'copy', 'html', 'images', 'styles', 'scripts'], function () {
  browsersync(config.browsersync);
  gulp.watch([config.src + '/**/*.html'], ['html', reload]);
  gulp.watch([config.src + '/images/**/*'], ['images', reload]);
  gulp.watch([config.src + '/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch([config.src + '/scripts/**/*.js'], ['lint', 'scripts', reload]);
});
