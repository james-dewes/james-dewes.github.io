var paths = {};
// Directory locations.
paths.assetsDir        = '_assets/';      // The files Gulp will handle.
paths.jekyllDir        = '';              // The files Jekyll will handle.
paths.jekyllAssetsDir  = 'assets/';       // The asset files Jekyll will handle.
paths.siteDir          = '_site/';        // The resulting static site.
paths.siteAssetsDir    = '_site/assets/'; // The resulting static site's assets.

// Folder naming conventions.
paths.postFolder   = '_posts';
paths.fontFolder   = 'fonts';
paths.imageFolder  = 'img';
paths.scriptFolder = 'js';
paths.stylesFolder = 'styles';
paths.iconFolder = 'icons';

// Asset files locations.
paths.sassFiles   = paths.assetsDir + paths.stylesFolder;
paths.jsFiles     = paths.assetsDir + paths.scriptFolder;
paths.imageFiles  = paths.assetsDir + paths.imageFolder;
paths.fontFiles   = paths.assetsDir + paths.fontFolder;
paths.iconFiles   = paths.assetsDir + paths.iconFolder;

// Jekyll files locations.
paths.jekyllPostFiles  = paths.jekyllDir       + paths.postFolder;
paths.jekyllCssFiles   = paths.jekyllAssetsDir + paths.stylesFolder;
paths.jekyllJsFiles    = paths.jekyllAssetsDir + paths.scriptFolder;
paths.jekyllImageFiles = paths.jekyllAssetsDir + paths.imageFolder;
paths.jekyllFontFiles  = paths.jekyllAssetsDir + paths.fontFolder;
paths.jekyllIconFiles  = paths.jekyllAssetsDir + paths.iconFolder;

// Site files locations.
paths.siteCssFiles   = paths.siteAssetsDir + paths.stylesFolder;
paths.siteJsFiles    = paths.siteAssetsDir + paths.scriptFolder;
paths.siteImageFiles = paths.siteAssetsDir + paths.imageFolder;
paths.siteFontFiles  = paths.siteAssetsDir + paths.fontFolder;
paths.siteIconFiles  = paths.siteAssetsDir + paths.iconFolder;

// Glob patterns by file type.
paths.sassPattern     = '/**/*.scss';
paths.jsPattern       = '/**/*.js';
paths.imagePattern    = '/**/*.+(jpg|jpeg|png|svg|gif|webp|tif)';
paths.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern     = '/**/*.html';
paths.fontPattern     = '/**/*.+(otf|ttf)';
paths.iconPattern    = '/**/*.svg';

// Asset files globs
paths.sassFilesGlob  = paths.sassFiles  + paths.sassPattern;
paths.jsFilesGlob    = paths.jsFiles    + paths.jsPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.fontFilesGlob  = paths.fontFiles  + paths.fontPattern;
paths.iconFilesGlob  = paths.iconFiles  + paths.iconPattern;

// Jekyll files globs
paths.jekyllPostFilesGlob  = paths.jekyllPostFiles  + paths.markdownPattern;
paths.jekyllHtmlFilesGlob  = paths.jekyllDir        + paths.htmlPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;
module.exports = paths;