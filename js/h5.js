/* ΢��ҳ���߼���� ����common_h5.js
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
	
	//��������
	this.fnEnd=fnEnd||null;
	this.fnOnce=fnOnce||null;
	this.fnMove=fnMove||null;
	
	//����Ϊ
	this.bindEvent();

	//ִ��ҵ���߼�
	this.yw();
};


//��ʼ��ҵ���߼�
mmwx.prototype.yw=function(){
	this.fnOnce && this.fnOnce();
};


//�Ƴ������¼�
mmwx.prototype.removeEvent=function(){
	touch(this.oWrap).unbind();
};

//����Ϊ
mmwx.prototype.bindEvent=function(){
	var _this=this;
	//�󶨻���
	touch(_this.oWrap).swipe({
		move:function(v,e,rate){
			if(_this.isRoll){return;}
			if(_this.now<0){return;}

			//Ԫ������
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
	
	
	//����ת
	var flowTimer=null;
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
		clearTimeout(flowTimer);
		flowTimer=setTimeout(function(){
			_this.oH=document.documentElement.clientHeight;
		},200);
	}, false);
};

//�����߼�
mmwx.prototype.wrapPrev=function(){
	var _this=this;
	if(_this.now<0){return;}  //��ʱ�޸�
	//�˶��м��
	if(_this.isRoll){return;}
	_this.isRoll=true;
	
	//��ż���
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
	
	//�˶��߼�
	_this.aLi[_this.now].className=''; //�������ʱ���������
	
	var q=_this.now;
	_this.index=q;
	//�¼������������������Ա�����
	_this.oWrap.tEndFn=function(){
		_this.tEnd(q);
	};
	
	//�ص�
	_this.oWrap.addEventListener('webkitTransitionEnd',_this.oWrap.tEndFn);
	return false;
};


//�����߼�
mmwx.prototype.wrapNext=function(isToHead){
	var _this=this;
	//�˶��м��
	if(_this.isRoll){return;}
	_this.isRoll=true;
	
	//��ż���
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

	_this.aLi[_this.now].className=''; //�������ʱ���������

	var q=_this.now;
	_this.index=q;
	//�¼������������������Ա�����
	_this.oWrap.tEndFn=function(){
		_this.tEnd(q);
	};
	
	//�ص�
	_this.oWrap.addEventListener('webkitTransitionEnd',_this.oWrap.tEndFn);
	return false;
};

//����ĳҳ
mmwx.prototype.toPage=function(num,fn){
	fn && fn();
	this.now=num;
	this.index=num;
	f.transForm(this.oWrap,10,[0,-this.now*this.oH]);
	num == 0 && (this.oPont.style.display='block');
};

//�����ص�
mmwx.prototype.tEnd=function(q){
	var _this=this;
	
	//����͸���ȳ�ʼ��
	//f.tranSition(_this.oBg,800);
	//_this.oBg.style.opacity=_this.oBg.opc=1;
	_this.oWrap.style.opacity=_this.oWrap.opc=1;
	this.fnEnd && this.fnEnd(q);

	//һ�������������� �رտ���
	_this.isRoll=false;
	
	_this.oWrap.removeEventListener('webkitTransitionEnd',_this.oWrap.tEndFn);
};


/* Audio�� momo 2015-01-30 */
var mmAudio=function(aurl){
	if(!aurl){return;}
	var audio_ct=document.getElementById('audio_ct');
	this.audio=document.getElementById('audio');
	if(!this.audio){return;}
	this.audioCt=audio_ct||null;
	this.aurl=aurl;
	this.loadMusic();
};
//װ����Ƶ
mmAudio.prototype.loadMusic=function(){
	var _this=this;
	_this.audio.src=this.aurl;
	_this.audio.volume=0.5;
	if(!_this.audioCt){return;}
	_this.audioCt.style.display='block';
	_this.audioCt.className='bgAudio audioPlay';
	/*iosĬ����ͣ*/
	_this.isIphone();	

	//����Ƶ����
	_this.audioCt.addEventListener('click',function(){
		this.className=='bgAudio'?_this.playMusic():_this.pauseMusic();
	},false);
};

//������Ƶ
mmAudio.prototype.playMusic=function(){
	this.audio.play();
	this.audioCt.className='bgAudio audioPlay';
};

//��ͣ��Ƶ
mmAudio.prototype.pauseMusic=function(){
	this.audio.pause();
	this.audioCt.className='bgAudio';
};

/* ios�Զ���ͣ ios 4���� */
mmAudio.prototype.isIphone = function(){
	var sys = navigator.userAgent;
	if(sys.indexOf('iPhone')>-1){
		this.pauseMusic();
		if(sys.indexOf('OS 4')>-1){this.audioCt.style.display='none';}
	}
}



/***** ��ʼ��H5 *****/


//��ʼ��׼��
var aLis=document.querySelectorAll('#wrap>li'),allPics=[];
var oLoading=f.g('load'),oShow=f.g('show');
for(var t=0;t<aLis.length;t++){
	var tmp=aLis[t].getElementsByTagName('img');
	allPics[t]=[];
	for(var u=0;u<tmp.length;u++){
		allPics[t].push(tmp[u]);
	}
}


//�ص�ϵͳ
var configCallback = {'onece':[],'loop':[]};


//��ʼ������ͼģ��
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

//��ʼ�����ֹ���
var rollText = document.querySelectorAll('.roll-text');
for(var i=0;i<rollText.length;i++){
	rollText[i].Bubble = touch(rollText[i]).noBubble();//��ֹð��
	rollText[i].onscroll=function(){
		if(this.scrollTop == 0 || this.scrollTop >= (this.scrollHeight-this.offsetHeight)){
			this.Bubble.reBubble(); //�ָ�ð��
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
//ʵ����H5���
var h5=new mmwx(
	function(q){
		//��������
		for(var i=0;i<this.aLi.length;i++){
			f.removeClass(this.aLi[i],'active');
		}
		f.addClass(this.aLi[q],'active');
		//ͼƬ����
		if(q>0 && q<=this.P){
			c.load1(q); //��ֹ��ҳʱ��ǰ����ͼ(�����ظ�����)
			c.load1(q+1);
		}
		this.oPont.style.display = q<this.P ? 'block' : 'none';
		
		//�ص�
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
			//�״λص�
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

//��ҳ����ȫ�ֺ���
function jumpPage(num){
	h5.toPage(num,function(){
		f.addClass(aLis[num],'active');
		c.load1(num);
		//Ѱ��Ŀ�����Ļص�
		if(configCallback && configCallback[num] && !configCallback[num].runOver){
			for(var i=0;i<configCallback[num].length;i++){
				configCallback[num][i]();
			}
			configCallback[num].runOver = true;
		}
	});
}