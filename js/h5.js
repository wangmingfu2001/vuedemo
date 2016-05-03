/* 微信页面逻辑框架 依赖common_h5.js
 2014-12-23 2016-03-22 */
window.mmwx=function(fnEnd,fnOnce,fnMove){
	this.oWrap=f.g('wrap');
	this.oPont=f.g('pont');
	this.aLi=this.oWrap.children;

	this.oPont && (this.oPontCur=this.oPont.children[0]);
	
	this.oH=this.oWrap.parentNode.offsetHeight || document.documentElement.clientHeight;
	this.now=0;
	this.index=0;
	this.P=this.aLi.length-1;
	this.isRoll=false;
	
	this.clo=document.getElementById('clo');
	
	//参数函数
	this.fnEnd=fnEnd||null;
	this.fnOnce=fnOnce||null;
	this.fnMove=fnMove||null;
	
	//绑定行为
	this.bindEvent();

	//执行业务逻辑
	this.yw();
};


//初始化业务逻辑
mmwx.prototype.yw=function(){
	this.fnOnce && this.fnOnce();
};


//移除滑动事件
mmwx.prototype.removeEvent=function(){
	touch(this.oWrap).unbind();
};

//绑定行为
mmwx.prototype.bindEvent=function(){
	var _this=this;
	//绑定滑动
	touch(_this.oWrap).swipe({
		move:function(v,e,rate){
			if(_this.isRoll){return;}
			if(_this.now<0){return;}

			//元件运算
			if(_this.fnMove && _this.fnMove.length && _this.fnMove[_this.now]){
				_this.fnMove[_this.now].call(_this,v,rate.y);
			}else{
				f.transForm(_this.oWrap,0,[0,-_this.now*_this.oH+v.y/2]);
			}
			
			for(var j=0;j<_this.aLi.length;j++){
				f.removeClass(_this.aLi[j],'cur');
			}
			f.addClass(_this.aLi[_this.now],'cur');
		},
		revert:function(){
			f.transForm(_this.oWrap,150,[0,-_this.now*_this.oH]);
			f.removeClass(_this.aLi[_this.now],'cur');
		},
		up:function(){
			_this.wrapNext();
		},
		down:function(){
			_this.wrapPrev();
		}
	}).noBubble();
	
	
	//绑定旋转
	var flowTimer=null;
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
		clearTimeout(flowTimer);
		flowTimer=setTimeout(function(){
			_this.oH=document.documentElement.clientHeight;
		},200);
	}, false);
};

//上切逻辑
mmwx.prototype.wrapPrev=function(){
	var _this=this;
	if(_this.now<0){return;}  //临时修改
	//运动中检测
	if(_this.isRoll){return;}
	_this.isRoll=true;
	
	//序号计算
	_this.now--;
	if(_this.now<0){
		_this.now=0;
		f.transForm(_this.oWrap,200,[0,10]);
		setTimeout(function(){
			f.transForm(_this.oWrap,200,[0,0]);
		},200);
	}else{
		f.transForm(_this.oWrap,300,[0,-_this.now*_this.oH]);
	}
	
	//运动逻辑
	_this.aLi[_this.now].className=''; //点击切屏时清分屏动画
	
	var q=_this.now;
	_this.index=q;
	//事件函数存自身的属性里，以便解除绑定
	_this.oWrap.tEndFn=function(){
		_this.tEnd(q);
	};
	
	//回调
	_this.oWrap.addEventListener('webkitTransitionEnd',_this.oWrap.tEndFn);
	return false;
};


//下切逻辑
mmwx.prototype.wrapNext=function(isToHead){
	var _this=this;
	//运动中检测
	if(_this.isRoll){return;}
	_this.isRoll=true;
	
	//序号计算
	_this.now++;
	
	if(_this.now>_this.P){
		_this.now=isToHead?0:_this.P;
		f.transForm(_this.oWrap,200,[0,-_this.now*_this.oH-10]);
		setTimeout(function(){
			f.transForm(_this.oWrap,200,[0,-_this.now*_this.oH]);
		},200);
	}else{
		f.transForm(_this.oWrap,300,[0,-_this.now*_this.oH]);
	}

	_this.aLi[_this.now].className=''; //点击切屏时清分屏动画

	var q=_this.now;
	_this.index=q;
	//事件函数存自身的属性里，以便解除绑定
	_this.oWrap.tEndFn=function(){
		_this.tEnd(q);
	};
	
	//回调
	_this.oWrap.addEventListener('webkitTransitionEnd',_this.oWrap.tEndFn);
	return false;
};

//跳到某页
mmwx.prototype.toPage=function(num,fn){
	fn && fn();
	this.now=num;
	this.index=num;
	f.transForm(this.oWrap,10,[0,-this.now*this.oH]);
	num == 0 && (this.oPont.style.display='block');
};

//切屏回调
mmwx.prototype.tEnd=function(q){
	var _this=this;
	
	//背景透明度初始化
	//f.tranSition(_this.oBg,800);
	//_this.oBg.style.opacity=_this.oBg.opc=1;
	_this.oWrap.style.opacity=_this.oWrap.opc=1;
	this.fnEnd && this.fnEnd(q);

	//一次完整动画结束 关闭开关
	_this.isRoll=false;
	
	_this.oWrap.removeEventListener('webkitTransitionEnd',_this.oWrap.tEndFn);
};


