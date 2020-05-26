
const { series, src, dest, watch } = require('gulp');

const htmlClean = require('gulp-htmlclean');

const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');

const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

const imagemin = require("gulp-imagemin")

const connect = require('gulp-connect');

const folder = {
	src: 'src/',
	dist: 'dist/'
}

function html() {
	return src(folder.src + 'html/*')
		.pipe(htmlClean())
		.pipe(dest(folder.dist + 'html/'))
		.pipe(connect.reload());
}

function css() {
	return src(folder.src + 'css/*')
		.pipe(less())
		.pipe(cleanCss())
		.pipe(dest(folder.dist + 'css/'))
		.pipe(connect.reload())
}

function js() {
	return src(folder.src + 'js/*')
		// .pipe(stripDebug())
		// .pipe(uglify())
		.pipe(dest(folder.dist + 'js/'))
		.pipe(connect.reload());
}

function image() {
	return src(folder.src + 'images/*')
		.pipe(imagemin())
		.pipe(dest(folder.dist + 'images/'));
}

function server(cb) {
	connect.server({
		port: '1573',
		livereload: true,	//自动刷新
	});

	cb();
}

watch(folder.src+'html/*',function(cb){
	html();
	cb();
});
watch(folder.src+'css/*',function(cb){
	css();
	cb();
});
watch(folder.src+'js/*',function(cb){
	js();
	cb();
});

exports.default = series(html, css, js, image, server)






























// const {src,dest} = require("gulp");

// const uglify = require("gulp-uglify")//压缩

// var pipeline = require('readable-stream').pipeline;//这个用了之后就不用一直.pipe了

// function copy(){
//     return src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(dest('outFile/js'));
// };
// exports.default = copy;

// function copy(){
//     return pipeline(
//         src('src/js/*.js'),
//         uglify(),
//         dest('outFile/js')
//     )
// };
// exports.default = copy;

// exports.default = function(){
//     return src('src/js/*.js')
//         .pipe(dest('dist/js'))
// }