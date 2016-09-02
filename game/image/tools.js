//通过id class tagName获取元素
function $(selector,context){
	var firstChar = selector.charAt();
	context = context || document;
	if( firstChar === "#"){
		return document.getElementById(selector.slice(1));
	}else if( firstChar === "." ){
		return context.getElementsByClassName(selector.slice(1));
	}else{
		return context.getElementsByTagName(selector);
	}
};
