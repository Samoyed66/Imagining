Zepto(function (){
	function wheelFn(){
		$(document).on('mousewheel',function (){
			return false;
		});	
	};
	wheelFn();
	
	//localstorage
	function LocalFn(){
		//取出数据
		var getNowDate = localStorage.getItem('newData');
		//数据存在时
		if (getNowDate){
			var nowArr = eval(getNowDate);
			$('#header .header-back')
				.find('a:nth-of-type(3),a:nth-of-type(2)').hide();
			$('#box').find('.myinfo h4 p:nth-of-type(1)').text(nowArr[0].num);
			$('#header .header-back').find('span').show();
		};
		//退出还原
		$('#header .header-back').find('span').on('tap', function () {
			localStorage.removeItem('newData');
			$(this).hide();
			$('#header .header-back')
				.find('a:nth-of-type(3),a:nth-of-type(2)').show();
			$('#box').find('.myinfo h4 p:nth-of-type(1)').text('您好 游客');
		});
	};
	LocalFn();
});
