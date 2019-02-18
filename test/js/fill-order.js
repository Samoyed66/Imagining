Zepto(function (){
	//滚轮事件禁止
	function wheelFn(){
		$(document).on('mousewheel',function (){
			return false;
		});	
	};
	wheelFn();
	
	//发票
	function selectFn(){
		var $fill = $('#fill');
		var $invoice = $fill.find('.fill-select:nth-of-type(6)');
		var $Btn = $invoice.find('hgroup');
		var $BtnUl = $Btn.find('ul');
		var $BtnCont = $BtnUl.find('li');
		$Btn.on('tap',function (){
			if ($BtnUl.is(':hidden')){
				$BtnCont.css('background','#fff');
			};
			$(this).find('div').fadeToggle(200);
		});
		$BtnCont.on('tap',function (){
			$(this).css('background','#E4F7EC');
			$(this).parent().parent().prev().find('span').text($(this).text());
		});
	};
	selectFn();
	
	//出游人
	function PresonFn(){
		var $fill = $('#fill');
		var $Preson = $fill.find('.fill-select:nth-of-type(2)');
		var $PBtn = $Preson.find('h4');
		var $PUl = $Preson.find('ul');
		var $PLis = $PUl.children();
		var $Alert = $('.alert');
		var $Aradio = $Alert.find('input[type="radio"]');
		var $Close  =$Alert.last().find('button').first();
		var $Sure  =$Alert.last().find('button').last();
		var sex = '';
		$PBtn.on('tap',function (){
			$PUl.fadeToggle(200);
		});
		$PLis.last().on('tap',function (){
			$Alert.fadeIn(200);
		});
		$Close.on('tap',function (){
			$Alert.fadeOut(200);
		});
		$Aradio.on('tap',function (){
			$(this)
				.addClass('ractive')
				.siblings('input[type="radio"]').removeClass('ractive');
			sex = $(this).val();
		});
		$Sure.on('tap',function (){
			var name = $Alert.find('li').first().find('input').val();
			var age = $Alert.find('li').eq(1).find('input').val();
			var num = $Alert.find('li').eq(3).find('input').val();
			if (name != '' && age != '' && sex != '' && num != ''){
				var ele = $('<li><p>' + name + '</p><p>' + age + '</p><p>' + sex + '</p><p>' + num + '</p></li>');
				$PUl.prepend(ele);
				$Alert.find('li').first().find('input').val('');
				$Alert.find('li').eq(1).find('input').val('');
				$Alert.find('li').eq(3).find('input').val('');
				$Aradio.removeClass('ractive');
				$Alert.fadeOut(200);
			}
		});
	};
	PresonFn();
});