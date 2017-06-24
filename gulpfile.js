const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const gutil = require('gulp-util');
const s3 = require('gulp-s3');
const webpack = require('webpack');

gulp.task('optimize-svg', () => {
	gulp
		.src(['src/icons/*.svg'])
		.pipe(imagemin({ svgoPlugins: [{ cleanupIDs: false }] }))
		.pipe(gulp.dest('src/icons/'));
});

gulp.task('optimize-img', () => {
	gulp
		.src(['dist/*.jpg', 'dist/*.png'])
		.pipe(imagemin())
		.pipe(gulp.dest('dist/'));
});

gulp.task('webpack', cb => {
	const webpackConfig = require('./webpack.config');

	webpack(webpackConfig).run((err, stats) => {
		if (err) {
			throw new gutil.PluginError('webpack:build', err);
		}
		cb();
	});
});

gulp.task('deploy', () => {
	const awsConfig = {
		key: process.env.AWS_ACCESS_KEY_ID,
		secret: process.env.AWS_SECRET_ACCESS_KEY,
		bucket: 'agachi.name',
		region: 'eu-west-1',
	};

	const options = {
		failOnError: true,
		headers: {
			'Cache-Control': 'max-age=315360000, no-transform, public',
			'x-amz-acl': 'public-read',
		},
	};

	gulp.src('./dist/**').pipe(s3(awsConfig, options));
});
