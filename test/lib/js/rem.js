(function () {
	var PixelRatio = 1/window.devicePixelRatio;
	var oHtml = document.getElementsByTagName('html')[0];
	var pageWidth = 0;
	document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale='+PixelRatio+',maximum-scale='+ PixelRatio +', minimum-scale='+ PixelRatio +'" />');
	
	pageWidth = oHtml.getBoundingClientRect().width;
	oHtml.style.fontSize = pageWidth/10 + 'px'; 
	window.onresize = function () {
		pageWidth = oHtml.getBoundingClientRect().width;
		oHtml.style.fontSize = pageWidth/10 + 'px'; 
	};
})()
