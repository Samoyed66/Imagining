Zepto(function (){
	//滚轮事件禁止
	function wheelFn(){
		$(document).on('mousewheel',function (){
			return false;
		});	
	};
	wheelFn();
	
	//选择保险
	function safeFn(){
		var $Wrap = $('#wrap');
		var $Safe = $Wrap.find('.air-safe');
		var $SBtn = $Safe.find('.safe-cont');
		var off = true;
		$SBtn.on('tap',function (){
			if (off){
				$(this).find('.safe-wrap').addClass('active');
				$(this).children('p').css('display','block');
			} else {
				$(this).find('.safe-wrap').removeClass('active');
				$(this).children('p').css('display','none');
			};
			off = !off;
		});
	};
	safeFn();
	
	//加减
	function moveFn(){
		var $Wrap = $('#wrap');
		var $Con = $Wrap.find('.air-coupon');
		
		for (var i = 0; i<$Con.length; i++){
			goods($Con.eq(i));
		};
		
		function goods(obj){
			var $Btn = obj.find('div input');
			var $BtnDown = $Btn.first();
			var $BtnUp = $Btn.last();
			var $Txt = $Btn.filter(':nth-of-type(2)');
			var num = 2;
			$BtnDown.on('tap',function (){
				if (num<=0){
					num = 0;
				} else {
					num--;
				};
				$Txt.val(num);
			});
			$BtnUp.on('tap',function (){
				num++;
				$Txt.val(num);
			});
		};
	};
	moveFn();
	
	//额外账单加减
	function otherFn(){
		var $Wrap = $('#wrap');
		var $Other = $Wrap.find('.air-other');
		var $Single = $Other.find('.single-wrap');
		for (var j = 0; j<$Single.length; j++){
			goods($Single.eq(j));
		};
		
		function goods(obj){
			var $SingleBtn = obj.children('div').first();
			var $Btn = $SingleBtn.find('div input');
			var $BtnDown = $Btn.first();
			var $BtnUp = $Btn.last();
			var $Txt = $Btn.filter(':nth-of-type(2)');
			var num = 2;
			$BtnDown.on('tap',function (){
				if (num<=0){
					num = 0;
				} else {
					num--;
				};
				$Txt.val(num);
			});
			$BtnUp.on('tap',function (){
				num++;
				$Txt.val(num);
			});
		};
	};
	otherFn();
});