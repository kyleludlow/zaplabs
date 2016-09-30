var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyHTML = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    gls = require('gulp-live-server');


// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['> 2%']
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('sass:prod', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
        browsers: ['> 2%']
    }))
    .pipe(gulp.dest('build/css'));
})

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'));
});

// Minify index
gulp.task('html:prod', function() {
  return gulp.src('src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/index.html', ['html']);
});

// start server
gulp.task('serve', function() {
  var server = gls.static('build', 8000);
  server.start().then(function(result) {
    process.exit(result.code);
  });

  gulp.watch(['build/css/main.css', 'build/index.html', 'build/js/app.js'], function(file) {
    server.notify.apply(server, [file]);
  });
})


// Default task
gulp.task('dev', ['html', 'sass', 'watch', 'serve']);

// Build task
gulp.task('build', ['sass:prod', 'html:prod']);
