//*********** IMPORTS *****************
var gulp = require('gulp');
var sass = require('gulp-sass');
global.errorMessage = '';

//Configuration - Change me

//END configuration


gulp.task('watch', function () {
	for (var i in styles.scss) {
		sassWatch(styles.scss);
	}

	for (var j in jsFiles) {
		scriptWatch(jsFiles[j]);
	}
});
 
gulp.task('sass', function () {
  return gulp.src('styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 



gulp.task('default', ['sass']);

/// Defaults yo
var sassOptions = {
	'style': 'compressed',
	'unixNewlines': true,
	'cacheLocation': '_scss/.sass_cache'
};

// Does pretty printing of sass errors
var checkErrors = function (obj) {
	function checkErrors(file, callback, errorMessage) {
		if (file.path.indexOf('.scss') != -1) {
				file.contents  = new Buffer("\
					body * { white-space:pre; }\
					body * { display: none!important; }\
					body:before {\
						white-space:pre;\
						content: '"+ global.errorMessage.replace(/(\\)/gm,"/").replace(/(\r\n|\n|\r)/gm,"\\A") +"';\
					}\
					html{background:#ccf!important; }\
				");
		}
		callback(null, file);
	}
	return map(checkErrors);
};