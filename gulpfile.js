var production = true;
var _ = require('underscore');
var bowerResolve = require('bower-resolve');
var nodeResolve = require('resolve');
var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css')
var copy = require('gulp-copy');
var htmlmin = require('gulp-html-minifier');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var csslint = require('gulp-csslint');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var webpack = require('gulp-webpack');
var connect = require('gulp-connect');
var webserver = require('gulp-webserver');
var config = require('./gulp.config.js');
var config_webpack = require('./webpack.config.js');
gulp.task('clean', function () {
    gulp.src([config.path.dist + '/**/*'], {
            read: false
        })
        //.pipe(ignore.exclude('node_modules/**'))
        .pipe(rimraf({
            force: false
        }));
});
gulp.task('lint:js', function () {
    return gulp.src([config.file.js])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter("fail"))
});
gulp.task('eslint', function () {
    return gulp.src([config.file.js])
        .pipe(eslint({
            baseConfig: {
                "ecmaFeatures": {
                    "jsx": true
                }
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task('lint:css', function () {
    return gulp.src([config.file.css])
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.reporter('fail'))
});
gulp.task('copy:html', function () {
    return gulp.src(config.file.html)
        .pipe(gulp.dest(config.path.dist))
});
gulp.task('copy:img', function () {
    return gulp.src([config.file.png, config.file.jpg])
        .pipe(gulp.dest(config.path.dist_img))
});
gulp.task('compile:css', function () {
    return gulp.src(config.file.css)
        .pipe(concat(config.file.bundle_css))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.path.dist_css))
});
gulp.task('minify-html', function () {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({minifyJS: true}))
        .pipe(gulp.dest('./dist'));
});
gulp.task('compile:html', function () {
    var b = browserify({
        entries: ["./src/index.html"],
        debug: true
    })
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        });
    b.bundle()
        .pipe(source(config.file.bundle_js))
        .pipe(buffer())
        .pipe(gulpif(production, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(production, uglify()))
        //.on('error', gutil.log)
        .pipe(gulpif(production, sourcemaps.write("./")))
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(config.path.dist_js));
});
gulp.task('compile:js', function () {
    var b = browserify({
        entries: [config.file.entry],
        extensions: ['.js'],
        debug: true
    })
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })
        .transform('babelify', {
            presets: ['es2015', 'react', 'stage-1']
        });
    /*
     .pipe(plumber({
     handleError: function (err) {
     console.log(err);
     this.emit('end');
     }
     }))
     */
    getNPMPackageIds().forEach(function (id) {
        b.external(id);
    });
    b.bundle()
        .pipe(source(config.file.bundle_js))
        .pipe(buffer())
        .pipe(gulpif(production, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(production, uglify()))
        //.on('error', gutil.log)
        .pipe(gulpif(production, sourcemaps.write("./")))
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(config.path.dist_js))
});
gulp.task('compile:webpack', function () {
    return gulp.src(config.file.entry)
        .pipe(webpack(config_webpack))
        .pipe(gulp.dest(config.path.dist_js));
});
gulp.task('compile:vendor', function () {
    var b = browserify({
        debug: !production
    });
    /*
     getBowerPackageIds().forEach(function (id) {
     var resolvedPath = bowerResolve.fastReadSync(id);
     b.require(resolvedPath, {
     expose: id
     });
     });
     */
    getNPMPackageIds().forEach(function (id) {
        b.require(nodeResolve.sync(id), {expose: id});
    });
    b.bundle()
        .on('error', function (err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source(config.file.vender_js))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.path.dist_js));
    //stream.pipe(rename('vendor' + (production ? '.min' : '') + '.js'))
});
gulp.task('watch', function () {
    watch(config.file.html, function (event) {
        gulp.start('copy:html');
    });
    watch([config.file.jpg, config.file.png], function (event) {
        gulp.start('copy:img');
    });
    watch(config.file.css, function (event) {
        gulp.start('compile:css');
    });
    watch(config.file.js, function (event) {
        gulp.start('compile:webpack');
    });
    watch(config.file.template, function (event) {
        gulp.start('compile:js');
    });
    watch(config.file.partial, function (event) {
        gulp.start('compile:js');
    });
    watch("./package.json", function (event) {
        gulp.start('compile:js');
    });
});
gulp.task('server', function () {
    connect.server({
        root: 'dist',
        port: 8889,
        livereload: false
    });
});
gulp.task('copy', ['copy:html', 'copy:img']);
gulp.task('compile', ['compile:css', 'compile:js']);
gulp.task('all', ['copy', 'compile', 'watch', 'server']);
gulp.task('default', ['lint:js', 'compile:js'], function () {
    return gulp.start("watch");
});
function getBowerPackageIds() {
    // read bower.json and get dependencies' package ids
    var bowerManifest = {};
    try {
        bowerManifest = require('./bower.json');
    } catch (e) {
        // does not have a bower.json manifest
    }
    return _.keys(bowerManifest.dependencies) || [];
}
function getNPMPackageIds() {
    // read package.json and get dependencies' package ids
    var packageManifest = {};
    try {
        packageManifest = require('./package.json');
    } catch (e) {
        // does not have a package.json manifest
    }
    return _.keys(packageManifest.dependencies) || [];
}
