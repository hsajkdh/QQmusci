var gulp=require("gulp");
var htmlclean=require("gulp-htmlclean");
var imagemin=require("gulp-imagemin");
var uglify=require("gulp-uglify");
var strip=require("gulp-strip-debug");
var concat=require("gulp-concat");
var less=require("gulp-less");
var postcss=require("gulp-postcss");
var autoprefixer=require("autoprefixer");
var cssnano=require("cssnano");
var connect=require("gulp-connect");
// gulp.src() 读文件
// gulp.dest() 写文件
// gulp.task() 写任务
// gulp.watch() 监听
var devMode=process.env.NODE_ENV=="development";
var folder={
    src:"./src/",
    dist:"./dist/"
}


gulp.task("html",function(){
   var page= gulp.src(folder.src + "html/*")
             .pipe(connect.reload())
       if(!devMode){
          page.pipe(htmlclean())
       }
        page.pipe(gulp.dest(folder.dist + "html/")) 
})
gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/")) 
})
gulp.task("js",function(){
   var page= gulp.src(folder.src + "js/*")
   .pipe(connect.reload())
   if(!devMode){
    page.pipe(strip())
    .pipe(uglify())
   }
    page.pipe(gulp.dest(folder.dist + "js/")) 
})
gulp.task("css",function(){
    var options=[autoprefixer,cssnano];
   var page= gulp.src(folder.src + "css/*")
        .pipe(less())
        .pipe(connect.reload())
        if(!devMode){
           page.pipe(postcss(options))
        }
        page.pipe(gulp.dest(folder.dist + "css/")) 
})
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "images/*",["images"]);
})
gulp.task("server",function(){
    connect.server({
        port:"8090",
        livereload:true
    });//不写默认是8080
})
gulp.task("default",["html","images","js","css","watch","server"]);