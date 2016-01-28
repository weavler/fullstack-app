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

// Copies index.html to 'dist' directory
gulp.task('copy', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('app/dist'));
});

// Scripts task 
gulp.task('scripts', function() {
  return gulp.src([
    'app/js/script.js'
    ])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
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


