const gulp = require("gulp");
const {src, dest} = require("gulp");
const less = require("gulp-less");
const minifyCSS = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();

function css() {

    return src("less/*")
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest("css"))
    .pipe(browserSync.stream())
};

function miniImg() {

    return src("images/*")
    .pipe(imagemin())
    .pipe(dest("resizedImg"))
}

function watch(){
    
    browserSync.init({
                     
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./less/*", css);
    gulp.watch("./images/*").on('change', miniImg);
    gulp.watch("./resizedImg/*").on("change", browserSync.reload);
    gulp.watch("./*.html").on("change", browserSync.reload);
}

gulp.task('default', gulp.series(miniImg,css,minify,watch))
