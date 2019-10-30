const gulp = require('gulp');

// Rollup plugins for ES6+ and bundle generator
const rollup = require('gulp-better-rollup');
const babelRollup = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

// JS plugins
const terser = require('gulp-terser');
const jshint = require('gulp-jshint');
const jshintStylish = require('jshint-stylish');

// HTML plugins
const htmlmin = require('gulp-htmlmin');
const htmlReplace = require('gulp-html-replace');
const critical = require('critical').stream;

// CSS plugins
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

// IMG plugins
const imagemin = require('gulp-imagemin');

// Gulp utilities
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const wait = require('gulp-wait');

// BrowserSync server
const browserSync = require('browser-sync').create();

/**
 * Tasks for Development process
 *
 *
 */

// Watch project for development in localhost:3000
function watch() {

    browserSync.init({
        
        server: {
            baseDir: './'
        },  
    })

    gulp.watch('./app/scss/**/*.scss').on('change', function() {

        gulp.src('./app/scss/index.scss')
            .pipe(wait(500))
            .pipe(sass({includePaths: './app/scss'}))
            .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
            .pipe(rename('styles.css'))
            .pipe(gulp.dest('app/css/'))
            .pipe(browserSync.stream());
    });

    gulp.watch('./app/**/*.js').on('change', function(path) {
        console.log("Verified file: " + path);

        gulp.src(path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish))
    });

    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./app/scss/**/*.scss').on('change', browserSync.reload);
    gulp.watch('./app/**/*.js').on('change', browserSync.reload);
}

function processSASSDev() {
    return gulp.src('app/scss/index.scss')
    .pipe(sass())
    .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./app/css'));
}

/**
 * Tasks for Build Production process 
 *
 *
 */

// Delete clean dist folder to prevent wrong files
function cleanDist() {
    return gulp.src('dist', { allowEmpty: true })
        .pipe(clean());
}

// Copy listed files to dist folder during build-prod
function copySRCfiles() {
    return gulp.src(['index.html', 'service-worker.js', 'app.manifest', 'favicon.ico'])
        .pipe(gulp.dest('dist'))
}

// Minify HTML
function minifyHTML() {
    return gulp.src('dist/index.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'));
}

// Replace named blocks in index (src)
function replaceHTML() {
    return gulp.src('dist/index.html')
        .pipe(htmlReplace({
            'css': 'styles.css',
            'js': 'app.js'
        }))
    .pipe(gulp.dest('dist'));
}

// Create bundle.js using Rollup with babel to ES6+
function createBundleJS() {
    const pluginsList = [
        babelRollup(),
        resolve(),
        commonjs()
    ];

    return gulp.src('app/**/*.js')
        .pipe(rollup({ input: 'app/app.js', plugins: pluginsList }, 'umd'))
        .pipe(gulp.dest('dist'));
}

// Minify JS with terser plugin
function minifyJS() {
    return gulp.src('dist/*.js')
        .pipe(terser())
        .pipe(gulp.dest('dist'));
}

// Process SASS/SCSS files to css
function processSASS() {
    return gulp.src('app/scss/index.scss')
        .pipe(sass())
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('dist'));
}

function optimizeCSS() {
    const plugins = [
        autoprefixer(),
        cssnano()
    ];

    return gulp.src('dist/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist'));
}

function minifyIMG() {
    return gulp.src('app/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
}

// Extract critical Css to prevent browser FOUC and improve page loading in user sensitivity view browser area
function criticalCSS() {
    return gulp.src('dist/index.html')
        .pipe(critical({
            inline: true,
            base: 'dist',
            src: 'index.html',
            dest: 'index.html',
            minify: true,
            width: 320,
            height: 480
        }))
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('dist'));
}

// Export tasks
exports.watch = gulp.series(processSASSDev, watch);
exports.build = gulp.series(cleanDist, copySRCfiles, replaceHTML, minifyHTML, createBundleJS, minifyJS, processSASS, optimizeCSS, minifyIMG, criticalCSS);

exports.default = gulp.series(processSASSDev, watch);