var $=window.Zepto;
var root=window.player;
var $scropt=$(document.body);
var index=0;
var songList;
var audio=new root.audioControl();
function bindEvent(){
  $scropt.on("play:change",function(event,index,flag){
       audio.getAudio(songList[index].audio);
       if(audio.status=="play"){
          audio.play();
          root.process.start();
       }
       root.process.renderTime(songList[index].duration);
       root.render(songList[index]);
       root.process.updata(0);
  })
  $scropt.on('click','.prev-btn',function(){
       var index=controlManger.prev();
       $scropt.trigger("play:change",index);
  })
    $scropt.on('click','.next-btn',function(){
      var index=controlManger.next();
      $scropt.trigger("play:change",index);
  })
  $scropt.on('click','.play-btn',function(){     
       if(audio.status=="play"){
        root.process.stop();
          audio.pause();
          $scropt.find('.play-btn').removeClass('pause');
       }else {
          audio.play();
          root.process.start();
          $scropt.find('.play-btn').addClass('pause');
       }
  })
}
function touchEvent(){
   var $round=$scropt.find('.round');
   var offset=$scropt.find('.pro-wrapper').offset();
   console.log(offset);
   var left=offset.left;
   var width=offset.width;
   $round.on("touchstart",function(){
      root.process.stop();
   })
   $round.on("touchmove",function(e){
      var x=e.changedTouches[0].clientX;
      var per=(x-left)/width;
      if(per<0){
        per=0;
      }
      if(per>1){
        per=1;
      }
      root.process.updata(per);
   })
   $round.on("touchend",function(e){
    var x=e.changedTouches[0].clientX; 
    var per=(x-left)/width;
      if(per<0){
        per=0;
      }
      if(per>1){
        per=1;
      }
     var cutDuration=songList[controlManger.index].duration;
     var cutTime=per*cutDuration;
     audio.playTo(cutTime); 
     $scropt.find(".play-btn").addClass("pause");  
   })
}
function getDate(url){
   $.ajax({
     type: "GET",
     url:url,
     success: function(data){
        root.render(data[0]);       
        songList=data;
        bindEvent();
        touchEvent();
        controlManger=new root.controlManger(data.length);
        $scropt.trigger("play:change",0);
     },
     error: function(){
        console.log("error");
     }
   })
}
getDate("../mock/data.json"); 
