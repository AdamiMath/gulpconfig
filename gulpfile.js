    const gulp = require('gulp');
    const sass = require('gulp-sass')(require('sass'));
    const autoprefixer = require('gulp-autoprefixer');
    const browserSync = require('browser-sync').create();
    const concat = require('gulp-concat');
    const babel = require('gulp-babel');
    const uglify = require('gulp-uglify');



    function compilaSass(){
        return gulp.src('css/scss/*.scss').pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
    }

    // gulp.task('sass', compilaSass);

    exports.compilaSass = compilaSass;

    //Função para juntar o JS
    function gulpJS(){
        return gulp.src('js/main/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        })).pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream())

    }

    // gulp.task('mainjs', gulpJS);

    exports.gulpJS = gulpJS;

    //Js Plugins

    function pluginJs(){
        return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream())
    }

    // gulp.task('pluginsJs', pluginJs);

    exports.pluginJs = pluginJs;

    function browser(){
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
    }

    // gulp.task('browser-sync', browser);

    exports.browser = browser;

    function watch(){
        gulp.watch('css/scss/*.scss', compilaSass);
        gulp.watch('js/main/*js', gulpJS);
        gulp.watch('js/plugins/*js', pluginJs);

        gulp.watch('*.html').on('change', browserSync.reload);

    }

    // gulp.task('watch', watch);

    exports.watch = watch;
    exports.default = gulp.parallel(watch, browser, compilaSass, gulpJS, pluginJs);
 