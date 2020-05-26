;(function ($,player){
    function MusicPlayer(dom){
        this.wrap = dom; //播放器的容器
        this.dataList=[];
        this.now=1;
        this.rotateTimer = null;//旋转唱片的定时器
        this.list = null;
        this.pro = null;
        this.progressTimer = null;
        this.numTime = 0;
    }

    MusicPlayer.prototype = {
        init(){//初始化
            this.getDom();//获取元素
            this.getData('../mock/data.json')//请求数据
        },
        getDom(){//获取页面里面的元素
            this.record = document.querySelector('.songImg img');
            this.controlBtns = document.querySelectorAll('.control li');
            this.currentTime = document.querySelector(".curTime");
            this.front = document.querySelector(".frontBg");
            this.circle = document.querySelector(".circle");


        },
        getData(url){//请求数据
            var This = this;
            $.ajax({
                url:url,
                method:'get',
                success:function (data){
                    This.dataList = data;//存储请求数据
                    This.auto()
                    This.listPlay()
                    console.log(data)
                    This.loadMusic(This.now)//加载音乐
                    This.musicControl();
                },
                error:function (){
                    console.log("请求失败")
                }
            })
        },

        now1(is){
            if(is == "prev"){
                --this.now

            }else if(is == "next"){
                ++this.now


            }
            if(this.now < 0){
                this.now = this.dataList.length-1;
            }else if(this.now > this.dataList.length-1){
                this.now = 0;
            }

            if(player.music.status == "play"){
                player.music.play();
                
            }else{
                player.music.pause();
            }
            this.progress.formatSeconds(this.dataList[this.now].duration,true);

            clearInterval(this.progressTimer);
            this.numTime = 0
            
            if(player.music.status == 'play'){
                this.stopTime("start");

            }else if(player.music.status == 'pause'){
                this.currentTime.innerHTML = "00:00";

            }
            

        },

        loadMusic(index){//加载音乐
            player.render(this.dataList[index])
            player.music.load(this.dataList[index].audioSrc)
            if(player.music.status == 'play'){
                player.music.play();
            }
           
        },

        musicControl(){
            let This = this;

            this.controlBtns[0].addEventListener('touchend',function (){
                
                if(This.dataList[This.now].isLike){
                    console.log(1,This.dataList[This.now])
                    
                    This.dataList[This.now].isLike = false;

                    player.onlyRenderImg(This.dataList[This.now])
                }else if(!This.dataList[This.now].isLike){
                    This.dataList[This.now].isLike = true
                    console.log(2,This.dataList[This.now])
                    player.onlyRenderImg(This.dataList[This.now])
                }
            })

            this.controlBtns[1].addEventListener('touchend',function (){
                This.now1("prev")
                This.loadMusic(This.now)
            })

            this.controlBtns[2].addEventListener('touchend',function (){
                if(player.music.status == "play"){
                    player.music.pause();
                    this.className = ""
                    // This.StopImgRotate()
                    clearInterval(This.rotateTimer)
                    This.stopTime(false);

                }else{
                    player.music.play();
                    this.className='playing';
                    var deg = This.record.dataset.rotate || 0;
                    This.imgRotate(deg);
                    This.stopTime("start")
                }
            })

            this.controlBtns[3].addEventListener('touchend',function (){
                
                This.now1("next")
                
                This.loadMusic(This.now)

                
            })
        },
        imgRotate(deg){
            let This = this;
            clearInterval(this.rotateTimer)
            this.rotateTimer = setInterval(() =>{
                deg = +deg + 0.2;
                This.record.style.transform = 'rotate(' + deg + 'deg)';
                This.record.dataset.rotate = deg;//吧旋转的角度存到标签身上，为了暂停后继续播放能取到
            },1000/60)
        },
        
        listPlay(){
            let This = this
            this.list = player.listControl(this.dataList,this.wrap);
            this.controlBtns[4].addEventListener('touchend',function (){
                This.list.slideUp();
                console.log(This.now)
                This.list.changeSelect(This.now);

            })
            //歌曲列表添加事件
            this.list.musicList.forEach((item,index) =>{
                item.addEventListener('touchend',function (){
                    This.loadMusic(index);
                    player.music.play();
                    This.list.slideDown();
                    This.now = index
                    This.list.changeSelect(This.now);

                    This.stopTime("all");


                    if(This.controlBtns[2].className == ''){
                        This.controlBtns[2].className = 'playing'
                    }

                })
            })
        },

        startTime(){
            this.progressTimer = setInterval(() =>{
                // clearInterval(this.progressTimer)
                if(this.numTime === this.dataList[this.now].duration){
                    this.controlBtns[3].click();
                    clearInterval(this.progressTimer)
                }
                this.numTime++;
                // console.log(this.numTime)
                this.progress.formatSeconds(this.numTime,false);

            },1000)
            
        },
        stopTime(is){
            if(is == "all"){
                clearInterval(this.progressTimer);
                this.currentTime.innerHTML = "00:00";
                this.numTime = 0
                this.startTime();
            }else if(!is){
                clearInterval(this.progressTimer);
            }else if(is == "start"){

                this.startTime();
            }
            
        },

        auto(selfTime){
            let This = this
            
            this.progress = player.progress(This.dataList);
            this.progress.formatSeconds(This.dataList[This.now].duration,true);
            
            setInterval(() =>{
                // console.log(())
                This.front.style.left = ((this.numTime/this.dataList[This.now].duration)*100)+"%";
                This.circle.style.left = ((this.numTime/this.dataList[This.now].duration)*100)+"%";

                
            },1000)
            
            

        }




    }
    
    var musicPlayer = new MusicPlayer(document.getElementById('wrap'))
    musicPlayer.init()

})(window.Zepto, window.player)
