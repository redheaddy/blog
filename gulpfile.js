var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    htmlmin = require('gulp-htmlmin');

gulp.task('less',function(){
    return gulp.src('app/less/common.less')
            .pipe(less())
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(gulp.dest('app/css'));
});

gulp.task('scripts',function(){
    return gulp.src(['app/js/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest('app/js/min'))
});

gulp.task('htmlmin',function(){
    return gulp.src('app/html/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('app/html/min'));
});

gulp.task('imagemin', function(){
    return gulp.src('app/imgs/*')
            .pipe(imagemin({
            interlaced:true,
            progressive:true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
            }))
            .pipe(gulp.dest('dist/imgs'))
});

gulp.task('watch',['less'],function(){
    gulp.watch('app/less/*.less',['less']);
});

gulp.task('build',['less','scripts','htmlmin','imagemin'],function(){
    var buildCss = gulp.src('app/css/*.css')
                    .pipe(cssnano())
                    .pipe(gulp.dest('dist/css'));
    
    var buildJs = gulp.src('app/js/min/*.js')
                    .pipe(gulp.dest('dist/js'));
    
    var buildHtml = gulp.src('app/html/min/*.html')
                    .pipe(htmlmin())
                    .pipe(gulp.dest('dist/html'))
});