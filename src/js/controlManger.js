(function($,root){
    function controlManger(len){
          this.index=index;
          this.len=len;
    }
    controlManger.prototype={
      prev:function(){
        return this.getIndex(-1);
      },
      next:function(){
        return this.getIndex(1);
      },
      getIndex:function(val){
         var index=this.index;
         var len=this.len;
         var cutIndex=(index+len+val)%len;
         this.index=cutIndex;
         return cutIndex; 
      }
    }
    root.controlManger=controlManger;
})(window.Zepto,window.player||(window.player={}))