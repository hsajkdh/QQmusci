(function($,root){
    function renderInfo(data){
        root.index=data;
        
        $scropt=$(document.body);
        var html='<div class="song-name">' + data.song + '</div>'+
                 '<div class="singer-name">'+ data.singer +'</div>'+
                 '<div class="album-name">'+ data.album +'</div>'
        $scropt.find('.song-info').html(html)         
    }
    function renderImg(url){
        var img=new Image();
        img.src=url;
        img.onload=function(){
            root.blurImg(img,$scropt);
            $scropt.find('.song-img img').attr("src",url);
        }
    }
    function renderLike(like){
        if(like){
            $scropt.find('.like-btn').addClass('likeing');
        }else {
            $scropt.find('.like-btn').removeClass('likeing');
        }
    }
    root.render=function(data){     
        renderInfo(data);
        renderImg(data.image);
        renderLike(data.isLike);    
    }
})(window.Zepto,window.player||(window.player={}))