var gulp = require("gulp");

var del = require('del');

var index = require('./lib/index.js');


gulp.task ('default' , function() {
   console.log("");
   console.log("===================================================");
   console.log("");
   console.log("This tool replace deployed app by reduced resource.");
   console.log("gulp mac : After deployed Mac app to Mac Directory.");
   console.log("gulp win : After deployed Win app to Win Directory.");
   console.log("gulp mobile : After deployed Mobile app to Mobile Directory.");
   console.log("Remark the directory for each platform is fixed. You should deploy each directory for each platform");
   console.log("Dist/Mac : Mac Deploy Directory");
   console.log("Dist/Win : Win Deploy Directory");
   console.log("Dist/Mobile : Mobile Deploy Directory");
   console.log("");
   console.log("===================================================");
   console.log("");
 
 } );



gulp.task ('resource' , function() {
    del.sync( [  'Resource/**' , '!Resource' ] );
    var result = index.read("../Project");
    var includeFiles = result[0];
    return gulp.src( includeFiles , { base: '../Project' } ).pipe( gulp.dest( 'Resource' ) );
 } );


gulp.task( 'mac' , ['resource'],  function() {
  del.sync( [      'Mac/Project/Game.app/Contents/Resources/app.nw/**' ,
              '!Mac/Project/Game.app/Contents/Resources/app.nw' ,
              '!Mac/Project/Game.app/Contents/Resources/app.nw/**.json'  ] );

  gulp.src( [ 'Resource/**' ] , { base: 'Resource' } ).pipe( gulp.dest( 'Mac/Project/Game.app/Contents/Resources/app.nw' ) );
} );

gulp.task( 'win' , ['resource'] , function() {
  del.sync( [  'Win/Project/www/**' ,
               '!Win/Project/www' ,
               '!Win/Project/www/*.json' ] );
  gulp.src( [ 'Resource/**' ] , { base: 'Resource' } ).pipe( gulp.dest( 'Win/Project/www' ) );
} );


gulp.task( 'mobile' , ['resource'] , function() {
  del.sync( [  'Mobile/Project/www/**' ,
               '!Mobile/Project/www' ,
               '!Mobile/Project/www/*.json' ] );
  gulp.src( [ 'Resource/**' ] , { base: 'Resource' } ).pipe( gulp.dest( 'Mobile/Project/www' ) );
} );


