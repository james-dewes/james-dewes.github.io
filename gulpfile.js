// Gulpfile.js
/**
 * Created by Brett Stevenson (https://brettstevenson.io/)
 * src: https://gist.github.com/tterb/9bd8e94eb094f1f38fc3dd33a250a2ed
 */

// Gulpfile.js

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const { deleteSync: del } = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin').default;
const pngquant = require('imagemin-pngquant').default;
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;

// Include paths file
const paths = require('./_assets/gulp-config/paths');
const { series } = require('gulp');
const { sassFiles } = require('./_assets/gulp-config/paths');
// const result = require('autoprefixer/data/prefixes');

// Process styles, add vendor-prefixes, minify, then
// output the file to the appropriate location
gulp.task('build:styles:main', function (callback) {
  gulp.src(paths.sassFiles + '/main.scss')
    .pipe(sass({
      style: 'compressed',
      trace: true,
      loadPath: [paths.sassFiles]
    })
      .on('error', console.error))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .pipe(browserSync.stream())
    .on('error', console.error);
  callback();
});

// Create and process critical CSS file to be included in head.html
gulp.task('build:styles:critical', function (callback) {
  gulp.src(paths.sassFiles + '/critical.scss')
    .pipe(sass({
      style: 'compressed',
      trace: true,
      loadPath: [paths.sassFiles]
    })
      .on('error', console.error))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('_includes'))
    .on('error', console.error);
  callback();
});

// Build all styles
gulp.task('build:styles', series('build:styles:main', 'build:styles:critical'));

// Delete CSS
gulp.task('clean:styles', function (callback) {
  del([paths.jekyllCssFiles + '/main.css',
  paths.siteCssFiles + '/main.css',
    '_includes/critical.css'
  ]);
  callback();
});

// Concatenate and uglify global JS files and output the
// result to the appropriate location
gulp.task('build:scripts:global', function () {
  const fs = require('fs');
  const srcPatterns = [paths.jsFiles + '/*.js'];

  // Add lib directory if it exists
  if (fs.existsSync(paths.jsFiles + '/lib')) {
    srcPatterns.unshift(paths.jsFiles + '/lib' + paths.jsPattern);
  }

  return gulp.src(srcPatterns, { allowEmpty: true })
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    .on('error', console.error);
});

// Uglify local JS files and output the result to the
// appropriate location
gulp.task('build:scripts:local', function () {
  const fs = require('fs');
  const localPath = paths.jsFiles + '/local';

  // Skip if local directory doesn't exist
  if (!fs.existsSync(localPath)) {
    return Promise.resolve();
  }

  return gulp.src(localPath + paths.jsPattern, { allowEmpty: true })
    .pipe(uglify())
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    .on('error', console.error);
});

// Build all scripts
gulp.task('build:scripts', series('build:scripts:local', 'build:scripts:global', 'build:scripts:local'));

// Delete processed JS
gulp.task('clean:scripts', function (callback) {
  del([paths.jekyllJsFiles + 'main.js', paths.siteJsFiles + 'main.js']);
  callback();
});

// Place fonts in proper location
gulp.task('fonts', function () {
  return gulp.src(paths.fontFilesGlob)
    .pipe(rename(function (path) { path.dirname = ''; }))
    .pipe(gulp.dest(paths.jekyllFontFiles))
    .pipe(gulp.dest(paths.siteFontFiles))
    .pipe(browserSync.stream())
    .on('error', console.error);
});

// Copy fonts
gulp.task('build:fonts', series('fonts'));


// Delete processed font files
gulp.task('clean:fonts', function (callback) {
  del([paths.jekyllFontFiles, paths.siteFontFiles]);
  callback();
});

// Delete processed icon files
gulp.task('clean:icons', function (callback) {
  del([paths.jekyllIconFiles, paths.siteIconFiles]);
  callback();
});

// Optimize and copy image files
gulp.task('build:images', function () {
  return gulp.src(paths.imageFilesGlob)
    .pipe(imagemin([
      pngquant({ quality: [0.65, 0.8] })
    ]))
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(browserSync.stream());
});

// Delete processed images
gulp.task('clean:images', function (callback) {
  del([paths.jekyllImageFiles, paths.siteImageFiles]);
  callback();
});

// Place download files in proper location
gulp.task('build:downloads', function () {
  const fs = require('fs');

  // Skip if downloads directory doesn't exist
  if (!fs.existsSync(paths.downloadFiles)) {
    return Promise.resolve();
  }

  return gulp.src(paths.downloadFiles + '/**/*.zip', { allowEmpty: true })
    .pipe(rename(function (path) { path.dirname = ''; }))
    .pipe(gulp.dest(paths.jekyllDownloadFiles))
    .pipe(gulp.dest(paths.siteDownloadFiles))
    .pipe(browserSync.stream())
    .on('error', console.error);
});

// Delete processed download files
gulp.task('clean:downloads', function (callback) {
  del([paths.jekyllDownloadFiles, paths.siteDownloadFiles]);
  callback();
});

// Run jekyll build command
gulp.task('build:jekyll', function (callback) {
  const { exec } = require('child_process');
  exec('bundle exec jekyll build --config _config.yml', (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      callback(error);
      return;
    }
    if (stderr) console.error(stderr);
    if (stdout) console.log(stdout);
    callback();
  });
});

// Delete the entire _site directory
gulp.task('clean:jekyll', function (callback) {
  del(['_site']);
  callback();
});

// Runs jekyll build command using test config.
gulp.task('build:jekyll:test', function (callback) {
  const { exec } = require('child_process');
  const shellCommand = 'bundle exec jekyll build --config _config.yml,_config.test.yml';
  exec(shellCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      callback(error);
      return;
    }
    if (stderr) console.error(stderr);
    if (stdout) console.log(stdout);
    callback();
  });
});

// Run jekyll build command using local config
gulp.task('build:jekyll:local', function (callback) {
  const { exec } = require('child_process');
  exec('bundle exec jekyll build', (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      callback(error);
      return;
    }
    if (stderr) console.error(stderr);
    if (stdout) console.log(stdout);
    callback();
  });
});

// Special tasks for building and reloading BrowserSync
gulp.task('build:jekyll:watch', series('build:jekyll:local', function (callback) {
  browserSync.reload();
  callback();
}));

gulp.task('build:scripts:watch', series('build:scripts', function (callback) {
  browserSync.reload();
  callback();
}));

//copy icons
gulp.task('build:icons', function () {
  return gulp.src(paths.iconFilesGlob)
    .pipe(gulp.dest(paths.jekyllIconFiles))
    .pipe(gulp.dest(paths.siteIconFiles))
    .pipe(browserSync.stream())
    .on('error', console.error);
});

// Build site
gulp.task('build', series('build:scripts', 'build:styles', 'build:images', 'build:fonts', 'build:icons', 'build:downloads', 'build:jekyll'));

gulp.task('build:test', function (callback) {
  series('clean', 'build:scripts', 'build:images', 'build:styles', 'build:fonts', 'build:icons',
    'build:downloads', 'build:jekyll:test', callback)
});

// Deletes _site directory and processed assets
gulp.task('clean', series('clean:jekyll', 'clean:styles', 'clean:scripts', 'clean:images', 'clean:fonts', 'clean:icons'));

// Default Task: build site
gulp.task('default', series('build'));

// Serve site and watch files
gulp.task('serve', series('build', function () {
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