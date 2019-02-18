function getFirstChild(parent) { // 获取第一个子节点
	var ele = parent.firstElementChild || parent.firstChild;
	return  ele;
};
function getLastChild(parent) { // 获取最后一个子节点
	var ele = parent.lastElementChild || parent.lastChild;
	return  ele;
};
function getNextChild (ele) { // 获取当前节点的下一个节点
	var ele = ele.nextElementSibling || ele.nextSibling;
	return  ele;
};
function getPrevChild (ele) { // 获取当前节点的上一个节点
	var ele = ele.previousElementSibling || ele.previousSibling;
	return  ele;
};

// 获取非行间样式
function getStyle(obj, styleName) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[styleName];
	} else {
		return obj.currentStyle[styleName];
	};
};
// 绑定事件addEventListener方法兼容性
function bind (obj,event, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(event, fn, false);
	} else {
		obj.attachEvent('on'+ event, function() {
			fn.call(obj);
		});
	}
};
// 解除绑定事件removeEventListener方法兼容性
function unbind (obj,event, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(event, fn);
	} else {
		obj.detachEvent('on'+ event, function() {
			fn.call(obj);
		});
	}
};
//method: 滚动条返回顶部
var timer = null;
function backTop () {
	timer = setInterval(function () {
		var scrollTop = document.documentElement.scrollTop;
		var oMove = Math.floor(-scrollTop/10)
		document.documentElement.scrollTop = scrollTop +  oMove;
		if(scrollTop === 0) {
			clearInterval(timer);
		};
		// 鼠标滚轮事件 当触发鼠标滚轮事件停止定时器
		bind (document,'mousewheel', function() {
			clearInterval(timer);
		});
		// 兼容火狐鼠标滚轮事件 DOMMouseScroll
		bind (document,'DOMMouseScroll', function() {
			clearInterval(timer);
		});
		console.log(scrollTop);
	},30);
	
};
/*找到class名的标签兼容性
 *param:  parent obj
 * 		  tag  string
 * 		  classname string	
 * 由于是通过class获取，需要加下标
 */
function getClass (parent, tag, name) {
	var arr = [];
	var ele = parent.getElementsByTagName(tag);
	for (var i = 0; i < ele.length; i++) {
		var arrClassName = ele[i].className.split(' ');
		for (var j = 0; j < arrClassName.length; j++) {
			if (arrClassName[j] === name) {
				//console.log(ele[j])
				arr.push(ele[i]);
				break;
			};
		}
		
	};
	//console.log(arr)
	return arr;
};
// 补零方法
function NumFn(num) {
	if (num < 10) {
		return  '0' + num;
	}else {
		return num;
	};
};
/*插入节点兼容IE
 if ((var一个父框下的子集合).length === 0) {
	父框.appendChild(插入的节点)
} else {
	父框.insertBefore(插入的节点, (var一个父框下的子集合)[0]);
};
*/
// cookie的写
function setCookie (name,val,time) {
	var oDate = new Date;
	oDate.setDate(oDate.getDate() + time);
	document.cookie = name + '=' + val+'; expires=' + oDate.toGMTString();
};

// cookie的读
function getCookie(name) {
	var arr = document.cookie.split('; ');
	for (var i = 0; i < arr.length; i++) {
		var arr1 = arr[i].split('=');
		if (arr1[0] === name) {
			return arr1[1]
		}
	}
};
// cookie的删除
function removeCooke(name) {
	setCookie (name,'', -1)
};
//ajax
function ajax(method,url,fn) {
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();		
	} else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");	
	};
	xhr.open(method, url, true);
	xhr.send();
	xhr.onreadystatechange = function () {	
		if (xhr.readyState == 4) { 
			if (xhr.status == 200) { 
				fn(xhr.responseText);
			} else {
				alert('出错了' + xhr.status)
			};
		};
	};
};
//空对象作为中介完成继承
function extend (Child,Parent){
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
};
//拷贝继承
function copyFn(Child,Parent){
    for(var i in Parent){
        Child[i] = Parent[i];
    }
}
//继承方法
/*function copyFn(Child,Parent){
    var p = Parent.prototype;
    var c = Child.prototype;
    for(var i in p){
        c[i] = p[i];
    }
}*/

// 获取绝对定位的方法
function getTop(obj) {
	var iTop = 0;
	while(obj) {
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return iTop;
};

// 检查是否存在类 参数为 对象名称 和 类名
function hasClass(obj, cls) {
       return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
// 添加类
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className += " " + cls;
    }
}
// 删除类
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        obj.className = obj.className.replace(reg, "");
    }
};