var
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    coffeelint = require('gulp-coffeelint'),
    gulp       = require('gulp'),
    jade       = require('gulp-jade'),
    jadelint   = require('gulp-jadelint'),
    less       = require('gulp-less'),
    source     = require('vinyl-source-stream'),
    uglify     = require('gulp-uglify');

gulp.task('build', [
    'build-jade',
    'build-coffee',
    'build-less',
    'build-resources'
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
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build-jade', function () {
    return gulp.src('./src/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-less', function () {
    return gulp.src('./src/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('build-resources', function () {
    return gulp.src('./src/res/**/*')
        .pipe(gulp.dest('./dist/res/'));
});

gulp.task('default', function () {
    // Watch for Jade changes
    gulp.watch('./src/**/*.jade', ['build-jade']);
    // Watch for CoffeeScript changes
    gulp.watch('./src/js/*.coffee', ['build-coffee']);
    // Watch for LESS changes
    gulp.watch('./src/styles/*.less', ['build-less']);
});

gulp.task('lint', [
    'lint-coffee',
    'lint-jade'
]);

gulp.task('lint-coffee', function () {
    return gulp.src('./src/js/**/*.coffee')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter());
});

gulp.task('lint-jade', function () {
    return gulp.src('./src/**/*.jade')
        .pipe(jadelint());
});