/* Audio类 momo 2015-01-30 */
var mmAudio=function(aurl){
	if(!aurl){return;}
	var audio_ct=document.getElementById('audio_ct');
	this.audio=document.getElementById('audio');
	if(!this.audio){return;}
	this.audioCt=audio_ct||null;
	this.aurl=aurl;
	this.loadMusic();
};
//装载音频
mmAudio.prototype.loadMusic=function(){
	var _this=this;
	_this.audio.src=this.aurl;
	_this.audio.volume=0.5;
	if(!_this.audioCt){return;}
	_this.audioCt.style.display='block';
	_this.audioCt.className='bgAudio audioPlay';
	/*ios默认暂停*/
	_this.isIphone();	

	//绑定音频控制
	_this.audioCt.addEventListener('click',function(){
		this.className=='bgAudio'?_this.playMusic():_this.pauseMusic();
	},false);
};

//播放音频
mmAudio.prototype.playMusic=function(){
	this.audio.play();
	this.audioCt.className='bgAudio audioPlay';
};

//暂停音频
mmAudio.prototype.pauseMusic=function(){
	this.audio.pause();
	this.audioCt.className='bgAudio';
};

/* ios自动暂停 ios 4隐藏 */
mmAudio.prototype.isIphone = function(){
	var sys = navigator.userAgent;
	if(sys.indexOf('iPhone')>-1){
		this.pauseMusic();
		if(sys.indexOf('OS 4')>-1){this.audioCt.style.display='none';}
	}
}



/***** 初始化H5 *****/


//初始化准备
var aLis=document.querySelectorAll('#wrap>li'),allPics=[];
var oLoading=f.g('load'),oShow=f.g('show');
for(var t=0;t<aLis.length;t++){
	var tmp=aLis[t].getElementsByTagName('img');
	allPics[t]=[];
	for(var u=0;u<tmp.length;u++){
		allPics[t].push(tmp[u]);
	}
}


//回调系统
var configCallback = {'onece':[],'loop':[]};


//初始化焦点图模块
var aFocus =  document.querySelectorAll('.mod_focus');
for(var i=0;i<aFocus.length;i++){
	(function(i){
		if(!aFocus[i].title){return;}
		if(!configCallback[aFocus[i].title]){
			configCallback[aFocus[i].title] = [];
		}
		configCallback[aFocus[i].title].push(function(){
			new c.classFocus({
				oSection:  aFocus[i], 
				ww:           0,
				loop:         true,
				LazyImg :  true
			});
		});
	})(i);
}

//初始化文字滚动
var rollText = document.querySelectorAll('.roll-text');
for(var i=0;i<rollText.length;i++){
	rollText[i].Bubble = touch(rollText[i]).noBubble();//阻止冒泡
	rollText[i].onscroll=function(){
		if(this.scrollTop == 0 || this.scrollTop >= (this.scrollHeight-this.offsetHeight)){
			this.Bubble.reBubble(); //恢复冒泡
		}
	};
}
configCallback['loop'].push(function(){
	for(var i=0;i<rollText.length;i++){
		rollText[i].Bubble.noBubble(); 
	}
});


var test1 = document.getElementById('boll1');
var test2 = document.getElementById('boll2');
var test3 = document.getElementById('boll3');
var test4= document.getElementById('boll4');
//实例化H5框架
var h5=new mmwx(
	function(q){
		//动画激活
		for(var i=0;i<this.aLi.length;i++){
			f.removeClass(this.aLi[i],'active');
		}
		f.addClass(this.aLi[q],'active');
		//图片加载
		if(q>0 && q<=this.P){
			c.load1(q); //防止跳页时当前屏无图(不会重复加载)
			c.load1(q+1);
		}
		this.oPont.style.display = q<this.P ? 'block' : 'none';
		
		//回调
		if(configCallback['loop'] && configCallback['loop'].length){
			for(var i=0;i<configCallback['loop'].length;i++){
				configCallback['loop'][i].call(this);
			}
		}
		if(configCallback[q] && configCallback[q].length && !configCallback[q].runOver){
			for(var i=0;i<configCallback[q].length;i++){
				configCallback[q][i].call(this);
			}
			configCallback[q].runOver = true;
		}
	},
	function(){
		var _this = this;
		//loading
		c.load1(0,0,function(){
			oLoading.style.display='none';
			oShow.style.display='block';
			//首次回调
			if(configCallback['onece'] && configCallback['onece'].length){
				for(var i=0;i<configCallback['onece'].length;i++){
					configCallback['onece'][i].call(_this);
				}
			}
		});
		f.addClass(this.aLi[0],'active');
	},
	[
		function(v,rate){
			var rate2=Math.abs(1-rate)*1.2;
			var rate3 = 1-Math.abs(rate)*0.6;
			rate2<1 && (rate2=1);
			f.scale(test1,rate2);
			f.scale(test2,rate2);
			if(rate<0){
				test1.style.opacity = (rate3);
				test2.style.opacity = (rate3);
			}
		},
		function(v,rate){
			var rate3 = 1-Math.abs(rate)*0.9;
			f.transForm(test3,0,[rate*180,0]);
			f.transForm(test4,0,[-rate*180,0]);
			test3.style.opacity = (rate3);
			test4.style.opacity = (rate3);
		}
	]
);

//跳页功能全局函数
function jumpPage(num){
	h5.toPage(num,function(){
		f.addClass(aLis[num],'active');
		c.load1(num);
		//寻找目标屏的回调
		if(configCallback && configCallback[num] && !configCallback[num].runOver){
			for(var i=0;i<configCallback[num].length;i++){
				configCallback[num][i]();
			}
			configCallback[num].runOver = true;
		}
	});
}