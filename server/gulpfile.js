const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function () {
    return gulp.src(['./**/*.js', '!node_modules','!apidoc/**','!apidoc', '!node_modules/**'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});
