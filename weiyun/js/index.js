window.onload = function(){
	
	var main = document.getElementsByClassName('main-box')[0]; 
	var checkall = document.getElementsByClassName('checkall')[0];
	var creat = document.getElementsByClassName('creat')[0];
	var rename = document.getElementsByClassName('rename')[0];
	var deletes = document.getElementsByClassName('delete')[0];
	var path = document.getElementsByClassName('path')[0];
	var inner = document.getElementsByClassName('inner')[0];

	//设置数组，记录每个div的状态
	var elments = [];
	//设置pid的初始状态
	var currentPid = 0;
	//创建文件夹
	creat.onclick = function(){
		var onOff = false;
		if(onOff)return;
		var div1 = document.createElement('div');
		div1.className = 'list';
		
		var img = document.createElement('span');
		img.className = 'img img-folder';
		div1.appendChild(img);
		
		var inp = document.createElement('input');
		inp.type = 'text';
		inp.className = 'inp';
		div1.appendChild(inp);
		main.appendChild(div1)
		//获取元素应该添加之后进行获取；
		var inps = main.getElementsByClassName('inp')[0];
		
		
		inps.focus();	
		
		var name = '';
		inps.oninput = function(){
			name = inp.value;
		}
		
		inp.onblur = function(){
			if(name == ''){		
				alert('请输入文件夹名')
				inp.focus()
			}else{
				name = inp.value;
					datas.push({
						id: getMaxId() + 1,
			            pid: currentPid,
			            name: name,
			            type: 'folder'
					})
					render(getChildren(currentPid))
			}
		}
		inp.onkeyup = function(e){
			if(e.which === 13){
				var len = getChildren(currentPid)
				name = inp.value;
				for(var i=0;i<len.length;i++){
					if(name == len[i].name){
						alert('文件夹名已存在，请重新输入');
						return;
					}
				}
				if(name !== ''){
					name = inp.value;
					datas.push({
						id: getMaxId() + 1,
			            pid: currentPid,
			            name: name,
			            type: 'folder'
					})
					render(getChildren(currentPid))
				}else{
					alert('请输入内容')
					onOff = true;
				}
			}
		}
			
	}
	//面包屑导航点击
	 inner.onclick = function(e) {
        if (e.target.tagName.toLowerCase() == 'a') {
            currentPid = e.target.getAttribute('fileId');
            render( getChildren(currentPid) );
            showBreadcrumb();
        }
    }
	//重命名
	rename.onclick = function(){
		
		if(getChecked().length>0 && getChecked().length <= 1){
			var name = getChecked()[0].getElementsByClassName('name')[0];
			var inp = getChecked()[0].getElementsByClassName('name-inp')[0];
			var checkboxs = getChecked()[0].getElementsByClassName('checkbox')[0];
			name.style.display = 'none';
			inp.style.display = 'block';
			inp.value = name.innerHTML;
			inp.select();
			inp.onclick = function(e){
				e.cancelBubble = true;
			}
			inp.oninput = function(){
				name.innerHTML = inp.value;
				console.log(name.innerHTML)
				for(var i=0;i<datas.length;i++){
					if(datas[i].id == getChecked()[0].filmId){
						datas[i].name = inp.value;
						console.log(datas[i].name)
					}
				}	
			}
			inp.onkeyup = function(e){
				if(e.which == 13){
					name.style.display = 'block';
					inp.style.display = 'none';
					getChecked()[0].className = 'list';
					getChecked()[0].checked = false;
				}
			}
		}else{
			alert('请选择一个，并且最多一个文件夹')
		}
	}
	//删除
	deletes.onclick = function(){
		for(var i=0;i<getChecked().length;i++){
			main.removeChild(getChecked()[i])
			for(var j=0;j<datas.length;j++){
				if(datas[j].id == getChecked()[i].filmId){
					datas.splice(j,1)
				}
			}	
		}	
	}
	
	//调用渲染页面
	render(getChildren(currentPid))
	showBreadcrumb()
	
	//渲染页面
	function render(renderData){
		main.innerHTML = '';
		elments = [];
		for(var i=0;i<renderData.length;i++){
			createFile(renderData[i]);	
		}
	}
	
	//根据指定id获取下面的一级子数据
	function getChildren(id){
		var arr = [];
		for(var i=0;i<datas.length;i++){
			if(datas[i].pid == id){
				arr.push(datas[i])
			}
		}
		return arr;
	}
	
	//获取数据中最大的id
	function getMaxId() {
		var maxId = 0;
		for(var i=0;i<datas.length;i++){
			if(datas[i].id > maxId){
				maxId = datas[i].id
			}
		}
		return maxId
	}
	
	//全选
	checkall.onclick = function(){
		
		if(this.checked){
			checkall.checked = false;
			checkall.className = 'checkall';
			for(var i=0;i<elments.length;i++){
				elments[i].className = 'list ';
				elments[i].checked = false;
			}
		}else{
			checkall.checked = true;
			checkall.className = 'checkall checkedall';
			for(var i=0;i<elments.length;i++){
				elments[i].className = 'list list-checked';
				elments[i].checked = true;
			}
		}
		
	}
	//根据已有数据创建文件视图
//	for(var i=0;i<datas.length;i++){
//		createFile(datas[i]);	
//	}
	//创建文件夹
	function createFile(datas){
		
		var div = document.createElement('div');
		div.filmId = datas.id
		div.className = 'list';
		
		var img = document.createElement('span');
		img.className = 'img img-' + datas.type;
		div.appendChild(img);
		
		var name = document.createElement('span');
		name.className = 'name';
		div.appendChild(name);
		
		var inp = document.createElement('input');
		inp.type = 'text';
		inp.className = 'name-inp';
		div.appendChild(inp);
		
		var checkbox = document.createElement('div');
		checkbox.className = 'checkbox';
		name.innerHTML = datas.name;
		div.appendChild(checkbox);
		
		//发生事件
		div.onmouseover = function(){
			if(this.checked){
				div.className = 'list list-checked';
			}else{
				div.className = 'list list-hover';
			}
		}
		
		div.onmouseout = function(){
			if(this.checked){
				div.className = 'list list-checked';
			}else{
				div.className = 'list';
			}	
		}
		
		checkbox.onclick = function(e){
			setStatus(div,!div.checked)
			if(elments.length == getChecked().length){
				checkall.className = 'checkall checkedall';
			}else{
				checkall.className = 'checkall';
			}
			e.cancelBubble = true;
		}
		div.onclick = function(e) {
			e.cancelBubble = true;
            currentPid = this.filmId;
            console.log(currentPid)
            render( getChildren(this.filmId));
            showBreadcrumb()
           
        }
		main.appendChild(div)
		elments.push(div)	
		
	}
	//获取选中的div
	function getChecked(){
		var arr = [];
		for(var i=0;i<elments.length;i++){
			if(elments[i].checked){
				arr.push(elments[i])
			}
		}
		return arr;
	}
	function setStatus(fileElement, status){
		fileElement.checked = status;
        fileElement.className = status ? 'file file-checked' : 'file';
	}
		/*
	* 根据id获取信息
	* */
	function getInfo(id) {
	    for (var i=0; i<datas.length; i++) {
	    	
	        if (datas[i].id == id) {
	            return datas[i];
	        }
	    }
	}
	
	/*
	* 获取父级
	* */
	function getParent(id) {
	    var info = getInfo(id);
	    if (info) {
	        return getInfo(info.pid);
	    }
	}
	
	/*
	* 获取所有父级
	* */
	function getParents(id) {
	    var arr = [];
	    var parent = getParent(id);
	    if (parent) {
	        arr.push(parent);
	        arr = arr.concat( getParents(parent.id) );
	    }
	    return arr;
	}	
	function showBreadcrumb() {
		console.log(currentPid)
	    var parentList = getParents(currentPid);
	    if ( getInfo(currentPid) ) {
	        parentList.unshift( getInfo(currentPid) );
	    }
	    var html = '';
	    for (var i=parentList.length-1; i>=0; i--) {
	        html += ' ★ <a fileId="'+ parentList[i].id +'" href="javascript:;">'+ parentList[i].name +'</a>';
	    }
	    console.log(path)
	    path.innerHTML = html;
	}

}
