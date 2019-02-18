Zepto(function (){
	//滚轮事件禁止
	function wheelFn(){
		$(document).on('mousewheel',function (){
			return false;
		});	
	};
	wheelFn();
	
	//复选框选择
	function checkFn(){
		var $Box = $('#box');
		var $Check = $('#check');
		var off = true;
		$Check.on('tap',function (){
			checkAll();
		});
		$Check.siblings().on('tap',function (){
			checkAll();
		});
		function checkAll(){
			if (off){
				$Check.addClass('active');
			} else {
				$Check.removeClass('active');
			};
			off = !off;
		};
	};
	checkFn();
	
	//加减
	function priceAll(){
		var $Box = $('#box');
		var $numPreson = $Box.find('.num-person');
		var $Lis = $numPreson.children();
		
		//总和
		var $footer = $('#footer');
		var $NumAll = $footer.find('.footer-left span:nth-of-type(2)');
		
		for (var i = 0; i<2; i++){
			goods($Lis.eq(i));
		};
		function goods(obj){
			var $Btn = obj.find('div input');
			var $BtnDown = $Btn.first();
			var $BtnUp = $Btn.last();
			var $Txt = $Btn.filter(':nth-of-type(2)');
			var num = 0;
			$BtnDown.on('tap',function (){
				if (num<=0){
					num = 0;
				} else {
					num--;
				};
				$Txt.val(num);
				moneyFn();
			});
			$BtnUp.on('tap',function (){
				num++;
				$Txt.val(num);
				moneyFn();
			});
		};
		
		function moneyFn(){
			var iNum = 0;
			for (var j = 0; j<2; j++){
				//单价
				var $PCont = parseInt($Lis.eq(j).find('p span').text().substring(1));
				var txt = $Lis.eq(j).find('div input').filter(':nth-of-type(2)').val();
				iNum += $PCont*txt;
			};
			$NumAll.text('¥' + iNum);
		};
	};
	priceAll();
	
});