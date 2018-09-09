(function($,root){
    var $scropt=$(document.body);
    var cutDuration;
    var frameID;
    var lastper=0;
    var startTime;
    function formatTime(time){
        time=Math.round(time);
         var minute=Math.floor(time/60);
         var second=time-minute*60;
         if(minute<10){
             minute="0"+minute;
         }
         if(second<10){
             second="0"+second;
         }
         return minute+":"+second; 
    }
    function renderTime(time){
        cutDuration=time;
         var allTime=formatTime(time);
         $scropt.find('.E-time').html(allTime);
    }
    function updata(percent){
        var time=percent*cutDuration;
            time=formatTime(time);
            $scropt.find('.S-time').html(time);
        var percentage=(percent-1)*100+"%";
           $scropt.find(".pro-top").css({
               "transform":"translateX("+ percentage +")"
           })  
    }
    function start(){
         lastper=0;
         cancelAnimationFrame(frameID);
         startTime=new Date().getTime();
         function frame(){
            var nowTime=new Date().getTime();
            var percent=lastper+(nowTime-startTime)/(cutDuration*1000);
            frameID= requestAnimationFrame(frame);
            updata(percent);
         }
         frame();
    }
    function stop(){
        var stopTime=new Date().getTime();
        lastper=lastper+(stopTime-startTime)/(cutDuration*1000);
        cancelAnimationFrame(frameID);
    }
    root.process={
        renderTime:renderTime,
        start:start,
        stop:stop,
        updata:updata
    }
})(window.Zepto,window.player||(window.player={}))