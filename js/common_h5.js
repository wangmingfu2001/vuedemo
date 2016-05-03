/* �����ײ� V1 momo 2015-9-9 */
// f: ͨ�õײ㺯��  c�������ģ��
var f={},c={};
if(!configData){var configData={};}
//����ϵͳ
var global={
	json : {}, //�첽���ݻ���
	va :   {}, //��������
	imgs : {}, //ͼƬ����
	v :    {hasTouch : 'ontouchstart' in window} //�ͻ��������ռ�
};

//�¼�����
var EV=global.EV={
	ts : global.v.hasTouch ? 'touchstart' : 'mousedown',
	tm : global.v.hasTouch ? 'touchmove' : 'mousemove',
	te : global.v.hasTouch ? 'touchend' : 'mouseup',
	tz : 'onorientationchange' in window ? 'orientationchange' : 'resize'
};

/* version V1 momo 2014-6-15 */
global.v.UA=window.navigator.userAgent;
global.v.browserinfo={
	webkit: global.v.UA.match(/WebKit\/([\d.]+)/),
	ie: global.v.UA.match(/MSIE\s([\d.]+)/),
	iemobile: global.v.UA.match(/IEMobile\/([\d.]+)/),
	chrome: global.v.UA.match(/Chrome\/([\d.]+)/) || global.v.UA.match(/CriOS\/([\d.]+)/),
	firefox: global.v.UA.match(/Firefox\/([\d.]+)/),
	opera: global.v.UA.match(/Opera\/([\d.]+)/)
};
global.v.platforminfo={
	android: global.v.UA.match(/(Android)\s+([\d.]+)/),
	ipad: global.v.UA.match(/(iPad).*OS\s([\d_]+)/),
	windowsphone: global.v.UA.match(/(Windows\sPhone)[\sOS]*([\d\.]+)/),
	windows: global.v.UA.match(/(Windows)\sNT\s([\d\.]+)/)
};
global.v.platforminfo.ipod = global.v.platforminfo.itouch = !global.v.platforminfo.ipad && global.v.UA.match(/(iPod\s?[Ttouch]{5})[a-zA-Z\s;]*([\d_]+)/);
global.v.platforminfo.iphone = !global.v.platforminfo.ipad && !global.v.platforminfo.itouch && global.v.UA.match(/(iPhone\sOS)\s([\d_]+)/);

global.v.browser={},global.v.platform={};
for(var key in global.v.browserinfo) {
	global.v.browserinfo[key] && (global.v.browser[key] = true, global.v.browser.version = global.v.browserinfo[key][1], global.v.browser.majorVersion = parseInt(global.v.browser.version) || 0);
}
global.v.ie=global.v.browserinfo.ie?global.v.browser.majorVersion:false;
for(var key in global.v.platforminfo) {
	global.v.platforminfo[key] && (global.v.platform[key] = true, global.v.platform.version = global.v.platforminfo[key][2].replace(/_/g, '.'), global.v.platform.majorVersion = parseInt(global.v.platform.version) || 0);
}
global.v.ios = !!(global.v.platform.iphone || global.v.platform.itouch || global.v.platform.ipad);
global.v.pad = !!(global.v.platform.ipad || (global.v.platform.android && !global.v.UA.match(/Mobile/)));
global.v.phone = !!(!global.v.pad && global.v.platform.android || global.v.platform.iphone || global.v.platform.windowsphone) || /meizu|lephone|xiaomi|mui|mobile|coolpad|zte|huawei/i.test(global.v.UA);
if (global.v.phone && /safari|webkit/i.test(global.v.UA) && !/OS\s?X/i.test(global.v.UA) && !global.v.ios) {
	global.v.platform.android = true;
	global.v.browser.webkit = true;
}
global.v.ios && (global.v.platform.ios = global.v.ios);
global.v.pad && (global.v.platform.pad = global.v.pad);
global.v.phone && (global.v.platform.phone = global.v.phone);


