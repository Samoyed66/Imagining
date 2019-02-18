Zepto(function (){
	//底部选项卡
	function footFn(){
		var $footer = $('#other-footer');
		var $Lis = $footer.find('li');
		$Lis.on('tap',function (){
			$(this).addClass('active' + $(this).index()).siblings().removeAttr('class');
		});
	};
	footFn();
});