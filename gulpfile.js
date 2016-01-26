var gulp = require("gulp");
var del = require('del');
var fs = require('fs');

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
    del.sync( [  'Dist/Resource/**' , '!Dist/Resource' ] );
    var result = index.read("Project");
    var includeFiles = result[0];
    return gulp.src( includeFiles , { base: 'Project' } ).pipe( gulp.dest( 'Dist/Resource' ) );
 } );


gulp.task( 'mac' , ['resource'],  function() {
  del.sync( [      'Dist/Mac/Project/Game.app/Contents/Resources/app.nw/**' ,
              '!Dist/Mac/Project/Game.app/Contents/Resources/app.nw' ,
              '!Dist/Mac/Project/Game.app/Contents/Resources/app.nw/**.json'  ] );

  return gulp.src( [ 'Dist/Resource/**' ] , { base: 'Dist/Resource' } ).pipe( gulp.dest( 'Dist/Mac/Project/Game.app/Contents/Resources/app.nw' ) );
} );

gulp.task( 'win' , ['resource'] , function() {
  del.sync( [  'Dist/Win/Project/www/**' ,
               '!Dist/Win/Project/www' ,
               '!Dist/Win/Project/www/*.json' ] );
  return gulp.src( [ 'Dist/Resource/**' ] , { base: 'Dist/Resource' } ).pipe( gulp.dest( 'Dist/Win/Project/www' ) );
} );


gulp.task( 'mobile' , ['resource'] , function() {
  del.sync( [  'Dist/Mobile/Project/www/**' ,
               '!Dist/Mobile/Project/www' ,
               '!Dist/Mobile/Project/www/*.json' ] );
  return gulp.src( [ 'Dist/Resource/**' ] , { base: 'Dist/Resource' } ).pipe( gulp.dest( 'Dist/Mobile/Project/www' ) );
} );

gulp.task( 'diet' , function() {
  console.log( "Diet Dist/Mobile/Project/www" );

  var buf = fs.readFileSync('src/file_list.txt');
  var lines = buf.toString().split(/\r\n|\r|\n/);


  var targetDirs = [ 'audio/bgm' , 'audio/me' , 'audio/se' ,
//                     'data',
                     'img/animations' , 'img/characters' , 'img/enemies', 'img/faces' ,
                     'img/pictures' , 'img/tilesets' , 'img/titles1' , 'img/titles2' ];

  var list = [];
  
  for (var i=0;i<targetDirs.length;i++) {
    var dir = targetDirs[i];
    list.push( 'Dist/Mobile/Project/www/' + dir + '/**' );
  }
  for (var i=0;i<targetDirs.length;i++) {
    var dir = targetDirs[i];
    list.push( '!Dist/Mobile/Project/www/' + dir );
  }

  for (i=0;i<lines.length;i++) {
    var str = lines[i].trim();
    if (str) {
      list.push( "!Dist/Mobile/Project/" + str );   
    }
  }
//  console.log(list);
  del.sync( list );
} );

gulp.task( 'game' , function() {
  return gulp.src( [ 'src/Mobile/**' ] , { base: 'src/Mobile' } ).pipe( gulp.dest( 'Dist/Mobile/Project/www' ) );
} );