/* publish fn V1 momo 2015-9-9 */

EV.tap=global.v.hasTouch?(global.v.ios?'touchend':'click'):('click');

f={
	g:function(sid){
		return document.getElementById(sid);
	},
	
	sumArray: function(a){
		var x=0;
		for(var i=0;i<a.length;i++){
			x +=parseInt(a[i]);
		}
		return x;
	},
	
	n:function(sname){
		var tmp=document.getElementsByName(sname)[0];
		return tmp?tmp.value:'';
	},
	
	getRand: function(Min, Max) {
		return (Min + Math.round(Math.random() * (Max - Min)));
	},
	
	
	getUrlKey : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),r = window.location.search.substr(1).match(reg);
		if (r != null){return unescape(r[2]);}
		return null;
	},
	
	
	addClass:function(obj,sClass){
		var rg=new RegExp('\\b'+sClass+'\\b');
		if(!rg.test(obj.className)){
			var oldName=obj.className;
			obj.className=oldName?oldName+' '+sClass:sClass;
		}
	},
	
	
	removeClass:function(obj,sClass){
		var rg=new RegExp('\\b'+sClass+'\\b');
		if(rg.test(obj.className)){
			obj.className=obj.className.replace(rg,'').replace(/^\s+|\s+$/,'');
		}
	},
	
	
	hasClass:function(obj,sClass){
		var rg=new RegExp('\\b'+sClass+'\\b');
		return rg.test(obj.className)?true:false;
	},
	
	
	toDobbleNum:function(num){
		num=parseInt(num);
		return num<10 ? '0'+num : num;
	},
	
	
	getCheckBox:function(cname){
		var aBox=document.getElementsByName(cname),arr=[];
		for(var i=0;i<aBox.length;i++){
			aBox[i].checked && (arr.push(aBox[i].value));
		}
		return arr;
	},
	
	
	setStyle:function(obj,cssJson){
		for(var j in cssJson){
			j=f.resetClassName(j);
			obj.style[j]=cssJson[j];
		}
	},
	
	
	inArray:function(a,vv){
		for(var i=0;i<a.length;i++){
			if(vv==a[i]){return i;}
		}
		return-1;
	},
	

	isChild:function(oParent,obj){
		while(obj){
			if(obj==oParent){return true;}
			obj=obj.parentNode;
		}
		return false;
	},


	getStyle:function(obj,sName){
		return obj.currentStyle?obj.currentStyle[sName]:getComputedStyle(obj,false)[sName];
	},
	
	
	insertCss:[],
	
	
	createStyle:function(cssText){
		if(f.inArray(f.insertCss,cssText)!=-1){return;}
		f.insertCss.push(cssText);
		var oStyle=document.createElement('style');
		oStyle.type='text/css';
		if(oStyle.styleSheet){
			oStyle.styleSheet.cssText=cssText;
		}else{
			oStyle.appendChild(document.createTextNode(cssText));
		}
		document.getElementsByTagName('head')[0].appendChild(oStyle);
	},
	
	
	live:function(obj,sEv,fn){
		function _fn2(ev){
			f.isChild(obj,ev.target) && fn.call(obj);
		}
		document.addEventListener(sEv,_fn2,false);
	},
	
	
	getPos: function(obj) {
		var left=0,top=0;
		while(obj){
			left+=obj.offsetLeft;
			top+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return{x:left,y:top};
	},
	
	
	setCookie : function(name,value,iDay){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie=name+'='+value+';expires='+oDate;
	},
	
	
	getCookie : function(name){
		var arr=document.cookie.split('; ');
		for(var i=0;i<arr.length;i++){
			var arr2=arr[i].split('=');
			if(arr2[0]==name){return decodeURI(arr2[1]);}
		}
		return '';
	},
	
	
	removeCookie: function(name){
		setCookie(name,'0',-1);
	},


	jsonp:function(url,data,cbName,fnSucc){
		if(typeof cbName!='function'){
			var fnName='jsonp_'+Math.random();
			fnName=fnName.replace('.','');
			window[fnName]=function(){
				fnSucc&&fnSucc.apply(this,arguments);
				oHead.removeChild(oS);
				window[fnName]=null;
			};
			data[cbName]=fnName;
		}
		var arr=[];
		for(var i in data){
			arr.push(i+'='+data[i]);
		}
		
		var str=(url.indexOf('?')==-1)?url+'?'+arr.join('&'):url+'&'+arr.join('&'),
			oS=document.createElement('script'),
			oHead=document.getElementsByTagName('head')[0];
		oS.src=str;
		oHead.appendChild(oS);
		if(typeof cbName!='function'){return;}
		oS.onload=function(){
			cbName && cbName.apply();
		};
	},
	
	
	loadJs : function(str,fnEnd,sid){
		var oS=document.createElement('script'),oHead=document.getElementsByTagName('head')[0];
		oS.src=str;oS.id=sid||'';
		oHead.appendChild(oS);
		oS.onload=function(){
			fnEnd && fnEnd();
		};
	},
	
	
	transForm : function(obj,speed,iTarget,type){
		var ele=obj.style;
		type = type || 'linear';
		speed = speed || 0;
		ele.webkitTransition = ele.transition ='all '+ speed + 'ms '+type;
	
		iTarget[0]=iTarget[0]+'';
		iTarget[1]=iTarget[1]+'';
		if(iTarget[0].indexOf('px')==-1){iTarget[0]+='px';}
		if(iTarget[1].indexOf('px')==-1){iTarget[1]+='px';}
		
		ele.webkitTransform =ele.transform ='translateX('+iTarget[0]+') translateY('+ iTarget[1] +') translateZ(0)';
	},
	
	scale : function(obj,iTarget){
		var ele=obj.style;
		ele.webkitTransition = ele.transition = 0;
		ele.webkitTransform =ele.transform ='scale('+iTarget+') translateZ(0)';
	}
};

