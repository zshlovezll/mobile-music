;(function (root){
    function listControl(data,wrap){
        var list = document.createElement('div');
            dl = document.createElement('dl')
            dt = document.createElement('dt')
            close = document.createElement('div');
            musicList = [];
        list.className = 'list';
        dt.innerHTML ='播放列表';
        close.className = 'close';
        close.innerHTML = '关闭';

        dl.appendChild(dt);
        data.forEach((item,index) =>{
            dd = document.createElement('dd');
            dd.innerHTML = item.name;

            
            dl.appendChild(dd);
            musicList.push(dd);
        });

        list.appendChild(dl);
        list.appendChild(close);
        wrap.appendChild(list);

        // ddArr.forEach((item,index) =>{
        //     item.addEventListener('touchend',function(){
        //         item.className = ''
        //         item.className = "active";

        //     })
        // })

        close.addEventListener('touchend',function (){
            slideDown()
        })

        var disY = list.offsetHeight;
        list.style.transform = 'translateY('+disY+'px)';
        //列表滑块
        function slideUp(){
            list.style.transition = '.2s';
            list.style.transform = 'translateY(0)';
        }

        function slideDown(){
            list.style.transition = '.2s';
            list.style.transform = 'translateY('+disY+'px)';
        }


        function changeSelect(index){
            
            musicList.forEach((item,index) =>{
                item.className = ''
                // console.log(index)
            })
            musicList[index].className='active'
        }
        musicList.forEach((item,index) =>{
            item.addEventListener('touchend',function (){
                changeSelect(index)
            })
        })

        return{
            dom:list,
            musicList:musicList,
            slideUp:slideUp,
            slideDown:slideDown,
            changeSelect:changeSelect
        }

    }
    

    root.listControl = listControl;


})(window.player || (window.player = {}))