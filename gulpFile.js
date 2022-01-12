const gulp = require('gulp');
const {src, dest} = require("gulp")
const concat = require('gulp-concat');
var clipboard = require("gulp-clipboard");
var del = require('del');


gulp.task('floMotionJS', function () {
    return src("./floMotion/**/*.js")
    .pipe(concat('floMotion.js'))
    .pipe(dest('./dist'))
    .pipe(clipboard())
})

gulp.task('courseDashJS', function () {
    return src("./courseHomePage/**/*.js")
    .pipe(concat('courseDash.js'))
    .pipe(dest('./dist'))
    .pipe(clipboard())
})

gulp.task('cleanCourseDash', function(){
    return del(['./dist/courseDash.js']);
});

gulp.task('cleanFloMotion', function(){
    return del(['./dist/floMotion.js']);
});



gulp.task('run', gulp.series('courseDashJS','floMotionJS'));

gulp.task('watch', function(){
    gulp.watch('./courseHomePage/**/*.js', gulp.series('cleanCourseDash','courseDashJS'));
    gulp.watch('./floMotion/**/*.js', gulp.series('cleanFloMotion','floMotionJS'));
})

gulp.task('default', gulp.series('run', 'watch'))


