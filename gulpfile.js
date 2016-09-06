'use strict';
/**
 * 모듈 호출
 * [del]                - 폴더(디렉토리)/파일 제거
 * [gulp-if]            - 조건 처리
 * [gulp-rename]        - 파일 이름 변경
 * [gulp-jade]          - Jade 컴파일
 * [gulp-plumber]       - 오류 발생해도 watch 업무 지속
 * [gulp-watch]         - 변경된 파일만 처리
 * [gulp-html-prettify] - HTML 구조 읽기 쉽게 변경
 * [gulp-connect-multi] - 웹 서버
 */
var del      = require('del'),
	gulp     = require('gulp'),
	gulpif   = require('gulp-if'),
	rename   = require('gulp-rename'),
	jade     = require('gulp-jade'),
	compass  = require('gulp-compass'),
	plumber  = require('gulp-plumber'),
	watch    = require('gulp-watch'),
	prettify = require('gulp-html-prettify'),
	connect  = require('gulp-connect-multi')(),

	// 환경설정 ./config.js
	config   = require('./config')();

// sass패스 별도 설정
var sass = {
	src       : 'src/sass/**/!(_)*.{scss,sass}',
	compassSrc: 'src/sass',
	dest      : 'dist/css'
}
/**
 * Gulp 업무(Tasks) 정의
 */

// 기본
gulp.task('default', ['template', 'compass', 'connect', 'watch']);

// 관찰
gulp.task('watch', [], function(){
	// HTML 템플릿 업무 관찰
	watch([config.jade.src, config.jade.parts], function() {
		gulp.start('template');
	});
	// Sass 업무 관찰
	watch(sass.src, function() {
		gulp.start('compass');
	});
});

// 제거
gulp.task('clean', function(cb){
	del(config.del, cb);
});

// 웹 서버
gulp.task('connect', connect.server( config.sev ));

// HTML 템플릿(Jade)
gulp.task('template', function(){
	gulp.src(config.jade.src)
		.pipe( plumber() )
		.pipe( jade() )
		.pipe( prettify(config.htmlPrettify) )
		.pipe( gulp.dest(config.dev) )
		.pipe( connect.reload() );
});

gulp.task('compass', function() {
	gulp.src( sass.src )
			.pipe( plumber() )
			.pipe( compass({
				css : sass.dest,
				sass: sass.compassSrc
			}) )
			.pipe( gulp.dest( sass.dest ) )
			.pipe( connect.reload() );
});
