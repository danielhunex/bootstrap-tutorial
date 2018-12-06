var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
//compile the sass files and then sync with changes with the browser using browser-sync
gulp.task('sass', function () {
    return gulp.src(['src/scss/*.scss', 'src/scss/bootstrap-ext/bootstrap-ext.scss'])
        .pipe(sass())
        .pipe(csso())
        .pipe(postCss([autoprefixer()]))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
//move the required javascripts to the src/scripts
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'   ])
        .pipe(gulp.dest('src/scripts'))
        .pipe(browserSync.stream())
});
//Initialize the browser-sync and watch files changes to reload the browser
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss', 'src/scss/bootstrap-ext/*.scss'], ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});
//create a default command to exectute -- on command promopt running 'gulp' ( without quotes) should exectue the task js and serve
gulp.task('default', ['js', 'serve'])