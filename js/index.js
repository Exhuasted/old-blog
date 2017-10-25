ready(function(){
//	'use strict'
	var windowWidth = document.documentElement.clientWidth;	//可视区的宽度
	var windowHeight = document.documentElement.clientHeight;	//可视区的高度
	var halfwindowWidth = windowWidth / 2;		//可视区一半的宽度
	var halfwindowHeight = windowHeight / 2;		//可视区一半的高度
	var part = document.getElementsByClassName('part');	//获取所有的part
	var personFixed = document.getElementsByClassName('personFixed')[0];	//获取第二部分的伞
	var popupWrap =  document.getElementsByClassName('popupWrap')[0];
	//获取所有的相对位置并存入数组
	var aPos=[];	
	for(var i=0;i<part.length;i++){
		aPos.push(getPos(part[i]));
	}
	
	//第一屏
	mouseMove(part[0])
	
	//第二屏
	var list = part[1].getElementsByClassName('list')[0];
	var ol = document.createElement('ol');
	var html = '';
	//第一种forEach循环遍历数组
//	listData.forEach(function(elem,i){
//		html += '<li>'+
//					'<span>'+elem.time+'</span>'+
//					'<div class="words">'+
//						'<p>'+elem.content1+'</p>'+
//						'<p>'+elem.content2+'</p>'+
//					'</div>'+
//				'</li>'
//		
//	})
	//第二种循环遍历数组、对象
	for(var attr in listData){
		html += '<li>'+
					'<span>'+listData[attr].time+'</span>'+
					'<div class="words">'+
						'<p>'+listData[attr].content1+'</p>'+
						'<p>'+listData[attr].content2+'</p>'+
					'</div>'+
				'</li>'
	}
	//第三种只能遍历数组
//	for(var i=0;i<listData.length;i++){
//		html += `<li>
//					<span>${listData[i].time}</span>
//					<div class="words">
//						<p>${listData[i].content1}</p>
//						<p>${listData[i].content2}</p>
//					</div>
//				</li>`
//	}
	ol.innerHTML = html;
	list.appendChild(ol);
	
	//第三屏
	mouseMove(part[2])
	var seesaw = part[2].getElementsByClassName('seesaw')[0];
	var infos = part[2].querySelectorAll('div[class^="info"]');
	var seesawImg = part[2].querySelector('.seesawImg');
	var clicks = seesawImg.querySelectorAll('span[class^="click"]');
	var onOff = true;
	//给跷跷板添加点击事件
	seesawImg.addEventListener('click',function(){
		if(onOff){
			addClass('seesawImgR',seesawImg)
			addClass('onOff',seesaw)
			addClass('infoMove',infos[1])
			addClass('click',seesawImg)
			removeClass('infoMove',infos[0]);
			removeClass('seesawImgL',seesawImg);
			onOff = false;
		}else{
			removeClass('onOff',seesaw);
			removeClass('click',seesawImg);
			removeClass('seesawImgR',seesawImg);
			removeClass('infoMove',infos[1]);
			addClass('infoMove',infos[0])
			addClass('seesawImgL',seesawImg)
			onOff = true;
		}
	})
	
	//第四屏
	var skill = part[3].getElementsByClassName('skill')[0];
	var skillList = skill.querySelectorAll('li');
	var worksBox = part[3].querySelector('.worksBox');
	var worksUl = part[3].querySelector('.worksBox ul');
	var worksBoxUl=part[3].querySelector('.worksBox ul');
	var worksList = worksBoxUl.getElementsByTagName('li');
	var popupImg = popupWrap.querySelector('img');
	
	var html='';
	for(var i=0;i<worksData.length;i++){
		html += `<li>
				<a href="${worksData[i].link}" target="_blank" ></a>
				<img src="${worksData[i].img}  " alt="" draggable="false" />
				<div class="text">
					<p> ${worksData[i].text} </p>
					<a href="${ worksData[i].link} " target="_blank" index=" ${i} "></a>
				</div>
			</li>`;
	}
	worksUl.innerHTML = html;
	
	var liWeight = worksList[0].offsetWidth
	var liMriginR = parseInt(css(worksList[0],'marginRight'))
	var liMriginL = parseInt(css(worksList[0],'marginLeft'))
	var len = worksList.length
	var left = liWeight + liMriginL + liMriginR;

	//设置ul的宽度
	worksUl.style.width = (liWeight + liMriginR + liMriginL) * len + 'px';
	var worksUlWidth = worksUl.offsetWidth;
	
	//设置worksBox滚动
	var num = 0;
	var worksBoxWidth = worksBox.offsetWidth;
	Mwheel(worksBox,function(){
		//向上
		console.log(num -=left)
		if(num < 0){
			num = 0;
			worksUl.style.left = 0 + 'px';	
		}else{
			mTween(worksUl,'left',-num,800,'linear')
		}	
	},function(){
		//向下
		num += left;
		if(num >worksUlWidth - worksBoxWidth){
			num = worksUlWidth - worksBoxWidth
			worksUl.style.left = -num + 'px';
		}else{
			mTween(worksUl,'left',-num,800,'linear')
		}	
	});
	//li的a点击事件
	// worksUl.addEventListener('click',function(ev){
	// 	var ev = ev || event;
	// 	var index = parseInt(ev.target.getAttribute('index'));
	// 	if(ev.target.nodeName.toLowerCase() === 'a'){
	// 		popupWrap.style.transform = 'scale(1)';
	// 		popupWrap.style.zIndex = 999;
	// 		popupImg.src = imgArr[index];
	// 	}
	// })
	
	//第五屏

	mouseMove(part[4]);
	
	//弹出层
	var close = popupWrap.querySelector('.popupWrap>span');
	close.addEventListener('click',function(){
		popupWrap.style.transform = 'scale(0)';
	})
	
	//右侧点击
	var menu = document.querySelector('.menu');
	var menuStr='';
	for(var i=0;i<part.length;i++){
		menuStr += '<a class="'+(i?'':'active')+'"  href="javascript:;" index="'+ i +'"></a>';
	}
	
	menu.innerHTML = menuStr;
	var a = menu.getElementsByTagName('a');
	console.log(a)
	//改menu添加点击事件
	menu.addEventListener('click',function(ev){
		var ev = ev || event;
		var target = ev.target;
		if(target.nodeName.toLowerCase() === 'a'){
			if(target.className) return;
			for(var i=0;i<a.length;i++){
				a[i].className = '';
			}
			target.className = 'active';
		}
		
		//获取滚动条距离
		var scroll = window.pageYOffset;
		//点击当前A的高度
		var t = aPos[target.getAttribute('index')].t;
		console.log(t,window.pageYOffset)
//		window.scrollTo(0,t);
		var timer = setInterval(function(){
			// t < scroll时说明滚动条位置大于t应该往上滑动
			if( t < scroll){
				scroll -= 30;
				window.scrollTo(0,scroll);
				if(scroll <= t){
					window.scrollTo(0,t);
					clearInterval(timer);
				}	
			}else{
				//否则滚动条应该向下滑动
				scroll += 30;
				window.scrollTo(0,scroll);
				if(scroll >= t){
					window.scrollTo(0,t);
					clearInterval(timer);
				}	
			}	
		},30)
	},false)
	
	//滚轮滑动
	window.addEventListener('scroll',function(){
		//滚动距离
		var scrollTop = window.pageYOffset + halfwindowHeight / 2
		var s = windowHeight;
		//设置personFixed的高度
		personFixed.style.top = scrollTop  + 'px';
		//处理第二屏
		if(scrollTop > s/2 && scrollTop < 2*s){
			var li = part[1].querySelectorAll('li')
			for(var i=0 ;i<li.length;i++){
				setTimeout(function(a){
					li[a].className = 'on';
				},800*i,i)
			}
		}
		//处理第四屏
		if(scrollTop >( 2*s+halfwindowHeight) && scrollTop < 4*s){
			for(var i=0 ;i<skillList.length;i++){
				setTimeout(function(a){
					skillList[a].className = 'fadeIn';
				},500*i,i)
			}
		}
		//当滚轮滑动时给menu的a添加class
		for(var i=0,len=part.length;i<len;i++ ){
			a[i].className = '';
			if( scrollTop >= aPos[i].t &&  aPos[i+1] && scrollTop <= aPos[i+1].t ){
				a[i].className = 'active';
			}else if(scrollTop>=aPos[i].t){
				a[len-1].className = 'active';
			}
		}
	})
	
	//跟随鼠标的移动
	function mouseMove(obj){
		var moves = getByClass('move',obj);
		obj.addEventListener('mousemove',function(ev){
			ev = ev || event;
			for(var i=0;i<moves.length;i++){
				var offset = moves[i].getAttribute('dataoffset') / 100;
				css(moves[i],'transform','translate('+ (halfwindowWidth - ev.pageX) * offset + 'px,' + (halfwindowHeight - ev.pageY) * offset + 'px)');
			}
		},false)	
		
	}
})


