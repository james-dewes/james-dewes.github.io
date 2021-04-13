// Gulpfile.js
/**
 * Created by Brett Stevenson (https://brettstevenson.io/)
 * src: https://gist.github.com/tterb/9bd8e94eb094f1f38fc3dd33a250a2ed
 */

// Gulpfile.js

const autoprefixer = require('autoprefixer');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const cssnano      = require('cssnano');
const del          = require('del');
const gulp         = require('gulp');
const gutil        = require('gulp-util');
const imagemin     = require('gulp-imagemin');
const pngquant     = require('imagemin-pngquant');
const postcss      = require('gulp-postcss');
const rename       = require('gulp-rename');
const run          = require('gulp-run');
const sass         = require('gulp-sass');
const uglify       = require('gulp-uglify-es').default;

// Include paths file
const paths = require('./_assets/gulp-config/paths');
const { series } = require('gulp');
const { sassFiles } = require('./_assets/gulp-config/paths');
sass.compiler = require('node-sass');
// const result = require('autoprefixer/data/prefixes');

// Process styles, add vendor-prefixes, minify, then
// output the file to the appropriate location
gulp.task('build:styles:main', function(callback) { 
    gulp.src(paths.sassFiles + '/main.scss')
    .pipe(sass({
      style: 'compressed',
      trace: true,
      loadPath: [paths.sassFiles]
    })
    .on('error', gutil.log))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
    callback();
});

// Create and process critical CSS file to be included in head.html
gulp.task('build:styles:critical', function(callback) {
  gulp.src(paths.sassFiles + '/critical.scss')
    .pipe(sass({
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
      })
      .on('error', gutil.log))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('_includes'))
    .on('error', gutil.log);
  callback();
});

// Build all styles
gulp.task('build:styles', series('build:styles:main', 'build:styles:critical'));

// Delete CSS
gulp.task('clean:styles', function(callback) {
  del([paths.jekyllCssFiles + '/main.css',
    paths.siteCssFiles + '/main.css',
    '_includes/critical.css'
  ]);
  callback();
});

