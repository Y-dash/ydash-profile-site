let gulp = require('gulp');
let plumber = require('gulp-plumber');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCss = require('gulp-clean-css');
let ejs = require('gulp-ejs');
let rename = require('gulp-rename');
let htmlBeautify = require('gulp-html-beautify');

const EJS_TASK = 'ejs';
const EJS_SRC_WATCHING_PATH = 'src/templates/**/*.ejs';
const EJS_SRC_TARGET_PATH = [
	'src/templates/**/*.ejs',
	'!src/templates/**/_*.ejs'
];
const EJS_DIST_PATH = 'dist';

const SCSS_TASK = 'scss';
const SCSS_SRC_PATH = 'src/styles/*.scss';
const SCSS_DIST_PATH = 'dist/styles';

const COPY_TASK = 'copy';
const COPY_SRC_PATH = ['src/static/**/*'];
const COPY_DIST_PATH = 'dist';

gulp.task(EJS_TASK, (done) => {
	gulp.src(EJS_SRC_TARGET_PATH)
		.pipe(plumber())
		.pipe(ejs({}, { rmWhitespace: true }))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(htmlBeautify())
		.pipe(gulp.dest(EJS_DIST_PATH));
	done();
})

gulp.task(SCSS_TASK, (done) => {
	gulp.src(SCSS_SRC_PATH)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			grid: true
		}))
		.pipe(cleanCss())
		.pipe(gulp.dest(SCSS_DIST_PATH));
	done();
})

gulp.task(COPY_TASK, (done) => {
	gulp.src(COPY_SRC_PATH, {
		base: 'src'
	})
		.pipe(plumber())
		.pipe(gulp.dest(COPY_DIST_PATH));
	done();
});

gulp.task('default', (done) => {
	gulp.watch(EJS_SRC_WATCHING_PATH, gulp.parallel(EJS_TASK));
	gulp.watch(SCSS_SRC_PATH, gulp.parallel(SCSS_TASK));
	gulp.watch(COPY_SRC_PATH, gulp.parallel(COPY_TASK));
	done();
});