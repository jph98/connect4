// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var browserify = require('gulp-browserify');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('*.js', ['lint', 'scripts']);
});

gulp.task('browse', function() {
	gulp.src('connect4-console.js')
        .pipe(browserify({
            basedir: './',
            debug: !util.env.production
        }))
        .pipe(concat('connect4-module.js'))
        .pipe(gulp.dest('.'))
});

// Default Task
gulp.task('default', ['lint', 'test']);