// Concatenate and uglify global JS files and output the
// result to the appropriate location
gulp.task('build:scripts:global', function() {
  return gulp.src([
    paths.jsFiles + '/lib' + paths.jsPattern,
    paths.jsFiles + '/*.js'
  ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    .on('error', gutil.log);
});

// Uglify local JS files and output the result to the
// appropriate location
gulp.task('build:scripts:local', function() {
  return gulp.src(paths.jsFiles + '/local' + paths.jsPattern)
    .pipe(uglify())
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    .on('error', gutil.log);
});

// Build all scripts
gulp.task('build:scripts', series('build:scripts:local', 'build:scripts:global', 'build:scripts:local'));

// Delete processed JS
gulp.task('clean:scripts', function(callback) {
  del([paths.jekyllJsFiles + 'main.js', paths.siteJsFiles + 'main.js']);
  callback();
});

// Place fonts in proper location
gulp.task('fonts', function() {
  return gulp.src(paths.fontFilesGlob)
    .pipe(rename(function(path) {path.dirname = '';}))
    .pipe(gulp.dest(paths.jekyllFontFiles))
    .pipe(gulp.dest(paths.siteFontFiles))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
});

// Copy fonts
gulp.task('build:fonts', series('fonts'));


// Delete processed font files
gulp.task('clean:fonts', function(callback) {
  del([paths.jekyllFontFiles, paths.siteFontFiles]);
  callback();
});

// Delete processed icon files
gulp.task('clean:icons', function(callback) {
  del([paths.jekyllIconFiles, paths.siteIconFiles]);
  callback();
});

// Optimize and copy image files
gulp.task('build:images', function() {
  return gulp.src(paths.imageFilesGlob)
    .pipe(imagemin({ 
      optimizationLevel: 3, 
      progressive: true, 
      interlaced: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(browserSync.stream());
});

// Delete processed images
gulp.task('clean:images', function(callback) {
  del([paths.jekyllImageFiles, paths.siteImageFiles]);
  callback();
});

// Place download files in proper location
gulp.task('build:downloads', function() {
  return gulp.src(paths.downloadFiles + '/**/*.zip')
    .pipe(rename(function(path) {path.dirname = '';}))
    .pipe(gulp.dest(paths.jekyllDownloadFiles))
    .pipe(gulp.dest(paths.siteDownloadFiles))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
});

// Delete processed download files
gulp.task('clean:downloads', function(callback) {
  del([paths.jekyllDownloadFiles, paths.siteDownloadFiles]);
  callback();
});

// Run jekyll build command
gulp.task('build:jekyll', function() {
  return gulp.src('.*')
    .pipe(run('bundle exec jekyll build --config _config.yml'))
    .on('error', gutil.log);
});

// Delete the entire _site directory
gulp.task('clean:jekyll', function(callback) {
  del(['_site']);
  callback();
});

// Runs jekyll build command using test config.
gulp.task('build:jekyll:test', function() {
  var shellCommand = 'bundle exec jekyll build --config _config.yml, _config.test.yml';
  return gulp.src('')
    .pipe(run(shellCommand))
    .on('error', gutil.log);
});

// Run jekyll build command using local config
gulp.task('build:jekyll:local', function() {
  return gulp.src('*')
    .pipe(run('bundle exec jekyll build'))
    .on('error', gutil.log);
});

// Special tasks for building and reloading BrowserSync
gulp.task('build:jekyll:watch', series('build:jekyll:local', function(callback) {
  browserSync.reload();
  callback();
}));

gulp.task('build:scripts:watch', series('build:scripts', function(callback) {
  browserSync.reload();
  callback();
}));

//copy icons
gulp.task('build:icons', function() {
  return gulp.src(paths.iconFilesGlob)
    .pipe(gulp.dest(paths.jekyllIconFiles))
    .pipe(gulp.dest(paths.siteIconFiles))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
});

// Build site
gulp.task('build', function(callback) {
            series('build:scripts', 'build:styles', 'build:images', 'build:fonts', 'build:icons', 'build:jekyll')();
            callback();
          });

gulp.task('build:test', function(callback){series('clean', 'build:scripts', 'build:images', 'build:styles', 'build:fonts', 'build:icons', 
          'build:jekyll:test', callback)});

// Deletes _site directory and processed assets
gulp.task('clean', series('clean:jekyll', 'clean:styles', 'clean:scripts', 'clean:images', 'clean:fonts', 'clean:icons'));

// Default Task: build site
gulp.task('default', series('build'));

// Serve site and watch files
gulp.task('serve', series('build', function() {
  browserSync.init({
    server: paths.siteDir,
    ghostMode: false, // Toggle to mirror clicks, reloads etc (performance)
    logFileChanges: true,
    logLevel: 'debug',
    open: true       // Toggle to auto-open page when starting
  });
  gulp.watch(['_config.yml'], series('build:jekyll:watch'));
  // Watch .scss files and pipe changes to browserSync
  gulp.watch('_assets/styles/**/*.scss', series('build:styles'));
  // Watch .js files
  gulp.watch('_assets/js/**/*.js', series('build:scripts:watch'));
  // Watch image files and pipe changes to browserSync
  gulp.watch('_assets/img/**/*', series('build:images'));
  // Watch posts
  gulp.watch('_posts/**/*.+(md|markdown|MD)', series('build:jekyll:watch'));
  // Watch drafts if --drafts flag was passed
  if (module.exports.drafts) {
    gulp.watch('_drafts/*.+(md|markdown|MD)', series('build:jekyll:watch'));
  }
  // Watch html and markdown files
  gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*'], series('build:jekyll:watch'));
  // Watch RSS feed
  gulp.watch('feed.xml', series('build:jekyll:watch'));
  // Watch data files
  gulp.watch('_data/**.*+(yml|yaml|csv|json)', series('build:jekyll:watch'));
}));