global.f=f;
global.c=c;


/* touch v3.0 by-momo 2016-03-22 */
/* 
�ӿ�˵�� 
	ȫ�ֱ�¶���� touch������Ϊ���󶨵Ķ���(ԭ��)
	
	��ʽ����8����������function��
		start()  move()  tap()  right()
		left()   up()  down()  revert()
		
	��Ϸ���1��
		swipe(json)  ��������json��
		
	��������󶨼��ٴΰ�
		bind()
		unbind()
		
	��ֹ/�ָ�ð��
		noBubble()
		reBubble()
		
	����1��
		this.stop   �� true:ֹͣ��Ĭ��Ϊfalse��
*/ 
;(function(global,doc,factoryFn){
	var factory = factoryFn(global,doc);
	//window�ӿ�
	window.touch = window.touch || factory;
	//CommonJS�淶�Ľӿ�
	window.define && define(function(require,exports,module){
		return factory;
	});
})(this,document,function(window,document){
	//class-touch
	var Touch = new Function();
	
	Touch.prototype = {
		version :        '3.0',  //3.0�İ�
		constructor :  Touch,
		hasTouch :  'ontouchstart' in window,
		
		//ȫ��ð�ݿ���
		cb : false,
		
		//��ʼ�� [el������Ĵ�����Ԫ��]
		init : function(el){
			if(!el){return;}
			this.EVS = this.hasTouch ? 'touchstart' : 'mousedown';
			this.EVM = this.hasTouch ? 'touchmove' : 'mousemove';
			this.EVE = this.hasTouch ? 'touchend' : 'mouseup';
			this.el = el;
			this.XY = {};              //���������е����꼯��
			this.type = {};           //����� ������Ϊ����
			this.tapTimeOut = null; //tap�ӳٵĶ�ʱ��
			this.direction = '';         //�����ƶ��ķ���
			this.firstMove = false;  //�Ƿ��ǵ�һ�λ���(�������û�����ѡ��)
			this.stop = false;          //ֹͣ����
			this.estimate = '';         //�û�Ԥ�ڻ�������洢
			this.el._evs = this.el._evs || null;   //�¼�����
			this.bind();                   //�����¼���
		},
		
		//�¼���
		bind : function( callback,touchType ){
			var _this = this;
			//�¼��������(������)
			if(!_this.el._evs){
				_this.el._evs = {
					fn_ts : function(e){ _this.ts.call(_this,e) },
					fn_tm : function(e){ _this.tm.call(_this,e) },
					fn_te :  function(e){ _this.te.call(_this,e) }
				};
			}
			_this.el.addEventListener( _this.EVS,_this.el._evs.fn_ts,false );
			_this.el.addEventListener( _this.EVM,_this.el._evs.fn_tm,false );
			_this.el.addEventListener( _this.EVE,_this.el._evs.fn_te,false );
			_this.el.onselectstart = function(){return false;};
			return this;
		},
		
		//�¼��Ƴ�
		unbind : function(){
			var _this = this;
			_this.el.removeEventListener( _this.EVS,_this.el._evs.fn_ts );
			_this.el.removeEventListener( _this.EVM,_this.el._evs.fn_tm );
			_this.el.removeEventListener( _this.EVE,_this.el._evs.fn_te );
			return this;
		},
		
		//�����ص�����
		swipe : function( json ){
			typeof(json)=='object' && (this.type = json);
			return this;
		},
		
		//��ֹð��
		noBubble : function(){
			this.cb = true;
			return this;
		},
		
		//�ָ�ð��
		reBubble : function(){
			this.cb = false;
			return this;
		},
		//������ʼ
		ts : function(e){
			var _this = this, d = this.XY;
			
			//���ݴ������Ϊ�󶨣�Ԥ�����û�����
			if(!this.estimate){
				if( this.type.left || this.type.right ){
					this.estimate = 'x';
				}
				if( this.type.up || this.type.down ){
					this.estimate = 'y';
				}
				if(this.type.move && !this.type.left && !this.type.right &&  !this.type.down  && !this.type.up){
					this.estimate = 'm';
				}
			}
			
			//���û�������
			_this.stop = false;
			
			//��¼����
			d.x1 = _this.hasTouch ? e.touches[0].pageX : e.clientX;
			d.y1 = _this.hasTouch ? e.touches[0].pageY : e.clientY;

			//ִ��touchstart�¼�
			_this.type['start'] && _this.type['start'].call(_this);
			
			//190�����ִ��tap�¼�
			_this.tapTimeOut = setTimeout(function(){
				_this.type['tap'] && _this.type['tap'].call(_this);
				_this.stop = true;
			},190);
			
			e.cancelBubble = _this.cb;
			return false;
		},
		
		//��������
		tm : function(e){
			if(this.stop){return;}
			var _this = this,
				 d = this.XY,
				 vv = {}, //���ص������
				 rate = {}; //���صı��ʻ�׼
				 
				 
			//��¼������
			d.x2 = _this.hasTouch ? e.touches[0].pageX : e.clientX;
			d.y2 = _this.hasTouch ? e.touches[0].pageY : e.clientY;
			
			//�����(move�����Ĳ���)
			vv.x = d.x2 - d.x1;
			vv.y = d.y2 - d.y1;
			
			//���ʼ���
			rate.y = (vv.y * 0.005).toFixed(3);
			rate.y>1 && (rate.y=1);
			rate.y<-1 && (rate.y=-1);
			
			rate.x = (vv.x * 0.005).toFixed(3);
			rate.x>1 && (rate.x=1);
			rate.x<-1 && (rate.x=-1);
			
			//�����ж�
			if(Math.abs(vv.x)>3 || Math.abs(vv.y)>3){   //�϶��˴��¼�Ϊmove�¼�
			
				//�Ѿ����������tap�¼�
				clearTimeout(_this.tapTimeOut);
				
				e.cancelBubble=_this.cb;
				
				//���ж��û���Ϊ����move
				if( !_this.firstMove ){
					//ƥ���û���ͼ
					switch(_this.estimate){
						case 'x':
							if(Math.abs(vv.x)>Math.abs(vv.y)){
								_this.firstMove = true;
								e.preventDefault();
							}else{
								_this.stop = true;
								return;
							}
						break;
						case 'y':
							if(Math.abs(vv.y)>Math.abs(vv.x)){
								_this.firstMove = true;
								e.preventDefault();
							}else{
								_this.stop = true;
								return;
							}
						break;
						case 'm':
							_this.firstMove = true;
							e.preventDefault();
						break;
						default:
						break;
					};
					
				}else{ //�ڶ��ο�ʼ�˶�	
					e.preventDefault();
					_this.type['move'] && _this.type['move'].call(_this,vv,e,rate);
				}
				
			}else{  //�϶��˴��¼�Ϊ����¼�
				e.preventDefault();
			}
			return false;
		},
		
		//��������
		te : function(e){
			if(this.stop){return;}
			
			//����ʼִ�лص���ʱ�򣬹ر�start �� move
			this.stop = true;
			
			//λ�ü���
			this.direction = Touch.swipeDirection(this.XY.x1, this.XY.x2, this.XY.y1, this.XY.y2);
			
			//��ʼ�˶�
			if(this.type[this.direction]){
				this.type[this.direction].call(this);
			}else if(this.type['revert']){
				this.type['revert'].call(this);
			}
			
			//������꼯
			this.XY = {};
			
			//�ָ�move�ķ���ʶ��
			this.firstMove = false;
		},
		
		//����transForm
		transForm : function(obj,speed,iTarget,type){
			var ele=obj.style;
			type = type || 'linear';
			speed = speed || 0;
			ele.webkitTransition = ele.transition ='all '+ speed + 'ms '+type;

			iTarget[0]=iTarget[0]+'';
			iTarget[1]=iTarget[1]+'';
			if(iTarget[0].indexOf('px')==-1){iTarget[0]+='px';}
			if(iTarget[1].indexOf('px')==-1){iTarget[1]+='px';}
			
			ele.webkitTransform =ele.transform ='translateX('+iTarget[0]+') translateY('+ iTarget[1] +') translateZ(0)';
		}
	};
	
	//��չ����
	['start', 'move', 'tap', 'right', 'left', 'up', 'down', 'revert'].forEach(function(key){
		Touch.prototype[key] = function(callback){
			this.type[key] = callback;
			return this;
		}
	});
	
	//��������ʶ����
	Touch.swipeDirection=function(x1, x2, y1, y2){
		if(Math.abs(x2 - x1) > 50 || Math.abs(y1 - y2) > 50){
				return Math.abs(x1 - x2) >=	Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
		}else{
			return 'revert';	
		}
	};
	
	
	//init������ԭ��ָ��touch��ԭ��
	Touch.prototype.init.prototype = Touch.prototype;
	
	//�����������
	return function( el ){
		 return new Touch.prototype.init( el );
	};
});

