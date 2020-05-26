; (function (root) {

    function progress(data) {
        var currentTime = document.querySelector(".curTime")
        var totalTime = document.querySelector(".totalTime")
        



        function formatSeconds(value,isTrue) {
            var theTime = parseInt(value);// 秒
            var middle = 0;// 分
            var hour = 0;// 小时
            if(theTime < 10 ){
                result = "" + 00 + ":" + theTime;

            }

            if (theTime > 60) {
                middle = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (middle > 60) {
                    hour = parseInt(middle / 60);
                    middle = parseInt(middle % 60);
                }
            }
            result = "" + parseInt(theTime);

            if (middle > 0) {
                result = "" + parseInt(middle) + ":" + result;
            }
            if (hour > 0) {
                result = "" + parseInt(hour) + ":" + result;
            }
            if(isTrue){
                totalTime.innerHTML = result;
            }else{
                if(result<10){
                    currentTime.innerHTML = "00:0"+result
                }else if(result<59){
                    currentTime.innerHTML = "00:"+result
                }else{
                    currentTime.innerHTML = result

                }
            }
        }

        
        
        return{
            formatSeconds:formatSeconds
        }

    }

    root.progress = progress;

})(window.player || (window.player = {}))