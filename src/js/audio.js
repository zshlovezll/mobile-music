;(function (root){
    function AudioManage(){
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioManage.prototype = {
        load(src){
            this.audio.src = src;
            this.audio.load();//加载音乐，audio本省的API
        },
        play(){
            this.audio.play();
            this.status = 'play';

        },
        pause(){
            this.audio.pause();
            this.status = 'pause'
        },
        // 音乐播放完成事件
        end(fn){
            this.audio.onended = fn;
        },
        playto(time){
            this.audio.currentTime=time;//单位为秒
        }
    }
    
    root.music=new AudioManage();//把实例对象暴露出去
    
})(window.player || (window.player = {}));

