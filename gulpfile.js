var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './app'   
        }
    });
});

gulp.task('less', function () {
    return gulp.src('app/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['app/**/*.html', 'app/**/*.js'], function () {
        browserSync.reload(); 
    });
});