var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var image = require('gulp-image');
var neat = require('node-neat').includePaths;
var reload = browserSync.reload;

// Copies index.html to 'dist' directory
gulp.task('copy', function() {
  return gulp.src('client/index.html')
    .pipe(gulp.dest('client/dist'));
});

// Copy templates
gulp.task('copy-templates', function() {
  return gulp.src('client/templates/*.html')
    .pipe(gulp.dest('client/dist/templates'));
});

// Copy fonts
gulp.task('copy-fonts', function() {
  return gulp.src('client/assets/fonts/*/*')
    .pipe(gulp.dest('client/dist/assets/fonts'));
});

// Copy icons
gulp.task('copy-icons', function() {
  return gulp.src('client/assets/icons/*.svg')
    .pipe(gulp.dest('client/dist/assets/icons'));
});

// Scripts task 
gulp.task('scripts', function() {
  return gulp.src(['./client/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./client/dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/js'));
});

// Sass task 
gulp.task('sass', function () {
    return gulp.src('./client/scss/style.scss')
    .pipe(plumber())
    .pipe(sass({
        includePaths: ['scss'].concat(neat)
    }))
    .pipe(gulp.dest('./client/dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./client/dist/css'))
    // Reload the browser CSS after every change 
    .pipe(browserSync.stream());
});

// Images task
gulp.task('image', function () {
  gulp.src('client/assets/img/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    }))
    .pipe(gulp.dest('./client/dist/assets/img'));
});

// Reload task 
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Watch scss & html files
gulp.task('watch', function () {
  gulp.watch(['client/scss/**/*.scss'], ['sass']);
  gulp.watch(['client/*.html'], ['bs-reload', 'copy']);  
});

// Prepare browser-sync for localhost 
gulp.task('serve', ['copy', 
                    'copy-templates', 
                    'copy-fonts', 
                    'copy-icons', 
                    'scripts', 
                    'sass', 
                    'image'], 
  function () {
    browserSync.init(['css/*.css', 'js/*.js'], {
      server: {
          baseDir: './client/dist'
    }
  });
});

// Watch scss, js and html files, doing different things with each. 
gulp.task('default', ['serve', 'watch']);


