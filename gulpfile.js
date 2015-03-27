'use strict';

var gulp = require('gulp'),
	del = require('del'),
	size = require('gulp-size'),
	filter = require('gulp-filter'),
	browserSync = require('browser-sync'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	sass = require('gulp-sass'),
	please = require('gulp-pleeease'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	htmlhint = require("gulp-htmlhint");

var config = {
	images: {
		src: './src/images/**/*',
		dest: './build/images',
	},
	scripts: {
		src: './src/js/**/*.js',
		vendor: './src/js/vendor/*.js',
		dest: './build/js',
	},
	styles: {
		src: './src/sass/**/*.scss',
		dest: './build/css',
	},
	html: {
		src: './src/*.html',
		dest: './build',
	},
	port: 35729,
};

var vendorJsFilter = filter(config.scripts.vendor);

var AUTOPREFIXER_BROWSERS = [
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.0',
	'bb >= 10'
];

var onError = function (error) {
  console.log(error.toString());
  this.emit('end');
};

gulp.task('clean', del.bind(null, ['build']));

gulp.task('images', function() {
	return gulp.src(config.images.src)
	.pipe(plumber({
    errorHandler: onError
  }))
	.pipe(imagemin({
		optimizationLevel: 7,
	  progressive: true,
	  interlaced: true,
  }))
	.pipe(gulp.dest(config.images.dest))
	.pipe(size({title: 'images'}));
});

gulp.task('styles', function() {
	return gulp.src(config.styles.src)
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(sass({
  	outputStyle: 'expanded',
  	errLogToConsole: true,
  }))
  .pipe(please({
	  autoprefixer: {
	    browsers: AUTOPREFIXER_BROWSERS,
	    cascade: false,
	  },
	  sourcemaps: false,
	  mqpacker: true,
	}))
	.pipe(gulp.dest(config.styles.dest))
	.pipe(size({title: 'styles'}))
	.pipe(filter('**/*.css'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function() {
	return gulp.src([config.scripts.src, config.scripts.vendor])
	.pipe(plumber({
    errorHandler: onError
  }))
  .pipe(vendorJsFilter)
	.pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(uglify({preserveComments: 'some'}))
  .pipe(vendorJsFilter.restore())
	.pipe(gulp.dest(config.scripts.dest))
	.pipe(size({title: 'scripts'}))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function() {
	return gulp.src(config.html.src)
	.pipe(plumber({
    errorHandler: onError
  }))
	.pipe(htmlhint())
	.pipe(gulp.dest(config.html.dest))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('serve', ['build'], function() {
	browserSync({
		notify: false,
		server: config.html.dest,
		ui: {
		  port: 3001
		},
	});
});

gulp.task('watch', function() {
	gulp.watch([config.scripts.src, config.scripts.vendor], ['scripts']);
	gulp.watch(config.styles.src, ['styles']);
	gulp.watch(config.images.src, ['images']);
	gulp.watch(config.html.src, ['html']);
});

gulp.task('build', ['clean'], function() {
	gulp.start('html', 'images', 'styles', 'scripts');
});

gulp.task('default', ['watch'], function() {
	gulp.start('serve');
});