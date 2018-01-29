const uglify = require('gulp-uglify');
const autoPrefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const del = require('del');
const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const browserify = require('browserify');

// File Paths to Watch
const DIST_PATH = 'dist/seperated-assets';
const JS_PATH = 'resources/js';
const SCSS_PATH = 'resources/scss';
const IMG_PATH = 'resources/img';
const IMG_EXTENSION = '*.{png,jpeg,jpg,svg,gif}';

//Image Compression
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

module.exports = (gulp, banners) => {
	// Sass Styles
	gulp.task('styles-seperated', () => {
		console.log('Starting Styles Task');
		return Object.keys(banners).forEach(banner => {
			const orientation =
				banners[banner]['height'] > banners[banner]['width']
					? 'vertical'
					: 'horizontal';
			return gulp
				.src([
					`${SCSS_PATH}/pages/${banner}.scss`,
					`${SCSS_PATH}/${orientation}.scss`
				])
				.pipe(
					plumber(err => {
						console.log('Styles Task Error: ', err);
						this.emit('end');
					})
				)
				.pipe(sourcemaps.init())
				.pipe(autoPrefixer())
				.pipe(
					sass({
						outputStyle: 'compressed'
					})
				)
				.pipe(concat(`${orientation}.css`))
				.pipe(sourcemaps.write())
				.pipe(gulp.dest(`${DIST_PATH}/${banner}/css`));
			// .pipe(liveReload());
		});
	});

	// Scripts
	gulp.task('scripts-seperated', () => {
		console.log('Starting Scripts Task');
		return Object.keys(banners).forEach(banner => {
			return browserify([
				`${JS_PATH}/main.js`,
				banners[banner]['height'] > banners[banner]['width']
					? `${JS_PATH}/vertical.js`
					: `${JS_PATH}/horizontal.js`,
				`${JS_PATH}/vendor/jquery-3.3.1.min.js`
			])
				.bundle()
				.pipe(source('main.js'))
				.pipe(gulp.dest(`${DIST_PATH}/${banner}/js`));

			// return gulp
			// 	.src([
			// 		`${JS_PATH}/main.js`,
			// 		banners[banner]['height'] > banners[banner]['width']
			// 			? `${JS_PATH}/vertical.js`
			// 			: `${JS_PATH}/horizontal.js`
			// 	])
			// 	.pipe(
			// 		plumber(err => {
			// 			console.log('Scripts Task Error: ', err);
			// 			this.emit('end');
			// 		})
			// 	)
			// 	.pipe(
			// 		babel({
			// 			presets: ['es2015']
			// 		})
			// 	)
			// 	.pipe(sourcemaps.init())
			// 	.pipe(uglify())
			// 	.pipe(concat('main.js'))
			// 	.pipe(sourcemaps.write())
			// 	.pipe(gulp.dest(`${DIST_PATH}/${banner}/js`));
			// 	.pipe(liveReload());
		});
		// console.log('Starting Scripts Task');
		// return Object.keys(banners).forEach(banner => {
		// 	return gulp
		// 		.src([
		// 			`${JS_PATH}/main.js`,
		// 			banners[banner]['height'] > banners[banner]['width']
		// 				? `${JS_PATH}/vertical.js`
		// 				: `${JS_PATH}/horizontal.js`
		// 		])
		// 		.pipe(
		// 			plumber(err => {
		// 				console.log('Scripts Task Error: ', err);
		// 				this.emit('end');
		// 			})
		// 		)
		// 		.pipe(
		// 			babel({
		// 				presets: ['es2015']
		// 			})
		// 		)
		// 		.pipe(sourcemaps.init())
		// 		.pipe(uglify())
		// 		.pipe(concat('main.js'))
		// 		.pipe(sourcemaps.write())
		// 		.pipe(gulp.dest(`${DIST_PATH}/${banner}/js`));
		// 	// .pipe(liveReload());
		// });
	});

	// Images
	gulp.task('images-seperated', () => {
		console.log('Starting Images Task');
		return Object.keys(banners).forEach(banner => {
			return gulp
				.src([
					`${IMG_PATH}/shared/${IMG_EXTENSION}`,
					`${IMG_PATH}/pages/${banner}/${IMG_EXTENSION}`,
					banners[banner]['height'] > banners[banner]['width']
						? `${IMG_PATH}/vertical/${IMG_EXTENSION}`
						: `${IMG_PATH}/horizontal/${IMG_EXTENSION}`
				])
				.pipe(
					imagemin([
						imagemin.gifsicle(),
						imagemin.jpegtran(),
						imagemin.optipng(),
						imagemin.svgo(),
						imageminPngquant(),
						imageminJpegRecompress()
					])
				)
				.pipe(gulp.dest(`${DIST_PATH}/${banner}/img`));
		});
	});

	gulp.task('clean-dist-seperated', () => {
		return del.sync([DIST_PATH]);
	});
};
