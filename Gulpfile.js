/*jslint node: true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var neat = require('node-neat').includePaths;
var reload = browserSync.reload;

/* Paths for the assets folder */
var paths = {
  scripts: 'app/js/**/*.js', fonts: 'app/fonts/**/*',
  images: 'app/img/**/*', index: 'app/index.html',
  views: 'app/views/**/*', htmls: ['app/index.html', 'app/views/*.*' ]
};

// Copies images to static folder
gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('static/img'));
});

// Copies images to static folder
gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('static/fonts'));
});

// Copies images to static folder
gulp.task('views', function () {
  return gulp.src(paths.views)
    .pipe(gulp.dest('templates/views'));
});

// Copies index.html to 'templates' directory
gulp.task('copy', ['images', 'fonts', 'views'], function () {
  return gulp.src(paths.htmls)
    .pipe(gulp.dest('templates'));
});

// Scripts task
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('allscripts.js'))
    .pipe(gulp.dest('static/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'));
});

// Sass task 
gulp.task('sass', function () {
    gulp.src('app/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({
        includePaths: ['scss'].concat(neat)
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/css'))
    // Reload the browser CSS after every change 
    .pipe(reload({stream:true}));
});

// Reload task 
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Prepare browser-sync for localhost 
gulp.task('serve', ['copy', 'scripts', 'sass'], function() {
    browserSync.init(['css/*.css', 'js/*.js'], {
        server: {
            baseDir: './app'
        }
    });
});

// Watch scss, js and html files, doing different things with each. 
gulp.task('default', ['serve'], function () {
    gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass'])
    gulp.watch(['app/js/script.js'], ['scripts'])
    gulp.watch(['*.html'], ['bs-reload']);
});