/**** ҵ���߼� ****/

//װ��ͼƬ [m:�� , n:��]
c.load1 = function(m,n,callback){
	n = n||0;
	m = m||0;
	//û���������ݻ����Ѽ�����ϣ���ֹ
	if(!allPics[m] || allPics[m].loadOver==true){return;}
	
	var p = allPics[m].length,_this = this;
	
	//���������ϻ��߱�����ͼ
	if(n>=p || p<1){
		if(!m){
			callback && callback();
			_this.load1(1); //��Ĭ���صڶ���
		}
		allPics[m].loadOver=true; //�������ʶ
		return;	
	}
	
	//��ʼ���ر��鱾��
	var tmp=allPics[m][n].getAttribute('_url');
	
	//����ͼƬ��������
	if(!tmp){_this.load1(m,n+1,callback); return;}
	
	allPics[m][n].src=tmp;
	allPics[m][n].onload=allPics[m][n].onerror=function(){
		setTimeout(function(){_this.load1(m,n+1,callback)},60);
	};
}

/*
	ͨ�ý���ͼ v1.0 momo 2016-04-12
	[���� ktouch3.0+]
	[��������ʶ��class=row1��Բ��ʶ��class=row2(����û��)]

	ʹ��ʾ��
	new aFocusVM({
		oSection:  aFocus[i],  //����ͼ����
		ww:           0,      //���������Ĭ���� 0
		loop:         true, //�Ƿ�ѭ����Ĭ��false
		LazyImg :  true,  //�Ƿ����أ�Ĭ��false
		LazyTag :   '_src', //����ر�ʶ��Ĭ�� _src
		aotuPlay : true   //�Ƿ��Զ����ţ�Ĭ��false
	});
*/
;(function(global,doc,factoryFn){
	var factory = factoryFn(global,doc);

	//����ӿ�
	if(typeof(c) === 'object'){
		c.classFocus = c.classFocus || factory;
	}else{
		window.classFocus = window.classFocus || factory;
	}
	//AMD/CMD�ӿ�
	window.define && define(function(require,exports,module){
		return factory;
	});
	
})(this,document,function(window,document){
	
	var classFocus = function (json){
		this.version = '1.0';

		if(!json.oSection){return;}

		var oBox=json.oSection.getElementsByClassName('row1')[0],
			 oDiv=json.oSection.getElementsByClassName('row2')[0],
			 ww=json.ww,loop=json.loop;

		var oUl=oBox.getElementsByTagName('ul')[0],
			aLi=oUl.children,
			num=aLi.length,
			oPrev=oBox.getElementsByClassName('sub_prev')[0],
			oNext=oBox.getElementsByClassName('sub_next')[0];

		this.el={
			oBox:    oBox,
			oDiv:     oDiv,
			oUl:      oUl,
			aLi:       aLi,
			oPrev:    oPrev,
			oNext:    oNext,
			num:      num,
			now:      loop?num:0,
			oW:       ww?(oBox.offsetWidth-ww):oBox.offsetWidth,
			isRoll:   false,
			aImg:     null,
			aSpan:    [],
			loop:     json.loop || false,
			LazyImg: json.LazyImg || false,
			LazyTag: json.LazyTag || '_src',
			aotuPlay: json.aotuPlay || false
		};

		this.init();
	};
	
	//����transForm
	classFocus.transForm = function(obj,speed,iTarget,type){
		var ele=obj.style;
		type = type || 'linear';
		speed = speed || 0;
		ele.webkitTransition = ele.transition ='all '+ speed + 'ms '+type;

		iTarget[0]=iTarget[0]+'';
		iTarget[1]=iTarget[1]+'';
		if(iTarget[0].indexOf('px')==-1){iTarget[0]+='px';}
		if(iTarget[1].indexOf('px')==-1){iTarget[1]+='px';}

		ele.webkitTransform =ele.transform ='translateX('+iTarget[0]+') translateY('+ iTarget[1] +') translateZ(0)';
	};
	
	classFocus.prototype={
		init : function(){

			var t=this.el,_t=this;
			//��ͼƬ����
			if(t.aLi.length<=1){
				var tmp=t.oBox.getElementsByTagName('img')[0];
				t.LazyImg && (this.loadImg(tmp));
				return;
			}
			//��ʼ��λ�á���ť��ԭ��
			classFocus.transForm(t.oUl,0,[-t.now*t.oW,0]);
			t.loop && (t.oUl.innerHTML+=(t.oUl.innerHTML+t.oUl.innerHTML));
			t.aImg=t.oBox.getElementsByTagName('img');
			for(var i=0;i<t.num;i++){
				if(!t.oDiv){break;}
				var oSpan=document.createElement('span');
				i==0&&(oSpan.className='cur');
				t.oDiv.appendChild(oSpan);
				t.aSpan.push(oSpan);
			}
			//��ʼ���ӳ�ͼƬ
			t.LazyImg && (_t.loadImg(t.aImg[t.now]));
			//�����¼���
			_t.bind(t.isRoll);
			//�Զ�����
			t.aotoTimer = t.aotuPlay?setInterval(function(){_t.next();},5000):null;
		},

		bind : function(){
			var t=this.el,_t=this;
			touch(t.oBox).left(function(){
				_t.next();
			}).right(function(){
				_t.prev();
			}).move(function(v,e){
				if(t.isRoll){return;}
				if(t.aotoTimer){
					clearInterval(t.aotoTimer);
					t.aotoTimer=null;
				}
				classFocus.transForm(t.oUl,0,[-t.now*t.oW+v.x/2,0]);
				if(v.x>35){
					t.LazyImg && (_t.loadImg(t.aImg[t.now-1]));
				}else if(v.x<-35){
					t.LazyImg && (_t.loadImg(t.aImg[t.now+1]));
				}
			}).revert(function(){
				classFocus.transForm(t.oUl,250,[-t.now*t.oW,0]);
			});

			if(t.oPrev && t.oNext){
				t.oPrev.addEventListener('click',function(){
					_t.prev();
				},false);
				t.oNext.addEventListener('click',function(){
					_t.next();
				},false);
			}

			var focusTimer=null;
			window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
				clearTimeout(focusTimer);
				flowTimer=setTimeout(function(){
					t.oW=t.ww?(t.oBox.offsetWidth-t.ww):t.oBox.offsetWidth;
					classFocus.transForm(t.oUl,200,[-t.now*t.oW,0]);
				},200);
			}, false);
		},

		next : function(){
			var t=this.el,_t=this;
			if(t.isRoll){return;}
			t.isRoll=true;
			t.now++;
			!t.loop && (t.now>=t.num && (t.now=t.num-1));
			classFocus.transForm(t.oUl,250,[-t.now*t.oW,0]);

			t.oBox.tEndFn=function(){
				_t.tEnd();
			};
			t.oBox.addEventListener('webkitTransitionEnd',t.oBox.tEndFn);
			return false;
		},

		prev : function(){
			var t=this.el,_t=this;
			if(t.isRoll){return;}
			t.isRoll=true;
			t.now--;
			!t.loop && (t.now<0 && (t.now=0));
			classFocus.transForm(t.oUl,250,[-t.now*t.oW,0]);

			t.oBox.tEndFn=function(){
				_t.tEnd();
			};
			t.oBox.addEventListener('webkitTransitionEnd',t.oBox.tEndFn);
			return false;
		},

		tEnd : function(){
			var t=this.el,_t=this;
			if(t.aotuPlay){t.LazyImg && (_t.loadImg(t.aImg[t.now]));}
			if(t.loop){
				if(t.now>2*t.num-1){
					t.now=t.num;
					classFocus.transForm(t.oUl,0,[-t.now*t.oW,0]);
				}
				if(t.now<t.num){
					t.now=2*t.num-1;
					classFocus.transForm(t.oUl,0,[-t.now*t.oW,0]);
					t.LazyImg && (_t.loadImg(t.aImg[t.now]));
				}
			}
			if(t.oDiv){
				for(i in t.aSpan){t.aSpan[i].className='';}
				t.loop?t.aSpan[t.now-t.num].className='cur':t.aSpan[t.now].className='cur';
			}

			t.isRoll=false;

			if(!t.aotoTimer && t.aotuPlay){
				t.aotoTimer = setInterval(function(){_t.next();},5000);
			}
			t.oBox.removeEventListener('webkitTransitionEnd',t.oBox.tEndFn);
		},


		loadImg : function(obj){
			if(obj.loadOver){return;}
			obj.getAttribute(this.el.LazyTag) && (obj.src=obj.getAttribute(this.el.LazyTag));
			obj.onload=function(){this.loadOver=1;}
		}
	};

	//�����������
	return classFocus;
});