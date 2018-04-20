/**
 * NUNJUCKS HTML TEMPLATING
 *
 * Nunjucks templating for key message HTML as well as AJAX'ed html files.
 * All html is compiled from the resources/html directory.
 *
 * An HTML file for each banner is generated from the directory
 * resources/html/pages. A template for each file will be found
 * in that folder, named [banner-name].html. If it's a file is missing run
 * `gulp scaffold` to generate it from the banners.json.
 *
 * To learn about nunjucks rendering refer to their documentation:
 * https://mozilla.github.io/nunjucks/templating.html
 *
 * The style should be familar to those who've used jinja2.
 */

const gutil = require('gulp-util');
const nunjucksRender = require('gulp-nunjucks-render');
const htmlmin = require('gulp-htmlmin');
const fs = require('fs');

module.exports = (gulp, banners) => {
	const HTML_PATH = './resources/html';

	gulp.task('html-separated', () => {
		return Object.keys(banners).forEach(banner => {
			const { orientation } = banners[banner];
			return gulp
				.src(`${HTML_PATH}/pages/${banner}.html`)
				.pipe(
					nunjucksRender({
						data: {
							orientationStyle: `css/${orientation}.css`
						},
						path: `${HTML_PATH}/components`
					})
				)
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest(`dist/separated-assets/${banner}`));
		});
	});

	gulp.task('html-shared', () => {
		return Object.keys(banners).forEach(banner => {
			const { orientation } = banners[banner];
			const pageStyle = fs.existsSync(`dist/shared-assets/css/${banner}.css`)
				? `css/${banner}.css`
				: null;
			return gulp
				.src(`${HTML_PATH}/pages/${banner}.html`)
				.pipe(
					nunjucksRender({
						data: {
							pageStyle: pageStyle,
							orientationStyle: `css/${orientation}.css`,
							orientationScript: `js/${orientation}.js`
						},
						path: `${HTML_PATH}/components`
					})
				)
				.pipe(htmlmin({ collapsewhitepsace: true }))
				.pipe(gulp.dest('dist/shared-assets'));
		});
	});

	gulp.task('transfer-index', () => {
		return gulp.src(`${HTML_PATH}/index.html`).pipe(gulp.dest(`dist/separated-assets`));
	});

	// Watch Files For Changes
	gulp.task('watchHtml', () => {
		gulp.start(['html-shared', 'transfer-index']);
		gulp.watch([
			`${HTML_PATH}/**/*.html`,
			`${HTML_PATH}/*.html`,
		],
		['html-shared']);
	});

	gulp.task('watchSeparatedHtml', () => {
		gulp.start(['html-separated', 'transfer-index']);
		gulp.watch([
			`${HTML_PATH}/**/*.html`,
			`${HTML_PATH}/*.html`,
		],
		['html-separated']);
	});
}


