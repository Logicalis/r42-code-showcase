var gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('tests.run', function () {
    return gulp.src('spec/**/*[sS]pec.js')
        .pipe(jasmine({verbose:true}));
});

gulp.task('tests.watch', function () {
    gulp.watch('lib/**/*.js', ['tests.run']);
});
