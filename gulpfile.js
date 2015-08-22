var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var coffeelint = require('gulp-coffeelint');
var gulp       = require('gulp');
var jade       = require('gulp-jade');
var less       = require('gulp-less');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');

gulp.task('build', [
    'build-jade',
    'build-coffee',
    'build-less'
]);

gulp.task('build-coffee', function () {
    var b = browserify({
        debug: true,
        entries: './src/js/main.coffee'
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/'));
});

gulp.task('build-jade', function () {
    return gulp.src('./src/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./src/'));
});

gulp.task('build-less', function () {
    return gulp.src('./src/styles/stdtheme.less')
        .pipe(less())
        .pipe(gulp.dest('./src/styles/'));
});

gulp.task('default', function () {
    // Watch for Jade changes
    gulp.watch('./src/index.jade', ['build-jade']);
    gulp.watch('./src/views/*', ['build-jade']);
    // Watch for CoffeeScript changes
    gulp.watch('./src/js/*.coffee', ['build-coffee']);
    // Watch for LESS changes
    gulp.watch('./src/styles/stdtheme.less', ['build-less']);
});

gulp.task('lint', [
    'lint-coffee'
]);

gulp.task('lint-coffee', function() {
    return gulp.src('./src/js/*.coffee')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter());
});
