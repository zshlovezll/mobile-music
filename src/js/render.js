//渲染功能：渲染图片，音乐信息，是否喜欢
; (function (root) {
	//渲染图片
	function renderImg(src) {
                root.blurImg(src);
                var img = document.querySelector('.songImg img');
                img.src = src
	}

	//渲染音乐信息
	function renderInfo(data) {
                var songIfoChildren= document.querySelector('.songInfo').children;
                songIfoChildren[0].innerHTML = data.name;
                songIfoChildren[1].innerHTML = data.singer;
                songIfoChildren[2].innerHTML = data.album;
	}

	//渲染是否喜欢
	function renderIsLike(isLike) {
                var lis = document.querySelectorAll('.control li');
                
                lis[0].className = isLike ? 'liking' : ''
	}

	root.render = function (data) {	//data为请求过来的数据，必需给
                renderImg(data.image);
                renderInfo(data);
                renderIsLike(data.isLike)
        };
        root.onlyRenderImg = function (data){
                renderIsLike(data.isLike)
        };

})(window.player || (window.player = {}));