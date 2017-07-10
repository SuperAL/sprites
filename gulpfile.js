var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require("gulp-rename"),
  nano = require('gulp-cssnano'),
  cache = require('gulp-cache'),
  spritesmith = require('gulp.spritesmith');

// Static server
gulp.task('bs', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    files: ["css/style.css", "index.html"]
  });
});

gulp.task('rename', function() {
  return gulp.src('css/style.css')
    .pipe(rename({
      suffix: 's'
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('sprite', function() {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgPath: '../images/sprite.png',
    padding: 4
  }));
  return spriteData.pipe(gulp.dest('images'));
});

// sprite-handlebars-template
gulp.task('sprite-h', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    cssTemplate: 'handlebarsStr.css.handlebars',
    imgPath: '../images/sprite.png',
    padding: 4
  }));
  return spriteData.pipe(gulp.dest('images'));
});

gulp.task('css', function() {
  return gulp.src('css/styles.css')
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(nano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function() {
  gulp.src('images/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin({
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/images'));
});
