//DOM加载完成函数
function ready(fn) {
	document.addEventListener('DOMContentLoaded',function(){
		if( fn && Object.prototype.toString.call(fn) === '[object Function]'){
			fn();
		}
	})
}

//设置、获取css
function css() {

	if(arguments.length == 2){
		if(arguments[0].currentStyle){
			return arguments[0].currentStyle[arguments[1]];
		}else{
			
			return getComputedStyle(arguments[0])[arguments[1]];
		}
	}else{
		arguments[0].style[arguments[1]] = arguments[2];
	}
}
//获取class
function getByClass(sClass,parent){
	parent = parent || document;
	if(parent.getElementsByClassName){
		return parent.getElementsByClassName(sClass);
	}
}
//添加class
function addClass(sClass,parent) {
	parent = parent || document;
	if(parent.className == ''){
		parent.className = sClass;
	}else{
		var arrClass = parent.className.split(' ');
		var index = addIndexOf(arrClass,sClass);
		if(index == -1){
			parent.className += ' ' + sClass;
			
		}
	}
}
//移除class
function removeClass(sClass,parent) {
	parent = parent || document;
	//如果原来有class
	if(parent.className !== ''){
		var arrClass = parent.className.split(' ');
		console.log(arrClass)
		var index = addIndexOf(arrClass,sClass);
		console.log(index)
		if(index !== -1){
			console.log(arrClass.splice(index,1))
			parent.className = arrClass.join(' ');
		}
	}
}

function addIndexOf(arr,sClass) {
	for(var i=0;i<arr.length;i++){
		if(arr[i] == sClass){
			return i
		}
	}
	return -1
}

//鼠标滚轮事件
function Mwheel(obj,callbackUp,callbackDown) {
	//谷歌、IE
	obj.addEventListener('mousewheel',function(ev){
		var ev = ev || event;
		fn(ev)
		
	})
	//ff
	obj.addEventListener('DOMMouseScorll',function(){
		var ev = ev || event;
		fn(ev)
	})
	
	function fn(ev){
		var ev = ev || event;
		var fx = ev.wheelDelta || ev.detail;
		var onOff = true;
		if(ev.wheelDelta){
			onOff = fx > 0 ? false : true;
		}else{
			onOff = fx < 0 ? false : true;
		}
		
		if(onOff){
			//向下
			
			callbackDown && callbackDown()
		}else{
			//向上
			callbackUp && callbackUp()
		
		}
		ev.preventDefault();
	}
}
function getPos(obj){
	var pos={t:0,l:0};
	
	while(obj){
		pos.t += obj.offsetTop;
		pos.l += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return pos;
}