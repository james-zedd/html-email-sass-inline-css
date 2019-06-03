const { series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const inlineCss = require('gulp-inline-css');

// compile SASS into CSS and inject into browser
function compile(){
  return gulp.src('./src/sass/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./src/css'))
          .pipe(browserSync.stream())
  
};

// inline CSS and export to build folder
function inline(){
  return gulp.src('./src/index.html')
              .pipe(inlineCss({
                applyStyleTags: false,
                removeStyleTags: false
              }))
              .pipe(gulp.dest('./build'))
};

// watch for images and put in build folder
function img(){
  return gulp.src('./src/img/*')
              .pipe(gulp.dest('./build/img'))
};

// browserSync server plus watch scss/html files
function serve() {

  browserSync.init({
    server: './build'
  });

  gulp.watch('./src/sass/*.scss', series(compile, inline)).on('change', browserSync.reload);
  gulp.watch('./src/img/*', img).on('change', browserSync.reload);
  gulp.watch('./src/index.html', inline).on('change', browserSync.reload);

}

// gulp run
exports.default = serve;