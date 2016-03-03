var gulp = require( "gulp" );
var gutil = require( "gulp-util" );
var plumber = require( "gulp-plumber" );
var stylus = require( "gulp-stylus" );
var nib = require( "nib" );
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var browserify = require("browserify");
var browserSync = require( "browser-sync" ).create();

gulp.task("default", ["browserify", "watch", "style", "browser-sync"])

gulp.task( "watch", function() {
  gulp.watch( "./src/styles/**/*.styl", [ "style" ] );

});

gulp.task("style", function() {
	gulp.src( "./src/styles/*.styl" )
		.pipe( plumber() )
		.pipe( stylus( {
				use: [ nib() ],
				url: { name: "url64", paths: [ "./src/styles/" ] }				
			}))
			.on( "error", gutil.log )
			.on( "error", gutil.beep )
		.pipe( gulp.dest( "./out/styles" ) )
		.pipe( browserSync.stream() );

});

gulp.task("browserify", function() {
	var browserifyArgs = watchify.args;
	browserifyArgs.debug = true;

	var b = watchify(browserify("./src/js/main.js", browserifyArgs));

	function rebundle() {
		return b.bundle()
			.on("error", function(error) {
				console.error("\033[31m " + error.stack + "\033[0m\n");
				this.emit("end");
			})
			.pipe(source("main.js"))
			.pipe(gulp.dest("./out/js"))
			.pipe(browserSync.stream());
	}

	b.on("update", rebundle);

	b.on("log", function(msg) {
		console.log(msg);
	});

	return rebundle();
});

gulp.task("browser-sync", function() {
	browserSync.init({
		server: {
            baseDir: ["./out", "./static"]
        }
	});
});

