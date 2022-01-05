const gulp = require('gulp');
const {src, dest} = require("gulp")
const concat = require('gulp-concat');
const del = require('del')

const floMotionJS = () => {
    return src("./floMotion/**/*.js")
    .pipe(concat('all.js'))
    .pipe(dest('./floMotion/dist'))
}

const courseDashJS = () => {
    return src("./courseHomePage/**/*.js")
    .pipe(concat('all.js'))
    .pipe(dest('./courseHomePage/dist'))
}




exports.floMotionJS = floMotionJS;
exports.courseDashJS = courseDashJS;
