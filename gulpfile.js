var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var jade = require('gulp-pug');
var stylus = require('gulp-stylus');

var paths = {
  html: ['./app/**/*.jade'],
  js: ['./app/js-source/**/*.js'],
  css: ['./app/css-source/**/*.styl']
};

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: '3000',
    livereload: true
  });
});

gulp.task('css',function() {
  gulp.src(paths.css)
    .pipe(stylus())
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src(paths.js)
  //  .pipe(uglify())
    .pipe(gulp.dest('./app/js'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(jade())
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['connect', 'watch', 'js', 'html', 'css']);
