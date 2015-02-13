/*
 * jQuery fyFramePlayer1.0
 *
 * Copyright 2015 Mask
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
	rate: 10,                 //每秒播放几帧
	fixedSize:true,			  //是否为固定宽高,如果false，则根据屏幕宽度100%设定动画高度，避免动画变形,此时忽略width和height参数
	movieName:movieYaodou,    //动画名称，也是变量名。这个是必须值，否则找不到动画内容
	playTimes:1,			  //如果有playTimes，则播放n次后会调用onPlayEnd()
	onPlayEnd: function(){}	  //动画完成后回调
 *
 */

;(function($){
	$.fn.fyFramePlayer=function(options){
		var opts=$.extend({   //整合默认参数和自定义参数
			rate: 10,
			fixedSize:true,
			// movieName:movieYaodou,
			playTimes:0,
			onPlayEnd: function(){}
		},options);

		var divCont=this;  //jquery插件的对象


		var init = function() {
	        var img = document.createElement('img'),
            i = -1,
            j=0,
            canPlay=true,
            tempMovie=[],
            tempMovieName;

            tempMovieName = opts.movieName.split(',');
            if(tempMovieName.length==1){
            	if(window[tempMovieName[0]]!=undefined){
	            	tempMovie=tempMovie.concat(window[tempMovieName[0]].frames);
	            }else{
	            	console.log(tempMovieName[0]+' does not exist, please check file,variables,js calling');
	            }
            }else{
            	for(i=0;i<tempMovieName.length;i++){
            		if(window[tempMovieName[i]]!=undefined){
		            	tempMovie=tempMovie.concat(window[tempMovieName[i]].frames)
		            }else{
		            	console.warn(tempMovieName[i]+' does not exist, please check file,variables in file or js calling');
		            }
            	}
            }

	        img.setAttribute('class', 'fp-img');
	        img.style.opacity = 0;
	        divCont.append(img);

	        if(opts.fixedSize){
	        	img.style.width = divCont.width()+'px';
            	img.style.height = divCont.height()+'px';
            }else{
            	divCont.width('100%');
            	divCont.height('auto');
            	img.style.width = '100%';
            	img.style.height = 'auto';
            }

	        var playIt=function (){
	            setTimeout(function(){
                    i++;
                    if (i >= tempMovie.length) {
                        i = 0;
                        j++;
                        if(j==opts.playTimes){
                            canPlay=false;
                            divCont.html(''); //停止后清空元素，以备后续再次调用是生成新元素
                            opts.onPlayEnd(); //停止后执行回调
                        }
                    }
                    img.src = tempMovie[i];
                    if(i>0){
                    	img.style.opacity = 1;
                    }
                    if(canPlay){
                    	playIt();
                    }
	            }, Math.round(1000 / opts.rate));
	        }
	        if(tempMovie.length!=0){
	        	playIt();
	        }
		};

		init();

	}
})(jQuery);

