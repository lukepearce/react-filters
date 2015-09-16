
// Include gulp
var gulp = require('gulp'),
  // Include Our Plugins
  autoprefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  minifyCss = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  notify = require("gulp-notify"),
  watch = require( 'gulp-watch' );


//Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('_themes/blu-effect/sass/style.scss')
//         .pipe(sass({ style: 'compressed'}))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//         .pipe(gulp.dest('_themes/blu-effect/css'))
//         .pipe(livereload());
// });

gulp.task('css', function() {
  gulp.src( 'config/root.scss' )
    .pipe( sass() )
    .on( 'error', sass.logError )
    .pipe( concat( 'main.css' ) )
    .pipe( autoprefix( 'last 2 versions', '> 1%', 'Explorer 8' ) )
    .pipe( gulp.dest( 'public_html/assets/css' ) )
    .pipe( minifyCss() )
    .pipe( rename( 'main.min.css' ) )
    .pipe( gulp.dest( 'public_html/assets/css' ) );
});

// // Watch Files For Changes
gulp.task( 'watch', function(){

  livereload.listen();

  watch( ( 'components/**/*.scss' ), function(){
    gulp.start( 'css' );
  } );

  watch( ( 'components/img/**/*' ), function(){
    gulp.start( 'img' );
  } );

  watch( ( 'components/fonts/*' ), function(){
    gulp.start( 'fonts' );
  } );

  watch( [
    ( 'public_html/assets/css/**/*' ),
    ( 'public_html/assets/img/**/*' ),
    ( 'public_html/assets/fonts/*' )
  ], function( file ){
    livereload.changed( file.path );
  } );

} );

// // Clean cache folder
// gulp.task('clean', function() {
//     gulp.src('./_cache/**', './!_cache', {read: false})
//         .pipe(clean());
// });

// 4. Where we tell Gulp what to do when we type "gulp" into the terminal.
//gulp.task('server', ['watch']);
gulp.task('default', ['css', 'watch']);