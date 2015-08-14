var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var gulp       = require('gulp');
var less       = require('gulp-less');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');

gulp.task('build-js', function () {
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

gulp.task('build-less', function () {
    return gulp.src('./src/styles/stdtheme.less')
        .pipe(less())
        .pipe(gulp.dest('./src/styles/'));
});

gulp.task('build', function () {
    gulp.run('build-js');
    gulp.run('build-less');
});

gulp.task('default', function () {
    // Watch for JS changes
    gulp.watch('./src/js/*', ['build-js']);
    // Watch for LESS changes
    gulp.watch('./src/styles/stdtheme.less', ['build-less']);
});
