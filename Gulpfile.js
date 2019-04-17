/*
Author: Rumbiiha Swaibu
Website: Sassybootstrap.com
Email :admin@bootstrap.com or rumbiihas@gmail.com
Repository:https://github.com/swaibat/sassadminlite
License:https://github.com/swaibat/sassadminlite/blob/master/LICENSE
*/

"use strict";
// Load plugins
const autoprefixer = require("gulp-autoprefixer"),
      browsersync = require("browser-sync").create(),
      cache = require('gulp-cache'),
      cleanCSS = require("gulp-clean-css"),
      del = require("del"),
      imagemin = require('gulp-imagemin'),
      gulp = require("gulp"),
      panini = require("panini"),
      merge = require("merge-stream"),
      plumber = require("gulp-plumber"),
      rename = require("gulp-rename"),
      sass = require("gulp-sass"),
      uglify = require("gulp-uglify");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}
// html tasks
function html() {
  return gulp
    .src('src/pages/**/*.html')
    .pipe(panini({
        root: 'src/pages/',
        layouts: 'src/layouts/',
        partials: 'src/partials/',
        helpers: 'src/helpers/',
        data: 'src/data/'
    }))
    .pipe(gulp.dest('dist'))
}
// reset page 
function htmlReset(done) {
  panini.refresh();
  done();
}

// Clean dist
function clean() {
  return del(["./dist/"]);
}


function modules() {
  // Bootstrap JS
  var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./dist/assets/bootstrap/js'));
  // ChartJS
  var chartJS = gulp.src('./node_modules/chart.js/dist/*.min.js')
    .pipe(gulp.dest('./dist/assets/vendors/chartjs/'));
  // fontawesome 
  var webfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('./dist/assets/webfonts/'));

  // dataTables
  var dataTables = gulp.src([
      './node_modules/datatables.net/js/*.min.js',
      './node_modules/datatables.net-bs4/js/*.min.js',
      './node_modules/datatables.net-bs4/css/*.min.css'
    ])
    .pipe(gulp.dest('./dist/assets/vendor/datatables'));
  // jQuery Easing
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./dist/assets/vendors/jquery-easing'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./dist/assets/vendors/jquery'));
  return merge(bootstrapJS, chartJS, dataTables, webfonts, jquery, jqueryEasing);
}

// CSS task
function styles() {
  return gulp
    .src("./src/assets/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(browsersync.stream());
}

// JS task
function scripts() {
  return gulp
    .src([
      './src/assets/js/*.js',
      '!./src/assets/js/*.min.js',
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
}

// media tasks
function images () {
  return gulp
    .src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin ([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))) 
    .pipe(gulp.dest('dist/assets/img/'));
};

// watch tasks
function watchfiles() {
  gulp.watch("./src/assets/scss/**/*",gulp.series(htmlReset,styles,browserSyncReload));
  gulp.watch("./src/assets/js/**/*", scripts);
  gulp.watch('src/pages/**/*', html);
  gulp.watch('src/assets/img/**/*', images);
  gulp.watch('src/{layouts,includes,helpers,partials}/**/*', gulp.series(htmlReset,html,browserSyncReload));
}
const build = gulp.series(clean, gulp.parallel(html,styles,scripts,modules,images));
exports.default = gulp.series(build, gulp.parallel(browserSync,watchfiles));