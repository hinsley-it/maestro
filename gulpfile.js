var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');

gulp.task('build', function () {
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
