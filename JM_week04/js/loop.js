
//布局:传n个参数,看需求。
//createLoopWall({obj.loopContainer:xxx,obj.imgPath:xxx,obj.animTime:xxx,obj.gapTime});
function createLoopWall(obj){
	//容器
	var loopContainer=document.querySelector(obj.loopContainer);
	var imgPath = obj.imgPath;
	var animTime = obj.animTime;
	var gapTime = obj.gapTime;
	//设置图片的宽高，避免没加载完就运行
	var imgWidth = obj.imgWidth;
	var imgHeight = obj.imgHeight;
	var lis =[];
	/**
	 * 1、生成ul>li标签
	 */
	var ul =document.createElement("ul");
	for (var i =0;i<imgPath.length;i++) {
		var li =document.createElement("li");
		//将li存进数组
		lis[i]=li;
		var img = document.createElement("img");
		img.src = imgPath[i];
		li.appendChild(img);
		ul.appendChild(li);
		
	}
	loopContainer.appendChild(ul);
	//加载图片
	var img  = document.querySelector(obj.loopContainer+">ul>li>img");
//	img.onload=function(){
		//拿到图片宽高
//		var imgWidth = img.offsetWidth;
//		var imgHeight = img.offsetHeight;
		
		/**
		 * 2、设置样式
		 */
		for(var i =0;i<lis.length;i++){
			if(i==0){
				//将第一张放在中间
				lis[i].style.left = "0px";
			}else{
				lis[i].style.left = imgWidth+"px";
			}
			//设置li的宽高
			lis[i].style.width = imgWidth+"px";
			lis[i].style.height = imgHeight+"px";
			lis[i].style.listStyle = "none";
			lis[i].style.position = "absolute";
			lis[i].style.top = "0px";
			
		}
		ul.style.width = imgWidth+"px";
		ul.style.height = imgHeight+"px";
		ul.style.position = "relative";
		ul.style.overflow = "hidden";
		//动画
		var imgs = lis;
		var index = 0;
		var leftDistance = 0;
		var rightDistance = imgWidth;


		
		

		function centerRunLeftAnim(ele) {
			var centerRunLeft = setInterval(function() {
				if (leftDistance <= -imgWidth) {
					//到达最左边，停止动画
					clearInterval(centerRunLeft);
					//同时自己还要回原位。
					ele.style.left = imgWidth + "px";
					//数据还原
					leftDistance = 0;
				} else {
					ele.style.left = (leftDistance = leftDistance - imgWidth / 8) + "px";
				}
			}, obj.animTime);
		}

		function rightRunCenterAnim(ele) {
			var rightRunCenter = setInterval(function() {
				if (rightDistance <= 0) {
					//到达中间，停止动画
					clearInterval(rightRunCenter);
					ele.style.left = "0px";
					//数据还原
					rightDistance = imgWidth;
				} else {
					ele.style.left = (rightDistance = rightDistance - imgWidth / 8) + "px";
				}
			}, obj.animTime);
		}
		
//	};
	//将方法封装
		var startTask;
		function startAnim(){
			stopAnim();
			startTask =  setInterval(function() {
			centerRunLeftAnim(imgs[index++]);
			if (index == imgs.length - 1) {
				index = 0;
			}
			rightRunCenterAnim(imgs[index]);

		}, obj.gapTime);
		};
		function stopAnim(){
			clearInterval(startTask);
		};
	return {start:startAnim,stop:stopAnim};
	
	
};
