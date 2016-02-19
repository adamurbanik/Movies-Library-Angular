var gulp = require('gulp'),
    connect = require('gulp-connect'),
    mainBowerFiles = require('gulp-main-bower-files'),
    concat = require('gulp-concat'),
    less = require('gulp-less');

gulp.task('less', function () {
    gulp.src('./app/less/main.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./app/css'))
        .pipe(connect.reload());
});

gulp.task('css-vendor', function () {
    gulp
        .src([
            "./bower_components/bootstrap/dist/css/bootstrap.min.css",
            "./bower_components/bootstrap/dist/css/bootstrap-theme.min.css"
        ])

        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('bower', function () {
    gulp.src([
            "./bower_components/jquery/dist/jquery.min.js",
            "./bower_components/bootstrap/dist/js/bootstrap.min.js",
            "./bower_components/angular/angular.min.js",
            "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "./bower_components/lodash/dist/lodash.min.js",
        ])
        // .pipe(mainBowerFiles(new RegExp('/*.js/')))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./app/js/'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});


gulp.task('html', function () {
    gulp.src('./app/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./app/src/**/*.js')
        // .pipe(concat('app.js'))
        // .pipe(gulp.dest('./app/js/'))
        .pipe(connect.reload());
});



gulp.task('watch', function () {
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/**/*.js'], ['js']);
    gulp.watch(['./app/**/*.less'], ['less']);
});

// gulp.task('default', ['css-vendor', 'js', 'bower', 'less', 'connect', 'watch']);
gulp.task('default', ['connect', 'watch']);