// require gulp
var gulp = require('gulp');

// require other packages
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


//define paths of folder, project name
var paths = {
    js_dev: './source/js',
    js: './build/Jscripts',
    scss_dev: './source/scss',
    css: './build/App_Themes/css',
    html_dev: "./source/demo-html",
    html: "./build/demo-html",
    project_name: "kidy",
    plugins_dev: "./source/plugins",
    plugins: "./build/plugins",
    root_folder: "./build",
    fonts_dev: "./source/fonts",
    fonts: "./build/App_Themes/fonts",
    img_dev: "./source/img",
    img: "./build/App_Themes/img"
};

// scripts task
gulp.task('scripts', function() {
    return gulp.src([
            // import plugin
                paths.js_dev + '/vendor/modernizr.js',
                paths.js_dev + '/vendor/jquery.min.js',
                paths.js_dev + '/vendor/jquery-migrate.js',
                paths.js_dev + '/vendor/bootstrap.min.js',
                paths.js_dev + '/vendor/jquery.bxslider.min.js',
                paths.js_dev + '/vendor/jquery.matchHeight-min.js',
                paths.js_dev + '/vendor/jquery-ui.min.js' // jquery ui for sliderbar
            // end import plugin
        ])
        .pipe(concat(paths.project_name + '.js'))
        // .pipe(gulp.dest(paths.js)) // make normal js for debug
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.js))
        .pipe(browserSync.stream());
});

// styles task
gulp.task('styles', function() {
    gulp.src(paths.scss_dev + '/styles.scss')
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
            .pipe(sass())
            // .pipe(gulp.dest(paths.css)) // make normal css for debug
            .pipe(cssmin())
            .pipe(rename({
                basename: paths.project_name,
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.css))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
});


//copy folder plugin + fonts
gulp.task('copy', function() {
    gulp.src(paths.js_dev + '/**/*')
        .pipe(gulp.dest(paths.js));
    gulp.src(paths.html_dev + '/**/*')
        .pipe(gulp.dest(paths.html + '/'));
    gulp.src(paths.fonts_dev + '/**/*')
        .pipe(gulp.dest(paths.fonts));
    gulp.src(paths.img_dev + '/**/*')
        .pipe(gulp.dest(paths.img));
});

//delete folder root
gulp.task('delete', function() {
    gulp.src(paths.root_folder, { read: false })
        .pipe(clean());
});

// Static server
gulp.task('serve', ['scripts', 'styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false,
        ghostMode: {
            scroll: true
        }
    });
    gulp.watch('./source/js/**/*.js', ['copy']);
    gulp.watch('./source/scss/**/*.scss', ['styles']);
    gulp.watch(paths.html_dev + '/**/*.html', ['copy']);
    gulp.watch(paths.html + '/**/*.html').on('change', browserSync.reload);
});


gulp.task('default', ['copy', 'serve']);