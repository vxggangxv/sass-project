module.exports = function() {

	var source       = 'src',
		development  = 'dist',
		build        = 'build',
		remove       = [],

		// 템플릿 경로
		template = {
			src  : source + '/jade/**/!(_)*.jade',
			parts: source + '/jade/**/_*.jade'
		},

		// Sass 경로
//		sass = {
//			src       : source + '/sass/**/*.{scss,sass}',
//			compassSrc: source + '/sass',
//			dest      : development + '/css'
//		},

		// HTML Prettify 옵션
		htmlPrettify = {
			"indent_char": " ",
			"indent_size": 2
		},

		// 웹 서버 설정
		server = {
			root: [development],
			port: 90,
			livereload: true,
			open: {
				browser: 'chrome' // chrome(안되면 Google Chrome), iexplore, ...
			}
		};

	return {
		del  : remove,
		src  : source,
		dev  : development,
		sev  : server,
		jade : template 
	};
};