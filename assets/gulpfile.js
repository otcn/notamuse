var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './sass/**/*.scss';
var output = './css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function() {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(output));
});

gulp.task('watch', function() {
  gulp.watch(input, ['sass']);
});

gulp.task('default', ['watch', 'scripts', 'images']);
